import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './containers/Main';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Welcome from './components/Welcome';
import Start from './components/Start';
import Trainr from './components/Trainr';
import Progress from './components/Progress';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Welcome} />
    <Route path="signup" component={Signup} />
    <Route path="signin" component={Signin} />
    <Route path="start" component={Start} />
    <Route path="trainr" component={Trainr} />
    <Route path="progress" component={Progress} />
  </Route>
);
