import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Main from './containers/Main';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Welcome from './components/Welcome';
import Start from './components/Start';
import Trainr from './components/Trainr';
import Progress from './components/Progress';

const app = document.getElementsByClassName('app')[0];

render((
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Welcome} />
      <Route path="signup" component={Signup} />
      <Route path="signin" component={Signin} />
      <Route path="start" component={Start} />
      <Route path="trainr" component={Trainr} />
      <Route path="progress" component={Progress} />
    </Route>
  </Router>
), app);
