import React from 'react';
import { browserHistory } from 'react-router';

import styles from './progress.scss';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.addWorkoutReq = this.addWorkoutReq.bind(this);
    this.goToWorkoutSummary = this.goToWorkoutSummary.bind(this);
  }

  componentDidMount() {
    const user_id = this.props.user.user_id;
    this.props.getWorkoutsReq(user_id);
    this.props.getExercisesReq(user_id);
  }

  addWorkoutReq() {
    const that = this;
    const token = localStorage.getItem('token');
    const user_id = this.props.user.user_id;
    fetch(`http://localhost:3000/api/users/${user_id}/workouts`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': token
      }),
      body: JSON.stringify({ user_id })
    })
      .then(response => {
        if (response.status !== 200) return console.log('error', response.status);
        response.json().then(data => {
          that.props.setCurrentWorkout(data.data);
          localStorage.setItem('current_workout_id', data.data.workout_id);
          browserHistory.push('/trainr');
        });
      })
      .catch(err => {
        console.log('error', err);
      })
  }

  goToWorkoutSummary(workoutData) {
    this.props.setCurrentWorkout(workoutData);
    browserHistory.push(`/workout/${workoutData.workout_id}`);
  }

  render() {
    const options = {
        weekday: "short", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };

    const workoutDivs = this.props.workouts.map(workout => {
      if (workout.user_id === this.props.user.user_id) {
        let date = new Date(workout.created_on.replace(' ', 'T'));
        return (
          <div key={workout.created_on}
            onClick={() => {this.goToWorkoutSummary(workout)}}
            className={styles['list-item']}>
            {date.toLocaleTimeString("en-us", options)}
          </div>
        )
      }
    });

    return (
      <div className={styles.progress, styles.container}>
        <h3>Progress</h3>
        { workoutDivs }
        <button onClick={this.addWorkoutReq}>Start Workout</button>
      </div>
    )
  }
}
