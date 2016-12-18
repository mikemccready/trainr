import React from 'react';
import styles from './exercise-input.scss';

export default function ExerciseInput(props) {
  return (
    <div className={styles['exercise-input']}>
      <label>
        Movement
        <input className="exercise-movement"
          type="text" list="movements"
          placeholder="Deadlift"
          data-index={props.index}
          data-exercise-prop="movement"
          value={props.workoutData.movement}
        />
        <datalist id="movements">
          <option>Bench</option>
          <option>Deadlift</option>
          <option>Press</option>
          <option>Pull-Up</option>
          <option>Row</option>
          <option>Squat</option>
        </datalist>
      </label>
      <label>
        Repetitions
        <input className="exercise-repetitions"
          type="number" name="repetitions"
          placeholder="5"
          data-index={props.index}
          data-exercise-prop="repetitions"
          value={props.workoutData.repetitions}
        />
      </label>
      <label>
        Weight
        <input
          className="exercise-weight"
          type="number" placeholder="150"
          data-index={props.index}
          data-exercise-prop="weight"
          value={props.workoutData.weight}
        />
      </label>
    </div>
  )
}
