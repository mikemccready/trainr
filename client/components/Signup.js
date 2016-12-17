import React from 'react';
import { Link, browserHistory } from 'react-router';
import { decode } from '../services/token';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      errorMsg: ''
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signupUser = this.signupUser.bind(this);
  }

  handleFormChange(e) {
    const input = e.target.getAttribute('data-form-input');
    this.setState({ [input]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      this.signupUser();
    }
  }

  signupUser() {
    const that = this;
    const formData = {
      email: this.state.email,
      password: this.state.password
    }

    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.status !== 200) {
          return response.json().then(data => {
            return this.setState({errorMsg: data.error})
          });
        }
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

  render() {
    const passwordUnmatch = (() => {
      if (
        this.state.password !== this.state.confirmPassword &&
        this.state.confirmPassword !== ''
      ) return <h5>Passwords must match</h5>;
    })();

    return (
      <div className="signup-page">
        <h3>Sign up</h3>
        <form onChange={this.handleFormChange} onSubmit={this.handleSubmit}>
          <section>
            <h5>{this.state.errorMsg}</h5>
            <p>
              <label>
                Email
                <input type="email"
                  placeholder="me@trainr.com"
                  data-form-input="email"
                  value={this.state.email}
                />
              </label>
            </p>
            <p>
              <label>
                Password
                <input type="password"
                  placeholder="password"
                  data-form-input="password"
                  value={this.state.password}
                />
              </label>
            </p>
            { passwordUnmatch }
            <p>
              <label>
                Confirm Password
                <input type="password"
                  placeholder="confirm password"
                  data-form-input="confirmPassword"
                  value={this.state.confirmPassword}
                />
              </label>
            </p>
          </section>
          <section>
            <p>
              <button>Join Trainr</button>
            </p>
          </section>
        </form>
        <Link to="/signin">Already joined? Sign in</Link>
      </div>
    )
  }
}
