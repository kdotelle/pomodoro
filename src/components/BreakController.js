import React, { Component } from "react";

class BreakController extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onDecrementBreak}> - </button>
        <span> {this.props.break} </span>
        <button onClick={this.props.onIncrementBreak}> + </button>
      </div>
    );
  }
}

export default BreakController;
