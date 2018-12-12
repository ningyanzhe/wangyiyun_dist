import React from 'react'
import styles from '../sass/search.scss'
import {Link} from 'react-router-dom'
import {connect} from 'dva'

@connect((state)=>{
  return state.example
},(dispatch)=>{
  return {
    getSearch(str){
      dispatch({
        type:'example/getsearch',
        str
      })
    }
  }
})
export default class Search extends React.Component {
  constructor(props){
    super(props)
    this.state={
      input_val:''
    }
  }
  componentWillReceiveProps(a){
    let ls=window.localStorage
    ls.setItem("search_list",JSON.stringify(a.search))
  }
  //返回
  gobackfn(){
    this.props.history.go(-1)
  }
  //点击搜素
  searchfn(){
    if(this.state.input_val.length>0){
      this.props.getSearch(this.state.input_val)
    }else{
      alert("请先输入关键字")
    }
  }
  //input值得绑定
  changefn(e){
    this.setState({
      input_val:e.target.value
    })
  }
  //点击设置id
  setidfn(res){
    let ls=window.localStorage
    ls.setItem("id",res)
  }
  render() {
    return (<div className={styles.search_wrap}>
      <div className={styles.search_goback_box}>
        <p className={styles.play_goback_box} onClick={this.gobackfn.bind(this)}><span><img className={styles.small_img} src={require("../../assets/fanhui.png")}/></span></p>
      </div>
      <div className={styles.search_head}>
          <input placeholder="输入歌手/歌词/歌名" value={this.state.input_val} onChange={(e)=>{this.changefn(e)}}/>
          <span onClick={this.searchfn.bind(this)}>搜索</span>
      </div>
      <div className={styles.search_content}>
          <div className={styles.ul}>
            {this.props.search.length && this.props.search.map((v,i)=>{
              return (
                <div className={styles.li} key={i}>
                  <Link onClick={()=>{this.setidfn(v.id)}} to={{pathname:`/music/play/${v.id}`}}>
                  <p>{v.name}</p>
                  </Link>
                </div>)
            })}
          </div>
      </div>
      </div>)
  }
}