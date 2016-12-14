import * as userActionCreators from './action_creators_user';
import * as workoutActionCreators from './action_creators_workouts';

export const actionCreators = Object.assign(
  {},
  userActionCreators,
  workoutActionCreators
);
