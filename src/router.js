import React from 'react';
import { Router, Route } from 'dva/router';
import LoginPage from './routes/login/login';
import Register from './routes/register/register';
import Home from './routes/home/homePage';
import Collection from './routes/collection/collection';
import User from './routes/user/user';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={LoginPage} />
      <Route path="/register" component={Register} />
      <Route path='/home' component={Home}>
          <Route path='/collection' component={Collection} ></Route>
          <Route path='/user' component={User} ></Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
