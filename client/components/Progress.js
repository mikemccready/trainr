import React from 'react';
import { browserHistory } from 'react-router';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.addWorkoutReq = this.addWorkoutReq.bind(this);
    this.goToWorkoutSummary = this.goToWorkoutSummary.bind(this);
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
      let date = new Date(workout.created_on.replace(' ', 'T'));
      return (
        <div key={workout.created_on} onClick={() => {this.goToWorkoutSummary(workout)}}>
          {date.toLocaleTimeString("en-us", options)}
        </div>
      )
    });

    return (
      <div className="progress-page">
        <h3>Progress</h3>
        <button onClick={this.addWorkoutReq}>Start Workout</button>
        { workoutDivs }
      </div>
    )
  }
}
