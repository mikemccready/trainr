import React from 'react';
import update from 'react-addons-update';

import ExerciseInput from './ExerciseInput';
import { decode } from '../services/token';

export default class Trainr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutData: [],
      exerciseDataTemplate: {
        movement: '',
        repetitions: 0,
        weight: 0
      }
    }
    this.addExercise = this.addExercise.bind(this);
    this.saveExercises = this.saveExercises.bind(this);
    this.updateWorkoutData = this.updateWorkoutData.bind(this);
  }

  componentDidMount() {
    this.addExercise();
  }

  addExercise() {
    const newWorkoutData = this.state.workoutData.slice();
    newWorkoutData.push(this.state.exerciseDataTemplate);
    this.setState({ workoutData: newWorkoutData });
  }

  updateWorkoutData(e) {
    const exerciseIndex = e.target.getAttribute('data-index');
    const exerciseProp = e.target.getAttribute('data-exercise-prop');
    const workoutData = update(this.state.workoutData, {
      [exerciseIndex]: {[exerciseProp]: {$set: e.target.value}}
    });
    return this.setState({workoutData});
  }

  saveExercises() {
    const token = localStorage.getItem('token');
    const workout_id = localStorage.getItem('current_workout_id');
    const user_id = decode(token);
    this.state.workoutData.forEach(exercise => {
      this.props.saveExerciseReq(exercise, workout_id, user_id)
    })
  }

  render() {
    const exerciseInputs = this.state.workoutData.map((exercise, i) => {
      return <ExerciseInput index={i} key={i} workoutData={this.state.workoutData} />
    })
    return (
      <div className="trainr-page">
        <h3>Trainr</h3>
        <div className="trainr-exercise-list" onChange={this.updateWorkoutData}>
          { exerciseInputs }
        </div>
        <button onClick={this.addExercise}>Add Exercise</button>
        <button onClick={this.saveExercises}>Save Workout</button>
      </div>
    )
  }
}
