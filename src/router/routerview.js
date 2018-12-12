import React from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
export default function RouterView(props){
  return (<Switch>
    {
      props.routes.map((item,index)=>{
        return <Route key={index} path={item.path} render={
          (props)=>{
            if (item.redirect){
              return <Redirect to={item.redirect}/>
            }
            if (item.children){
              return <item.component {...props} routes={item.children}/>
            }else{
              return <item.component {...props}/>
            }
          }
        }/>
      })
    }
    </Switch>)
}