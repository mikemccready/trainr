export default (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
    console.log('in switch reducer', state, action);
    const newState = Object.assign({}, state, { authenticated: true });
    return newState;
  }
  return state;
}
