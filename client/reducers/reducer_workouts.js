export default (state = [], action) => {
  let newState;
  switch (action.type) {
    case 'STORE_WORKOUTS':
      newState = action.workouts
      return newState;
  }
  return state;
}
