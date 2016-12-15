import * as userActionCreators from './action_creators_user';
import * as workoutActionCreators from './action_creators_workouts';
import * as exerciseActionCreators from './action_creators_exercises';


export const actionCreators = Object.assign(
  {},
  userActionCreators,
  workoutActionCreators,
  exerciseActionCreators
);
