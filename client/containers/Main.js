import React from 'react';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>trainr</h1>
        { this.props.children }
      </div>
    );
  }
}
