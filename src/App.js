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
      currentTime: 25 * 60,
      cycle: "Session",
      breakTime: 5,
      workTime: 25,
      timerId: null,
    };
  }

  resetClock = () => {
    this.setState({
      cycle: "Session",
      currentTime: 25 * 60,
      breakTime: 5,
      workTime: 25,
    });
  };

  setSession = () => {
    this.setState({
      cycle: "Session",
    });
  };

  incrementBreakTime = () => {
    if (this.state.cycle === "Break") {
      this.setState({
        breakTime: this.state.breakTime + 1,
        currentTime: (this.state.breakTime + 1) * 60,
      });
    } else {
      this.setState({
        breakTime: this.state.breakTime + 1,
      });
    }
  };

  decrementBreakTime = () => {
    if (this.state.breakTime > 0) {
      if (this.state.cycle === "Break") {
        this.setState({
          breakTime: this.state.breakTime - 1,
          currentTime: (this.state.breakTime - 1) * 60,
        });
      } else {
        this.setState({
          breakTime: this.state.breakTime - 1,
        });
      }
    }
  };

  incrementWorkTime = () => {
    if (this.state.cycle === "Session") {
      this.setState({
        workTime: this.state.workTime + 1,
        currentTime: (this.state.workTime + 1) * 60,
      });
    } else {
      this.setState({
        workTime: this.state.workTime + 1,
      });
    }
  };

  decrementWorkTime = () => {
    if (this.state.workTime > 0) {
      if (this.state.cycle === "Session") {
        this.setState({
          workTime: this.state.workTime - 1,
          currentTime: (this.state.workTime - 1) * 60,
        });
      } else {
        this.setState({
          workTime: this.state.workTime - 1,
        });
      }
    }
  };

  startTimer = () => {
    this.setState({ timerRunning: true });

    if (!this.state.timerRunning) {
      this.setState({
        timerRunning: !this.state.timerRunning,
        status: "Stop",
        timerId: setInterval(() => {
          this.decreaseTimer();
          this.changeCycle();
        }, 1000),
      });
    } else {
      this.state.timerId && clearInterval(this.state.timerId);
      this.setState({
        timerRunning: !this.state.timerRunning,
        status: "Start",
        timerId: null,
      });
    }
  };

  changeCycle = () => {
    if (this.state.currentTime === -1) {
      if (this.state.cycle === "Session") {
        this.setState({
          cycle: "Break",
          currentTime: this.state.breakTime * 60,
        });
      } else {
        this.setState({
          cycle: "Session",
          currentTime: this.state.workTime * 60,
        });
      }
    }
  };

  decreaseTimer = () => {
    this.setState({
      currentTime: this.state.currentTime - 1,
    });
  };

  timer = () => {
    if (this.state.timerRunning) {
      clearInterval(this.state.timerId);
      this.setState({
        timerRunning: false,
        status: "Start",
      });
    } else {
      this.setState({
        timerRunning: true,
        status: "Stop",
      });
      this.state.cycle === "Session"
        ? this.startTimer(this.state.workTime)
        : this.startTimer(this.state.breakTime);
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Pomodoro Clock </h1>
        </header>
        <Timer
          session={this.state.cycle}
          currentTime={this.state.currentTime}
        />
        <div id="control-wrapper">
          <TimerControl
            breakTime={this.state.breakTime}
            workTime={this.state.workTime}
            onIncrementBreak={this.incrementBreakTime}
            onDecrementBreak={this.decrementBreakTime}
            onIncrementWork={this.incrementWorkTime}
            onDecrementWork={this.decrementWorkTime}
            setCurrentTime={this.setCurrentTime}
            status={this.state.status}
            reset={this.resetClock}
          />
        </div>
      </div>
    );
  }
}

export default App;
