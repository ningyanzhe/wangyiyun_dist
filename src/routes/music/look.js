import React from 'react'
import {Link} from 'react-router-dom'
import RouterView from '../../router/routerview'
import styles from '../sass/look.scss'
export default class Look extends React.Component {
  constructor(props){
    super(props)
    this.state={
      tab_nav:1
    }
  }
  tabnavfn(str){
    this.setState({
      tab_nav:str
    })
  }
  render() {
    const {routes}=this.props
    return (<div className={styles.look_wrap}>
      <div className={styles.head}>
        <div className={styles.lookmusic}></div>
        <div className={styles.search}>
        <Link to="/music/search">
          <input placeholder="给你推荐最新单曲that gril"/>
        </Link>
        </div>
        <div className={styles.lookaudio}></div>
      </div>
        <div className={styles.navbox}>
          <Link className={this.state.tab_nav==1?styles.active:styles.act} onClick={()=>{this.tabnavfn(1)}} to="/music/look/1" replace>个性推荐</Link>
          <Link className={this.state.tab_nav==2?styles.active:styles.act} onClick={()=>{this.tabnavfn(2)}} to="/music/look/2" replace>主播电台</Link>
        </div>
      <RouterView routes={routes}></RouterView>
    </div>)
  }
}