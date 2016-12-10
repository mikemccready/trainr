import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {
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
    console.log('main props from store,', this.props)
    return (
      <div className="main-container" onClick={this.handleClicks}>
        <h1>trainr</h1>
        { this.props.children }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Main);
