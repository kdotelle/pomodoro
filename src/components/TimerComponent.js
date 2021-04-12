import React, { Component } from "react";

//clock will countdown
//clock will cycle between active sessions and breaks
//clock should show which cycle it is currently in
//state will be passed as props but will be held in the parent component

class Timer extends Component {
  render() {
    return (
      <div className="clock">
        <span className="session">{this.props.session}</span>
        <p onChange={this.props.setCurrentTime}> {this.props.currentTime} </p>
      </div>
    );
  }
}

export default Timer;
