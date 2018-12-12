import Look from '../routes/music/look'
import My from '../routes/music/my'
import Friend from '../routes/music/friend'
import User from '../routes/music/user'
import Video from '../routes/music/video'
import Look1 from '../routes/music/look/look1'
import Look2 from '../routes/music/look/look2'
import Play from '../routes/music/play'
import Search from '../routes/music/search'
import Friend1 from '../routes/music/friend/friend1'
import Friend2 from '../routes/music/friend/friend2'

export default {
  routes:[{
    path:'/music/look',
    text:'发现',
    component:Look,
    children:[{
      path:'/music/look/1',
      text:'发现1',
      component:Look1,
    },{
      path:'/music/look/2',
      text:'发现2',
      component:Look2,
    },{
      path:"/music/look",
      redirect:"/music/look/1"
    }]
  },{
    path:'/music/my',
    text:'我的',
    component:My
  },{
    path:'/music/friend',
    text:'朋友',
    component:Friend,
    children:[{
      path:'/music/friend/1',
      component:Friend1,
    },{
      path:'/music/friend/2',
      component:Friend2,
    },{
      path:'/music/friend',
      redirect:"/music/friend/1"
    }]
  },{
    path:'/music/user',
    text:'账号',
    component:User
  },{
    path:'/music/video',
    text:'视频',
    component:Video
  },{
    path:'/music/search',
    component:Search
  },{
    path:"/music/play/:id",
    component:Play
  },{
    path:'/',
    redirect:'/music/user'
  }]
}