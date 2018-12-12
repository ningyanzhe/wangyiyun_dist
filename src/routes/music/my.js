import React from 'react'
import styles from '../sass/my.scss'
import {Link} from 'react-router-dom'

export default class My extends React.Component {
  render() {
    return (<div className={styles.my_wrap}>
      <div className={styles.my_head}>
          <img src={require("../../assets/my/yun.png")}/>
          <span>我的音乐</span>
          <img src={require("../../assets/my/yinpin.png")}/>
      </div>
      <div className={styles.my_navbox}>
        <div className={styles.my_navbox_one}>
          <div><img className={styles.big_img} src={require("../../assets/my/yinyue.png")}/><span>本地音乐</span></div>
          <div><img className={styles.small_img} src={require("../../assets/my/xiangyou.png")}/></div>
        </div>
        <div className={styles.my_navbox_one}>
          <div><img className={styles.big_img} src={require("../../assets/my/bofang.png")}/><span>最近播放</span></div>
          <div><img className={styles.small_img} src={require("../../assets/my/xiangyou.png")}/></div>
        </div>
        <div className={styles.my_navbox_one}>
          <div><img className={styles.big_img} src={require("../../assets/my/diantai.png")}/><span>我的电台</span></div>
          <div><img className={styles.small_img} src={require("../../assets/my/xiangyou.png")}/></div>
        </div>
        <div className={styles.my_navbox_one}>
          <div><img className={styles.big_img} src={require("../../assets/my/shoucang.png")}/><span>本地音乐</span></div>
          <div><img className={styles.small_img} src={require("../../assets/my/xiangyou.png")}/></div>
        </div>
        <div className={styles.my_navbox_one}>
          <div><img className={styles.big_img} src={require("../../assets/my/iconset0454.png")}/><span>本地音乐</span></div>
          <div><img className={styles.small_img} src={require("../../assets/my/xiangyou.png")}/></div>
        </div>
      </div>
      <div className={styles.my_container}>
      </div>
    </div>)
  }
}