import React from 'react';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress_data: []
    }
    this.handleClicks = this.handleClicks.bind(this);
    this.getSessions = this.getSessions.bind(this);
    this.startSession = this.startSession.bind(this);
  }

  componentDidMount() {
    this.getSessions();
  }

  handleClicks(e) {
    const target = e.target;
    const targetClass = target.className;
    switch (targetClass) {
      case 'start-btn':
        this.startSession();
    }
  }

  getSessions() {
    fetch('/api/workouts')
      .then(response => {
        if (response.status !== 200) return console.log('Error::', response.status);
        response.json().then(data => {
          console.log(data.data)
          this.setState({progress_data: data.data});
        });
      });
  }

  startSession() {
    console.log('creating workout')
  }

  render() {
    const progress = this.state.progress_data.map((workout, i) => {
      return <div key={i}>{workout.date}</div>;
    })

    return (
      <div onClick={this.handleClicks}>
        <h1>trainr</h1>
        { this.props.children }
        <h3>Recent Progress</h3>
        { progress }
      </div>
    );
  }
}
