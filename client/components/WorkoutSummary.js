import React from 'react';

export default function WorkoutSummary(props) {
  const workoutExercises = props.exercises.map(exercise => {
    if (exercise.workout_id ===  props.currentWorkout.workout_id) {
      console.log(exercise)
      return (
        <div key={exercise.created_on}>
              {exercise.movement} | weight: {exercise.weight}
        </div>
      )
    }
  })
  return (
    <div className="summary-page">
      Workout Summary
      {workoutExercises}
    </div>
  )
}
