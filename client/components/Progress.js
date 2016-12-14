import React from 'react';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.getWorkoutsReq = this.getWorkoutsReq.bind(this);
    this.addWorkoutReq = this.addWorkoutReq.bind(this);
  }

  componentDidMount() {
    this.getWorkoutsReq();
  }

  getWorkoutsReq() {
    const that = this;
    const token = localStorage.getItem('token');
    const user_id = this.props.user.user_id;
    fetch(`http://localhost:3000/api/users/${user_id}/workouts`, {
      method: 'GET',
      headers: new Headers({
        'authorization': token
      })
    })
      .then(response => {
        if (response.status !== 200) return console.log('error', response.status);
        response.json().then(data => {
          that.props.storeWorkouts(data);
        })
      })
      .catch(err => {
        console.log('error', err);
      })
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
        response.json().then(that.getWorkoutsReq());
      })
      .catch(err => {
        console.log('error', err);
      })
  }

  render() {
    const workoutDivs = this.props.workouts.map(workout => {
      return <div key={workout.created_on}>{workout.created_on}</div>
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
