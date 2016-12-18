import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { actionCreators } from '../../actions';
import { decode } from '../../services/token';
import styles from './main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }

  componentDidMount() {
    if (this.props.user.authenticated) {
      const user_id = this.props.user.user_id;
      this.props.getWorkoutsReq(user_id);
      this.props.getExercisesReq(user_id);
    }
  }

  signout() {
    localStorage.removeItem('token');
    this.props.signout();
    browserHistory.push('/');
  }

  render() {
    let signoutLink;

    if (this.props.user.authenticated) {
      const user_id = this.props.user.user_id;
      signoutLink = <h3 className={styles['main-signout-btn']} onClick={this.signout}>Sign out</h3>;
    }

    return (
      <div className={styles.main}
        onClick={this.handleClicks}>
        <nav className={styles['main-nav']}>
          <h1 className={styles['main-mark']}>trainr</h1>
          { signoutLink }
        </nav>
        { React.cloneElement(this.props.children, this.props) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    workouts: state.workouts,
    exercises: state.exercises,
    currentWorkout: state.currentWorkout
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
