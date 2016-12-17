import React from 'react';
import { Link, browserHistory } from 'react-router';
import { decode } from '../services/token';

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showError = this.showError.bind(this);
  }

  handleChange(e) {
    const field = e.target.id;
    const value = e.target.value;
    switch (field) {
      case 'signin-email':
        this.setState({email: value});
        break;
      case 'signin-password':
        this.setState({password: value});
        break;
      default:
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const that = this;
    const formData = {
      email: this.state.email,
      password: this.state.password
    }

    this.setState({errorMsg: ''})

    fetch('http://localhost:3000/api/users/signin', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.status !== 200) return that.showError();
        response.json().then(data => {
          const user_id = decode(data.token);
          localStorage.setItem('token', data.token);
          that.props.authenticate(user_id);
          browserHistory.push('/progress');
        })
      })
      .catch(err => {
        console.log('error', err);
      })
  }

  showError() {
    return this.setState({errorMsg: 'Invalid email or password'});
  }

  render() {
    return (
      <div className="signin-page">
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <h3>Sign in</h3>
          <h5>{this.state.errorMsg}</h5>
          <section>
            <p>
              <label htmlFor="signin-email">
                Email
                <input
                  type="email"
                  id="signin-email"
                  placeholder="me@trainr.com"
                  value={this.state.email} />
              </label>
            </p>
            <p>
              <label htmlFor="signin-password">
                Password
                <input
                  type="password"
                  id="signin-password"
                  placeholder="password"
                  value={this.state.password} />
              </label>
            </p>
          </section>
          <section>
            <p>
              <button>Sign in</button>
            </p>
          </section>
        </form>
        <Link to="/signup">New to trainr? Sign up</Link>
      </div>
    )
  }
}
