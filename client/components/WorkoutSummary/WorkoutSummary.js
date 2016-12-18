import React from 'react';
import { Link } from 'react-router';

import styles from './workout-summary.scss';

export default function WorkoutSummary(props) {
  const workoutId = props.params.workout_id;
  const workoutExercises = props.exercises.map(exercise => {
    if (exercise.workout_id === parseInt(workoutId)) {
      return (
        <div key={exercise.created_on}
          className={styles['list-item']}>
          <span>{exercise.movement}</span> reps: {exercise.repetitions} weight: {exercise.weight}
        </div>
      )
    }
  })
  return (
    <div className={styles['workout-summary'], styles.container}>
      <h3>Workout Summary</h3>
      <div className={styles['workout-summary-exercises']}>
        {workoutExercises}
      </div>
      <Link to="/progress">Check your progress</Link>
    </div>
  )
}
