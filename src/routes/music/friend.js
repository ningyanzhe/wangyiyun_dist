import React from 'react'
import styles from '../sass/friend.scss'
import {Link} from 'dva/router'
import RouterView from '../../router/routerview';

export default class Friend extends React.Component {
  constructor(props){
    super(props)
    this.state={
      Tab_nav:1
    }
  }
  tabnavfn(str){
    this.setState({
      Tab_nav:str
    })
  }
  render() {
    const {routes} =this.props
    return (<div className={styles.friend_wrap}>
        <div className={styles.friend_head}>
          <img src={require("../../assets/frinds/tianjiahaoyou.png")}/>
          <div className={styles.friend_head_nav}>
            <Link replace onClick={()=>{this.tabnavfn(1)}} className={this.state.Tab_nav==1?styles.active:""} to="/music/friend/1">动态</Link>
            <Link replace onClick={()=>{this.tabnavfn(2)}} className={this.state.Tab_nav==2?styles.active:""} to="/music/friend/2">附近</Link>
          </div>
          <img src={require("../../assets/frinds/yinpin.png")}/>
        </div>
        <div className={styles.friend_container}>
          <RouterView routes={routes}></RouterView>
        </div>
    </div>)
  }
}