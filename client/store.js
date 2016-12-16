import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import reducers from './reducers';

let user = {
  user_id: null,
  authenticated: false
};

let currentWorkout = {};
let workouts = [];
let exercises = [];

const defaultState = {
  user,
  workouts,
  exercises,
  currentWorkout
};

const store = applyMiddleware(thunk)(createStore)(reducers, defaultState);
export const history = syncHistoryWithStore(browserHistory, store);

export default store;
