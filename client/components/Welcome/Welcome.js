import React from 'react';
import { Link } from 'react-router';

import styles from './welcome.scss';

export default function Welcome(props) {
  return (
      <div className={styles.welcome}>
        <div className={styles['welcome-block']}>
          <h3><Link to="/signup">Sign up</Link></h3>
          <h1 className={styles['welcome-header']}>trainr</h1>
          <h3><Link to="/signin">Sign in</Link></h3>
        </div>
      </div>
  )
}
