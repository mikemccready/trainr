export function storeExercises(exercises) {
  return {
    type: 'STORE_EXERCISES',
    exercises
  }
}

export function getExercisesReq(user_id) {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const userId = user_id;
    fetch(`http://localhost:3000/api/users/${userId}/exercises`, {
      method: 'GET',
      headers: new Headers({
        'authorization': token
      })
    })
      .then(response => {
        if (response.status !== 200) return console.log('error', response.status);
        response.json().then(data => {
          dispatch(storeExercises(data));
        })
      })
      .catch(err => {
        console.log('error', err);
      })
  }
}
