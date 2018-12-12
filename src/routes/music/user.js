import React from 'react'
import styles from '../sass/user.scss'
import util from '../../util/util'
export default class User extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isMask:false,
      isLoginMask:false,
      email:'m18210249690',
      pwd:'18210249690nyz'
    }
  }
  toLogin(){
    this.setState({
      isMask:this.state.isMask=true
    })
  }
  gobackfn(){
    this.setState({
      isMask:this.state.isMask=false
    })
  }
  gobacksfn(){
    this.setState({
      isLoginMask:false
    })
  }
  maskGoLoginfn(){
    this.setState({
      isLoginMask:true
    })
  }
  //点击登录检测用户是否正确
  testuser(){
    return util.request(`http://123.206.55.50:14000/login?email=${this.state.email}@163.com&password=${this.state.pwd}`)
          .then(res=>{
            console.log(res)
          if(res.ok===true){//成功
            util.set('login',"ok")
            this.setState({
              isMask:false,
              isLoginMask:false,
            })
              }else{
                alert("您的信息有误，请重新输入")
              }
    })
  }
  render() {
    return (<div>
      <div className={this.state.isMask==true?styles.maskbox:styles.masknone}>
          <div className={styles.mask_content}>
            <p><span onClick={this.gobackfn.bind(this)}>《返回</span></p>
            <div className={styles.logo}>
              <img src={require('../../assets/wyyyy.png')}/>
            </div>
            <div className={styles.btnbox}>
              <p onClick={this.maskGoLoginfn.bind(this)}>手机号登录</p>
              <p>注册</p>
              <p>游客登录</p>
            </div>
            <div className={styles.mask_foot}>
              <p>其他登录方式</p>
              <div className={styles.mask_foot_bot}>
                <div className={styles.mask_foot_bot_one}>
                  <div className={styles.mask_foot_bot_one_img}>
                    <img src={require("../../assets/weixin.png")}/>
                  </div>
                  <p>微信</p>
                </div>
                <div className={styles.mask_foot_bot_one}>
                  <div className={styles.mask_foot_bot_one_img}>
                      <img src={require("../../assets/qq.png")}/>
                  </div>
                  <p>QQ</p>
                </div>
                <div className={styles.mask_foot_bot_one}>
                  <div className={styles.mask_foot_bot_one_img}>
                      <img src={require("../../assets/weibo.png")}/>
                  </div>
                  <p>微博</p>
                </div>
                <div className={styles.mask_foot_bot_one}>
                  <div className={styles.mask_foot_bot_one_img}>
                      <img src={require("../../assets/wangyi.png")}/>
                  </div>
                  <p>网易</p>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className={this.state.isLoginMask==true?styles.loginMask_wrap:styles.loginMask_none}>
        <div className={styles.isLoginMask_head}>
          <span onClick={this.gobacksfn.bind(this)}>《</span>
          <span>手机号码登录</span>
          <span></span>
        </div>
        <div className={styles.isLoginMask_content}>
          <input placeholder="手机号" ref="el_e"value={this.state.email} onChange={()=>{this.setState({email:this.refs.el_e.value})}}/>
          <input placeholder="密码" ref="el_p" value={this.state.pwd} onChange={()=>{this.setState({pwd:this.refs.el_p.value})}}/>
          <p onClick={this.testuser.bind(this)}>登录</p>
          <a>重设密码</a>
        </div>
      </div>
      <button onClick={this.toLogin.bind(this)}>去登陆</button>
    </div>)
  }
}