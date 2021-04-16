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
      timerId: 0,
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
    if (this.state.cycle === "Break") {
      this.setState({
        breakTime: this.state.breakTime + 1,
        currentTime: `${this.state.breakTime} : 00`,
      });
    } else {
      this.setState({
        breakTime: this.state.breakTime + 1,
      });
    }
    this.setCurrentTime();
  };

  decrementBreakTime = () => {
    if (this.state.cycle === "Break") {
      this.setState({
        breakTime: this.state.breakTime - 1,
        currentTime: `${this.state.breakTime} : 00`,
      });
    } else {
      this.setState({
        breakTime: this.state.breakTime - 1,
      });
    }
    this.setCurrentTime();
  };

  incrementWorkTime = () => {
    if (this.state.cycle === "Session") {
      this.setState({
        workTime: this.state.workTime + 1,
        currentTime: `${this.state.workTime} : 00`,
      });
    } else {
      this.setState({
        workTime: this.state.workTime + 1,
      });
    }
    this.setCurrentTime();
  };

  decrementWorkTime = () => {
    if (this.state.cycle === "Session") {
      this.setState({
        workTime: this.state.workTime - 1,
        currentTime: `${this.state.workTime} : 00`,
      });
    } else {
      this.setState({
        workTime: this.state.workTime - 1,
      });
    }
    this.setCurrentTime();
  };

  // startTimer = () => {
  //   this.state.timerRunning
  //     ? this.setState({
  //         timerRunning: false,
  //         status: "Start",
  //       })
  //     : this.setState({
  //         timerRunning: true,
  //         status: "Stop",
  //       });
  // };

  startTimer = (duration) => {
    this.setState({ timerRunning: true });
    let time = duration * 60;
    let minutes;
    let seconds;
    let runningTimer = setInterval(() => {
      this.setState({
        timerId: runningTimer,
      });
      minutes = Math.floor(time / 60);
      seconds = time - minutes * 60;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.setState({ currentTime: `${minutes} : ${seconds}` });
      if (time == 0) {
        if (this.state.cycle === "Session") {
          this.setState({
            cycle: "Break",
            timerRunning: false,
            status: "Start",
          });
          clearInterval(this.state.timerId);
          this.startTimer(this.state.breakTime);
        } else {
          this.setState({
            cycle: "Session",
            timerRunning: false,
            status: "Stop",
          });
          clearInterval(this.state.timerId);
          this.startTimer(this.state.workTime);
        }
      }
    }, 1000);
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

  setCurrentTime = () => {
    if (!this.state.timerRunning) {
      this.state.cycle === "Session"
        ? this.setState({
            currentTime: `${this.state.workTime} : 00`,
          })
        : this.setState({
            currentTime: `${this.state.breakTime} : 00`,
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
          <button onClick={this.timer}> {this.state.status} </button>
        </span>
      </div>
    );
  }
}

export default App;
