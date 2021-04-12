import React, { Component } from "react";

class WorkController extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onDecrementWork}> - </button>
        <span> {this.props.work} </span>
        <button onClick={this.props.onIncrementWork}> + </button>
      </div>
    );
  }
}

export default WorkController;
