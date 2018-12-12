import Cookies from 'js-cookie'
export default {
  get:(arg)=>{
    return Cookies.get(arg)
  },
  set:(key,value)=>{
    return Cookies.set(key,value)
  },
  request:(url)=>{
    return fetch(url)
  },
  formattime:(time)=>{
    let m=parseInt(time/60).toString().padStart(2,0)
    let s=parseInt((time%60)).toString().padStart(2,0)
    let str=`${m}:${s}`
    return str
  },
  timeTonumber:(str)=>{
    let strs=str.slice(1,9)
    let m=parseInt(strs.split(":")[0])*60
    let s=parseInt(strs.split(":")[1].split(".")[0])
    return m*1+s*1
  }
}