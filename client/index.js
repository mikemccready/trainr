import React from "react";
import ReactDOM from "react-dom";

const app = document.getElementsByClassName('app')[0];

class Main extends React.Component {
  render() {
    return (
      <h1>trainr</h1>
    );
  }
}

ReactDOM.render(<Main />, app);
