import React from 'react'
import styles from '../../sass/friend1.scss'

export default class Friend1 extends React.Component {
  render(){
    return (<div className={styles.friend1_wrap}>
      <div className={styles.friend1_navbox}>
        <div>
          <img src={require("../../../assets/frinds/pinglun-copy.png")}/>
          <span>发布动态</span>
        </div>
        <div>
          <img src={require("../../../assets/frinds/shipin.png")}/>
          <span>发布视频</span>
        </div>
      </div>
    </div>)
  }
}