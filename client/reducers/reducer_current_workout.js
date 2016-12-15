export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_WORKOUT':
      return action.workout;
  }
  return state;
}
