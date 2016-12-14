export function authenticate(user_id) {
  return {
    type: 'AUTHENTICATE',
    user_id
  }
}

export function signout() {
  return {
    type: 'SIGNOUT'
  }
}
