import React from 'react';

export default function WorkoutSummary(props) {
  const workoutId = props.params.workout_id;
  const workoutExercises = props.exercises.map(exercise => {
    if (exercise.workout_id === parseInt(workoutId)) {
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
