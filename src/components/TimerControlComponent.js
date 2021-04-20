import React, { Component } from "react";
import BreakController from "./BreakController";
import WorkController from "./WorkController";

//controls should have an option for break length and active session length
//default should be 5 min break 20 min session
//timer should have a reset button

class TimerControl extends Component {
  render() {
    return (
      <div className="controls">
        <p> Timer Controls </p>

        <BreakController
          break={this.props.breakTime}
          onIncrementBreak={this.props.onIncrementBreak}
          onDecrementBreak={this.props.onDecrementBreak}
        />
        <WorkController
          work={this.props.workTime}
          onIncrementWork={this.props.onIncrementWork}
          onDecrementWork={this.props.onDecrementWork}
        />

        <button onClick={this.props.resetClock}> Reset </button>
        <button onClick={this.props.timer}> {this.props.status} </button>
      </div>
    );
  }
}

export default TimerControl;
