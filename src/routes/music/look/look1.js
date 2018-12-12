import React from 'react'
import { Carousel } from 'antd';
import 'antd/dist/antd.css'
import styles from '../../sass/look1.scss'
import {connect} from 'react-redux'
import { parse } from 'uri-js';
class Look1 extends React.Component {
  componentDidMount(){
    this.props.getBanner('http://123.206.55.50:14000/banner')
    this.props.getToplist()
    this.props.getGoodlist('http://123.206.55.50:14000/personalized')
  }
  render(){
    return (<div className={styles.look1_wrap}>
              <div className={styles.banner_wrap}>
                <Carousel autoplay>
                  {this.props.banners.length && this.props.banners.map((v,i)=>{
                    return (<div key={i}><img src={v.imageUrl}/></div>)
                  })}
                </Carousel>
              </div>
              <div className={styles.toplist_wrap}>
                <div className={styles.toplist_one}>
                  <div><img className={styles.toplist_img} src={require('../../../assets/look1/FM_1.png')}/></div>
                  <p>私人FM</p>
                </div>
                <div className={styles.toplist_one}>
                  <div><img className={styles.toplist_img} src={require('../../../assets/look1/meirituijian.png')}/></div>
                  <p>每日推荐</p>
                </div>
                <div className={styles.toplist_one}>
                  <div><img className={styles.toplist_img} src={require('../../../assets/look1/gedan.png')}/></div>
                  <p>歌单</p>
                </div>
                <div className={styles.toplist_one}>
                  <div><img className={styles.toplist_img} src={require('../../../assets/look1/paihangbang.png')}/></div>
                  <p>排行榜</p>
                </div>
              </div>
              <p style={{paddingLeft:".2rem",fontSize:".36rem",fontWeight:"800px"}}>推荐歌单></p>
              <div className={styles.goodlist_wrap}>
                {this.props.goodlist.length && this.props.goodlist.map((v,i)=>{
                      return (<div key={i} className={styles.goodlist_one}>
                              <div className={styles.goodlist_img}>
                                <span className={styles.positionnum}>{parseInt(v.playCount/10000)}万</span>
                                <img src={v.picUrl}/>
                              </div>
                              <p>{v.name}</p>
                          </div>)
                    })}
              </div>
            </div>)
  }
}

const mapStateToProps=(state)=>{
  return state.example
}
const mapDispatchToProps=(dispatch)=>{
  return {
    getBanner(url){
      dispatch({
        type:'example/getbanner',
        payload:(url)
      })
    },
    getToplist(){
      dispatch({
        type:'example/get_toplist',
        payload:({msg:'mock'})
      })
    },
    getGoodlist(url){
      dispatch({
        type:'example/getgoodlist',
        payload:(url)
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Look1)