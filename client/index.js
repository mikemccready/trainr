import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import routes from './routes';
import reducers from './reducers';

const store = createStore(reducers);
const app = document.getElementsByClassName('app')[0];

render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), app);
