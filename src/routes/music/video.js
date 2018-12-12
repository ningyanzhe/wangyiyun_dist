import React from 'react'
import styles from '../sass/video.scss'

export default class Video extends React.Component {
  render(){
    return (<div className={styles.video_wrap}>
          <div className={styles.video_head}>
            <img className={styles.img} src={require("../../assets/video/shipin.png")}/>
            <input placeholder="搜索最新内容"/>
            <img className={styles.img} src={require("../../assets/video/yinpin.png")}/>
          </div>
          <div className={styles.video_navbox}>navbox</div>
          <div className={styles.video_container}>container</div>
      </div>)
  }
}