export default (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
    const newState = Object.assign({}, state, {
      authenticated: true,
      user_id: action.user_id
    });
    return newState;
  }
  return state;
}
