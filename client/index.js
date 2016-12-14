import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux';

import store, { history } from './store';
import routes from './routes';

const app = document.getElementsByClassName('app')[0];

render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), app);
