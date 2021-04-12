import "./App.css";
import React, { Component } from "react";
import Timer from "./components/TimerComponent";
import TimerControl from "./components/TimerControlComponent";

//state is held here and will be passed to the children
//state should hold the session cycle and
//function to increase time on timer and decrease time on timer
//should have a start/stop button to stop and start the timer countdown

class App extends Component {
  constructor() {
    super();
    this.state = {
      timerRunning: false,
      status: "Start",
      currentTime: "20 : 00",
      cycle: "Session",
      breakTime: 5,
      workTime: 20,
    };
  }

  resetClock = () => {
    this.setState({
      cycle: "Session",
      currentTime: "20 : 00",
      breakTime: 5,
      workTime: 20,
    });
  };

  setSession = () => {
    this.setState({
      cycle: "Session",
    });
  };

  incrementBreakTime = () => {
    this.setState({
      breakTime: this.state.breakTime + 1,
    });
  };

  decrementBreakTime = () => {
    this.setState({
      breakTime: this.state.breakTime - 1,
    });
  };

  incrementWorkTime = () => {
    this.setState({
      workTime: this.state.workTime + 1,
    });
  };

  decrementWorkTime = () => {
    this.setState({
      workTime: this.state.workTime - 1,
    });
  };

  startTimer = () => {
    this.state.timerRunning
      ? this.setState({
          timerRunning: false,
          status: "Start",
        })
      : this.setState({
          timerRunning: true,
          status: "Stop",
        });
  };

  setCurrentTime = () => {
    if (this.state.timerRunning === false) {
      this.state.cycle === "Session"
        ? this.setState({
            currentTime: this.state.workTime,
          })
        : this.setState({
            currentTime: this.state.breakTime,
          });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Clock </h1>
        </header>
        <Timer
          session={this.state.cycle}
          currentTime={this.state.currentTime}
        />
        <TimerControl
          breakTime={this.state.breakTime}
          workTime={this.state.workTime}
          onIncrementBreak={this.incrementBreakTime}
          onDecrementBreak={this.decrementBreakTime}
          onIncrementWork={this.incrementWorkTime}
          onDecrementWork={this.decrementWorkTime}
          setCurrentTime={this.setCurrentTime}
        />
        <span>
          <button onClick={this.resetClock}> Reset </button>
          <button onClick={this.startTimer}> {this.state.status} </button>
        </span>
      </div>
    );
  }
}

export default App;
