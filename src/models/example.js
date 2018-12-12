import util from '../util/util'
import {routerRedux} from 'dva/router'

export default {
  namespace: 'example',

  state: {
    banners:[],
    toplist:[],
    goodlist:[],
    getAnchor:[],
    mymusic:[],
    musicplay:[],
    playimg:"",
    search:[],
    lyric:[],
    limit:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({pathname})=>{
        if(!util.get("login")){
          if(pathname!=='/user'){
              return dispatch(routerRedux.replace({
                pathname:'/music/user'
              }))
          }
        }
      })
    },
  },
  effects: {
    //发现页轮播
    *getbanner({payload},{call,put}){
      let res=yield call(()=>{
        return fetch(payload)
        .then(res=>res.json())
        .then(val=>val)
      })
      yield put ({type:'get_banner',payload:res})
    },
    //发现页歌单
    *getgoodlist({payload},{call,put}){
      let res=yield call(()=>{
        return fetch(payload)
        .then(res=>res.json())
        .then(val=>val)
      })
      yield put ({type:'get_goodlist',payload:res.result})
    },
    //主播电台页电台
    *getAnchor({payload},{call,put}){
      let res=yield call(()=>{
        return fetch(payload)
        .then(res=>res.json())
        .then(val=>val)
      })
      yield put ({type:'get_Anchor',payload:res.result})
    },
    //我的音乐
    *getMymusic({url},{call,put}){
      let res=yield call(()=>{
        return fetch(url)
        .then(res=>res.json())
        .then(val=>{return val})  
      })
      yield put ({type:'get_mymic',payload:res.recommend})
    },
    //获取播放文件
    *getPlay({url},{call,put}){
      let res=yield call(()=>{
        return fetch(url)
        .then(res=>res.json())
        .then(val=>val)
      })
      yield put ({type:'get_play',payload:res.data[0]})
    },
    //获取播放背景图片
    *getPlayImg({url},{call,put}){
      let res=yield call(()=>{
        return fetch(url)
        .then(res=>res.json())
        .then(val=>val)
      })
      yield put ({type:'get_img',payload:res.playlist.coverImgUrl})
    },
    //获取search数据
    *getsearch({str},{call,put}){
      let res=yield call(()=>{
        return fetch(`http://123.206.55.50:14000/search?keywords=${str}`)
        .then(res=>res.json())
        .then(val=>{return val})
      })
      yield put ({type:'get_search',payload:res.result.songs})
    },
    //获取歌词
    *getLyric({url},{call,put}){
      let res=yield call(()=>{
        return fetch(url)
        .then(res=>res.json())
        .then(val=>{return val})
      })
      let arr=res.lrc.lyric.split("\n")
      let newarr=[]
      arr.map((v,i)=>{
        var obj={}
        if(v){
          obj.tit=v.split("]")[1]
          obj.time=util.timeTonumber(v.split("]")[0]+"]")
        }
        newarr.push(obj)
      })
      let ls=window.localStorage
      ls.setItem("lyric",JSON.stringify(newarr))
      yield put ({type:'get_lyric',payload:newarr})
    },
    //获取弹幕
    *getLimit({url},{call,put}){
      let res=yield call(()=>{
        return fetch(url)
        .then(res=>res.json())
        .then(val=>val)
      })
      window.localStorage.setItem("limit",JSON.stringify(res.comments))
      yield put ({type:'get_limit',payload:res.comments})
    }
  },
  reducers:{
    get_banner(state,action){
      return {...state,banners:action.payload.banners}
    },
    get_toplist(state,action){
      return {...state,toplist:[{
        "src":"src/assets/top_1.jpg",
        "text":"私人FM"
      },{
        "src":"src/assets/top_2.jpg",
        "text":"每日推荐"
      },{
        "src":"src/assets/top_3.jpg",
        "text":"歌单"
      },{
        "src":"src/assets/top_4.jpg",
        "text":"排行榜"
      }]}
    },
    get_goodlist(state,action){
      return {...state,goodlist:action.payload}
    },
    get_Anchor(state,action){
      return {...state,getAnchor:action.payload}
    },
    get_mymic(state,action){
      return {...state,mymusic:action.payload}
    },
    get_play(state,action){
      return {...state,musicplay:action.payload}
    },
    get_img(state,action){
      return {...state,playimg:action.payload}
    },
    get_search(state,action){
      return {...state,search:action.payload}
    },
    get_lyric(state,action){
      return {...state,lyric:action.payload}
    },
    get_limit(state,action){
      return {...state,limit:action.payload}
    }
  }

};
