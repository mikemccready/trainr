import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './reducer_user';
import workouts from './reducer_workouts';

const rootReducer = combineReducers({
  user,
  workouts,
  routing: routerReducer
});

export default rootReducer;
