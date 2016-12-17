export default (state = [], action) => {
  let newState;
  switch (action.type) {
    case 'STORE_EXERCISES':
      newState = action.exercises;
      return newState;
    case 'ADD_EXERCISE':
      newState = state.slice();
      newState.push(action.exercise);
      return newState;
  }
  return state;
}
