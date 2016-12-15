export default (state = [], action) => {
  let newState;
  switch (action.type) {
    case 'STORE_EXERCISES':
      newState = action.exercises;
      return newState;
  }
  return state;
}
