function storeWorkouts(workouts) {
  return {
    type: 'STORE_WORKOUTS',
    workouts
  }
}

export function getWorkoutsReq(user_id) {
  const userId = user_id;
  return (dispatch) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/api/users/${userId}/workouts`, {
      method: 'GET',
      headers: new Headers({
        'authorization': token
      })
    })
      .then(response => {
        if (response.status !== 200) return console.log('error', response.status);
        response.json().then(data => {
          dispatch(storeWorkouts(data));
        })
      })
      .catch(err => {
        console.log('error', err);
      });
  }
}

export function setCurrentWorkout(workout) {
  return {
    type: 'SET_CURRENT_WORKOUT',
    workout
  }
}
