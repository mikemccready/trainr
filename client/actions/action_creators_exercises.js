function storeExercises(exercises) {
  return {
    type: 'STORE_EXERCISES',
    exercises
  }
}

function addExercise(exercise) {
  return {
    type: 'ADD_EXERCISE',
    exercise
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

export function saveExerciseReq(exerciseData, workout_id, user_id) {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const reqBody = Object.assign({}, exerciseData, { user_id }, { workout_id });
    console.log(reqBody)
    fetch(`http://localhost:3000/api/users/${user_id}/exercises`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': token
      }),
      body: JSON.stringify(reqBody)
    })
      .then(response => {
        if (response.status !== 200) return console.log('error', response.status);
        response.json().then(data => {
          dispatch(addExercise(data.data));
        })
      })
      .catch(err => {
        console.log('error', err);
      })
  }
}
