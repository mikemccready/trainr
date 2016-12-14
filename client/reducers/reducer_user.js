export default (state = {}, action) => {
  let newState;
  switch (action.type) {
    case 'AUTHENTICATE':
      newState = Object.assign({}, state, {
        authenticated: true,
        user_id: action.user_id
      });
      return newState;
    case 'SIGNOUT':
      newState = {
        authenticated: false,
        user_id: null
      }
      return newState;
  }
  return state;
}
