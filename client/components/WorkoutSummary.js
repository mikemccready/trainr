import React from 'react';
import { Link } from 'react-router';

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
      <Link to="/progress">Check your progress</Link>
    </div>
  )
}
