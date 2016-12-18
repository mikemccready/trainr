import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux';

import store, { history } from './store';
import routes from './routes';
import { decode } from './services/token';

const app = document.getElementsByClassName('app')[0];

// check if token exists
const token = localStorage.getItem('token');
if (token) {
  const user_id = decode(token);
  store.dispatch({
    type: 'AUTHENTICATE',
    user_id
  })
} else {
  browserHistory.push('/');
}

render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), app);
