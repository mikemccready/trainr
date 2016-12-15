export function storeWorkouts(workouts) {
  return {
    type: 'STORE_WORKOUTS',
    workouts
  }
}

export function setCurrentWorkout(workout) {
  return {
    type: 'SET_CURRENT_WORKOUT',
    workout
  }
}
