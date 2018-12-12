import React from 'react'
import {connect} from 'dva'
import styles from '../../sass/look2.scss'
@connect((state)=>{
  return state
},(dispatch)=>{
  return {
    getAnchor(payload){
      dispatch({
        type:"example/getAnchor",
        payload
      })
    }
  }
})
export default class Look2 extends React.Component {
  componentDidMount(){
    this.props.getAnchor("http://123.206.55.50:14000/personalized/djprogram")
  }
  render(){
    return (<div className={styles.getAnchor_content}>
          <p className={styles.getAnchor_p}><span>今日优选</span><span>换一换</span></p>
          <div className={styles.getAnchor_wrap}>
          {this.props.example.getAnchor.length && this.props.example.getAnchor.map((v,i)=>{
            return (<div key={i} className={styles.getAnchor_one}>
                      <div className={styles.getAnchor_img}>
                        <img src={v.picUrl}/>
                      </div>
                      <div className={styles.getAnchor_text}>
                          <p className={styles.getAnchor_p2}>{v.copywriter}</p>
                          <p>{v.name}</p>
                      </div>
              </div>)
          })}
        </div>
      </div>)
  }
}