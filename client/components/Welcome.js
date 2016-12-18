import React from 'react';
import { Link } from 'react-router';

export default function Welcome(props) {
  return (
      <div className="welcome-page">
        <h3><Link to="/signup">Sign up</Link></h3>
        <h3><Link to="/signin">Sign in</Link></h3>
      </div>
  )
}
