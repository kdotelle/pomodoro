import React, { Component } from "react";

//clock will countdown
//clock will cycle between active sessions and breaks
//clock should show which cycle it is currently in
//state will be passed as props but will be held in the parent component

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return (
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds)
  );
};
class Timer extends Component {
  render() {
    return (
      <div className="clock">
        <span className="session">{this.props.session}</span>
        <p onChange={this.props.setCurrentTime}>
          {" "}
          {formatTime(this.props.currentTime)}{" "}
        </p>
      </div>
    );
  }
}

export default Timer;
