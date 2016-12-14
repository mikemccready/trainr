import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import reducers from './reducers';

let user = {
  user_id: null,
  authenticated: false
};

let workouts = [];
let exercises = [];

const defaultState = {
  user
};

const store = createStore(reducers, defaultState);
export const history = syncHistoryWithStore(browserHistory, store);

export default store;
