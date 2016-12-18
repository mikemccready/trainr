import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './containers/Main/Main';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Welcome from './components/Welcome';
import WorkoutSummary from './components/WorkoutSummary/WorkoutSummary';
import Trainr from './components/Trainr/Trainr';
import Progress from './components/Progress/Progress';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Welcome} />
    <Route path="signup" component={Signup} />
    <Route path="signin" component={Signin} />
    <Route path="workout/:workout_id" component={WorkoutSummary} />
    <Route path="trainr" component={Trainr} />
    <Route path="progress" component={Progress} />
  </Route>
);
