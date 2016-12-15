import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './reducer_user';
import workouts from './reducer_workouts';
import exercises from './reducer_exercises';
import currentWorkout from './reducer_current_workout.js';

const rootReducer = combineReducers({
  user,
  workouts,
  exercises,
  currentWorkout,
  routing: routerReducer
});

export default rootReducer;
