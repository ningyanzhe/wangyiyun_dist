import React from 'react';
import { Router} from 'dva/router';
import {NavLink} from 'react-router-dom'
import RouterView from './router/routerview'
import styles from './routes/sass/look.scss'
import config from './router/config'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
    <React.Fragment>
      <div className={styles.content}>
        <RouterView routes={config.routes}>
        </RouterView>
      </div>
      <div className={styles.foot}>
        <NavLink to="/music/look" exact replace><div></div><span>发现</span></NavLink>
        <NavLink to="/music/video" exact replace><div></div><span>视频</span></NavLink>
        <NavLink to="/music/my" exact replace><div></div><span>我的</span></NavLink>
        <NavLink to="/music/friend" exact replace><div></div><span>朋友</span></NavLink>
        <NavLink to="/music/user" exact replace><div></div><span>账号</span></NavLink>
      </div>
    </React.Fragment>
    </Router>
  );
}

export default RouterConfig;
