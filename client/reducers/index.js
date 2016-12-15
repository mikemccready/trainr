import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './reducer_user';
import workouts from './reducer_workouts';
import currentWorkout from './reducer_current_workout.js';

const rootReducer = combineReducers({
  user,
  workouts,
  currentWorkout,
  routing: routerReducer
});

export default rootReducer;
