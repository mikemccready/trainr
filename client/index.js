import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Main from './containers/Main';
import Start from './components/Start';

const app = document.getElementsByClassName('app')[0];

render((
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Start} />
    </Route>
  </Router>
), app);
