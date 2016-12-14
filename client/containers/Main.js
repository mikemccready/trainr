import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';


import * as actionCreators from '../actions/action_creators_user';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }

  signout() {
    localStorage.removeItem('token');
    this.props.signout();
    browserHistory.push('/');
  }

  render() {
    let signoutLink;
    if (this.props.user.authenticated) {
      signoutLink = <h3 onClick={this.signout}>Sign out</h3>;
    }

    return (
      <div className="main-container" onClick={this.handleClicks}>
        <h1>trainr</h1>
        { signoutLink }
        { React.cloneElement(this.props.children, this.props) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
