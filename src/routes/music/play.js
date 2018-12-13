import React from 'react'
import styles from '../sass/play.scss'
import {connect} from 'react-redux'
import util from '../../util/util'
// import '../../../node_modules/better-scroll/dist/bscroll'
import BS from 'better-scroll'
import { Linter } from 'tslint';
let myscroll;
let song_scroll;

@connect((state)=>{
  return state.example
},(dispatch)=>{
  return {
    getPlay(url){
      dispatch({
        type:"example/getPlay",
        url
      })
    },
    getPlayImg(url){
      dispatch({
        type:"example/getPlayImg",
        url
      })
    },
    getLyric(url){
      dispatch({
        type:"example/getLyric",
        url
      })
    },
    getlimit(url){
      dispatch({
        type:"example/getLimit",
        url
      })
    }
  }
})

export default class Play extends React.Component {
  constructor(props){
    super(props)
    this.state={
      duration:'00:00',
      currentTime:'00:00',
      isPlay:"停",//播放按钮
      isrunning:"running",//旋转动画
      line_width:0,//进度条宽度
      music_name:"",//歌名显示
      mode:"列表播放",//播放模式
      playList_isShow:false,//播放列表是否显示
      song_list:[],//播放列表
      islyric:true,//歌词按钮
      lyricnum:0,//歌词播到的位置(time)
      lyric:[],//读取本地存储歌词
      isdalog_screenfn:false,//弹幕是否显示
      limit_arr:[]//弹幕数组
    }
    this.get_song_name.bind(this)
    this.prev_songfn.bind(this)
    this.next_songfn.bind(this)
  }
  componentDidMount(){
    //播放文件
    this.props.getPlay(`http://123.206.55.50:14000/song/url?id=${this.props.match.params.id}`)
    //播放图片
    this.props.getPlayImg(`http://123.206.55.50:14000/playlist/detail?id=${this.props.match.params.id}`)
    //获取本地存储数据列表
    let ls=window.localStorage
    let res=JSON.parse(ls.getItem("search_list"))
    this.setState({
      song_list:res
    })
    this.get_song_name(res)
    //初始化scroll
    myscroll=new BS(this.refs.lyric_scroll,{
      click:true
    })
    //获取歌词
    this.props.getLyric(`http://123.206.55.50:14000/lyric?id=${this.props.match.params.id}`)
    let ls_lyric=JSON.parse(ls.getItem("lyric"))
    this.setState({
      lyric:ls_lyric
    })
  }
  componentWillReceiveProps(){
    this.setState({
      lyric:JSON.parse(window.localStorage.getItem("lyric")),
      limit_arr:JSON.parse(window.localStorage.getItem("limit"))
    })
  }
  // 获取歌曲名称
  get_song_name(res){
    let ls=window.localStorage
    let myid=ls.getItem("id")
    let name;
    res.map((v,i)=>{
      if(v.id==myid){
        name=v.name
      }
    })
  this.setState({
    music_name:name
  })
  }
  //返回btn
  gobackfn(){
    this.props.history.go(-1)
  }
  //播放暂停切换
  isplayfn(){
    this.setState({
      isPlay:this.state.isPlay==="停"?"播":"停",
      isrunning:this.state.isrunning==="running"?"paused":"running"
    })
    if(this.state.isPlay==="停"){
      this.refs.audio.pause()
    }else{
      this.refs.audio.play()
    }
  }
  //audio的进度监听
  TimeUpdate(){
    //自动播放结束下一首
    if(this.refs.audio.currentTime>=this.refs.audio.duration){
      this.next_songfn()
    }
    let duration=util.formattime(this.refs.audio.duration)
    let currentTime=util.formattime(this.refs.audio.currentTime)
    this.setState({
      duration:duration,
      currentTime:currentTime
    })
    //进度条比例计算
    this.setState({
      line_width:this.refs.parent.offsetWidth/this.refs.audio.duration*this.refs.audio.currentTime
    })
    this.props.lyric.map((v,i)=>{
      if(this.refs.audio.currentTime>v.time &&this.refs.audio.currentTime<this.props.lyric[i+1].time){
        myscroll.scrollToElement(this.refs[`${v.time}`],300,0,0)
        this.setState({
          lyricnum:v.time
        })
      }
    })
  }
  //进度条按下
  touchStartfn(e){
    this.setState({
      isPlay:"播",
    },()=>{
      this.refs.audio.pause()
    })
  }
  //进度条移动
  touchMovefn(e){
    if(e.touches[0].clientX-this.refs.parent.offsetLeft<0){
      this.setState({
        isPlay:"播",
        isrunning:"paused",
        line_width:0,
        currentTime:"00:00"
      })
    }else if(e.touches[0].clientX-this.refs.parent.offsetLeft>this.refs.parent.offsetWidth){
      this.setState({
        isPlay:"播",
        isrunning:"paused",
        line_width:this.refs.parent.offsetWidth,
        currentTime:util.formattime(this.refs.audio.duration)
      })
    }else{
      this.setState({
        isPlay:"播",
        isrunning:"paused",
        line_width:e.touches[0].clientX-this.refs.parent.offsetLeft,
        currentTime:util.formattime(this.state.line_width/this.refs.parent.offsetWidth*this.refs.audio.duration)
      })
    }
  }
  //进度条松开
  touchEndfn(e){
    this.setState({
      isPlay:"停",
      isrunning:"running",
    },()=>{
      this.refs.audio.currentTime=this.state.line_width/this.refs.parent.offsetWidth*this.refs.audio.duration
      this.refs.audio.play()
    })
  }
  //点击切换播放模式
  change_modefn(){
    if(this.state.mode==="列表播放"){
      this.setState({
        mode:"随机播放"
      })
    }else if(this.state.mode==="随机播放"){
      this.setState({
        mode:"单曲循环"
      })
    }else{
      this.setState({
        mode:"列表播放"
      })
    }
  }
  //点击显示列表
  isshowList(){
    this.setState({
      playList_isShow:this.state.playList_isShow===false?true:false
    })
  }
  //上一曲
  prev_songfn(){
    let ls=window.localStorage
     if(this.state.mode==="随机播放"){
      let random_num=parseInt(Math.random()*this.state.song_list.length)
      let random_id=this.state.song_list[random_num].id
      ls.setItem("id",random_id)
      this.props.getPlay(`http://123.206.55.50:14000/song/url?id=${random_id}`)
      this.props.getLyric(`http://123.206.55.50:14000/lyric?id=${random_id}`)
      this.props.getlimit(`http://123.206.55.50:14000/comment/music?id=${random_id}&limit=20`)
      this.get_song_name(this.state.song_list)
      this.setState({
        isPlay:"停"
      })
    }else{
      let song_id=ls.getItem("id")
      let res;
      this.state.song_list.map((v,i)=>{
        if(v.id==song_id){
          if(i-1<0){
            res=29
          }else{
            res=i-1
          }
        }
      })
      let newid=this.state.song_list[res].id
      ls.setItem("id",newid)
      this.props.getPlay(`http://123.206.55.50:14000/song/url?id=${newid}`)
      this.props.getLyric(`http://123.206.55.50:14000/lyric?id=${newid}`)
      this.props.getlimit(`http://123.206.55.50:14000/comment/music?id=${newid}&limit=20`)
       this.get_song_name(this.state.song_list)
       this.setState({
        isPlay:"停"
      })
    }
  }
  //下一曲
  next_songfn(){
    let ls=window.localStorage
     if(this.state.mode==="随机播放"){
      let random_num=parseInt(Math.random()*this.state.song_list.length)
      let random_id=this.state.song_list[random_num].id
      ls.setItem("id",random_id)
      this.props.getPlay(`http://123.206.55.50:14000/song/url?id=${random_id}`)
      this.props.getLyric(`http://123.206.55.50:14000/lyric?id=${random_id}`)
      this.props.getlimit(`http://123.206.55.50:14000/comment/music?id=${random_id}&limit=20`)
      this.get_song_name(this.state.song_list)
      this.setState({
        isPlay:"停"
      })
    }else{
      let song_id=ls.getItem("id")
      let res;
      this.state.song_list.map((v,i)=>{
        if(v.id==song_id){
          if(i+1>this.state.song_list.length-1){
            res=0
          }else{
            res=i+1
          }
        }
      })
      let newid=this.state.song_list[res].id
      ls.setItem("id",newid)
      this.props.getPlay(`http://123.206.55.50:14000/song/url?id=${newid}`)
      this.props.getLyric(`http://123.206.55.50:14000/lyric?id=${newid}`)
      this.props.getlimit(`http://123.206.55.50:14000/comment/music?id=${newid}&limit=20`)
      this.get_song_name(this.state.song_list)
      this.setState({
        isPlay:"停",
      })
    }
  }
  //点击弹窗播放列表切歌
  daload_change_fn(name,id){
    this.setState({
      isPlay:"停"
    })
    let ls=window.localStorage
    ls.setItem("id",id)
    this.get_song_name(this.state.song_list)
    this.props.getPlay(`http://123.206.55.50:14000/song/url?id=${id}`)
    this.props.getLyric(`http://123.206.55.50:14000/lyric?id=${id}`)
    this.props.getlimit(`http://123.206.55.50:14000/comment/music?id=${id}&limit=20`)
  }
  //点击歌词按钮
  change_islyricfn(){
    if(this.state.islyric==true){
      this.setState({
        islyric:false
      })
    }else{
      this.setState({
        islyric:true
      })
    }
  }
  //点击显示弹幕页面
  dalog_screenfn(){
    let id=window.localStorage.getItem("id")
    this.props.getlimit(`http://123.206.55.50:14000/comment/music?id=${id}&limit=20`)
    this.setState({
      isdalog_screenfn:!this.state.isdalog_screenfn
    })
  }
  render() {
    return (<div>
      <div className={styles.play_wrap}>
          <p className={styles.play_goback_box}>
            <span onClick={this.gobackfn.bind(this)}><img className={styles.small_img} src={require("../../assets/fanhui.png")}/></span>
            <span>{this.state.music_name}</span>
            <span><img className={styles.small_img} src={require("../../assets/fenxiang1.png")}/></span>
          </p>
          <audio autoPlay={true} ref="audio" src={this.props.musicplay.url} onTimeUpdate={()=>{this.TimeUpdate()}}>
          </audio>
          <div className={styles.container_wrap}>
              <div className={styles.imgbox} style={{opacity:this.state.islyric==false?"1":"0",animationPlayState:this.state.isrunning}}>
                <img src={this.props.playimg}/>
              </div>
              <div ref="lyric_scroll" className={styles.lyricbox+" "+"myscroll_box"} style={{opacity:this.state.islyric==true?"1":"0"}}>
                <div>
                    <div className={styles.zhanwei}></div>
                    {this.state.lyric && this.state.lyric.length && this.state.lyric.map((v,i)=>{
                      return (<div ref={+v.time} className={v.time==this.state.lyricnum?styles.lyric_li:styles.lyric_lis} key={i}>{v.tit}</div>)
                    })}
                    <div className={styles.kong}></div>
                </div>
              </div>
              <div className={styles.limitbox} style={{opacity:this.state.isdalog_screenfn===true?'1':"0"}}>
                  {this.state.limit_arr && this.state.limit_arr.length && this.state.limit_arr.map((v,i)=>{
                    return <div className={styles.limit_child} key={i}><img className={styles.imgs} src={v.user.avatarUrl}/><p>{v.content}</p></div>
                  })}
              </div>
          </div>
          <div className={styles.modebox}>
            <div><span onClick={this.change_islyricfn.bind(this)}>
              <img style={{display:this.state.islyric==false?"block":"none"}} className={styles.small_img} src={require(`../../assets/ci.png`)}/>
              <img style={{display:this.state.islyric==true?"block":"none"}} className={styles.small_img} src={require(`../../assets/goback.png`)}/>
            </span></div>
            <div>
              <img className={styles.small_img} src={require("../../assets/xiazai.png")}/>
            </div>
            <div>
              <img className={styles.small_img} src={require("../../assets/shoucang.png")}/>
            </div>
            <div onClick={this.dalog_screenfn.bind(this)}>
              <img className={styles.small_img} src={require("../../assets/diantai.png")}/>
            </div>
            <div><span onClick={this.change_modefn.bind(this)}>
              <img className={styles.small_img} src={require(`../../assets/${this.state.mode}.png`)}/>
            </span></div>
          </div>
          <div className={styles.linebox}>
              <p ref="parent"  onTouchStart={(e)=>{this.touchStartfn(e)}} onTouchMove={(e)=>{this.touchMovefn(e)}} onTouchEnd={(e)=>{this.touchEndfn(e)}}>
                <span className={styles.currentTime}>{this.state.currentTime}</span>
                <span className={styles.line_span} style={{width:this.state.line_width+"px"}}></span>
                <span className={styles.duration}>{this.state.duration}</span>
              </p>
          </div>
         <div className={styles.btnbox}>
            <span><img className={styles.img} src={require("../../assets/xinhao.png")}/></span>
            <span><img onClick={this.prev_songfn.bind(this)} className={styles.img} src={require("../../assets/shangyiqu.png")}/></span>
            <span onClick={this.isplayfn.bind(this)}>
              <img style={{display:this.state.isPlay=="停"?"none":"block"}} className={styles.big_img} src={require("../../assets/bofang.png")}/>
              <img style={{display:this.state.isPlay=="播"?"none":"block"}} className={styles.big_img} src={require("../../assets/zanting.png")}/>
            </span>
            <span><img onClick={this.next_songfn.bind(this)} className={styles.img} src={require("../../assets/xiayiqu.png")}/></span>
            <span onClick={this.isshowList.bind(this)}><img className={styles.img} src={require("../../assets/liebiao.png")}/></span>
        </div>
        <div className={styles.play_list} style={{display:this.state.playList_isShow==false?"none":"block"}}>
          <p className={styles.back_p}><img onClick={this.isshowList.bind(this)} className={styles.small_img} src={require("../../assets/fanhui.png")}/></p>
          <div ref="song_list" className={styles.song_list_wrap}>
              {this.state.song_list && this.state.song_list.length && this.state.song_list.map((v,i)=>{
                return (<div className={styles.scroll_li} onClick={()=>{this.daload_change_fn(v.name,v.id)}} key={i}><span>{v.name}</span><img className={styles.small_img} src={require("../../assets/xuanxiang.png")}/></div>)
              })}
          </div>
        </div>
      </div>

    </div>)
  }
}