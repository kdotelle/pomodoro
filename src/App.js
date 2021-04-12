import "./App.css";
import React, { Component } from "react";
import Timer from "./components/TimerComponent";
import TimerControl from "./components/TimerControlComponent";

//state is held here and will be passed to the children
//state should hold the session cycle and
//function to increase time on timer and decrease time on timer

class App extends Component {
  constructor() {
    super();
    this.state = {
      cycle: "Session",
      breakTime: 5,
      workTime: 20,
    };
  }

  resetClock = () => {
    this.setState({
      cycle: "Session",
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Clock </h1>
        </header>
        <Timer session={this.cycle} />
        <TimerControl
          breakTime={this.state.breakTime}
          workTime={this.state.workTime}
          onIncrementBreak={this.incrementBreakTime}
          onDecrementBreak={this.decrementBreakTime}
          onIncrementWork={this.incrementWorkTime}
          onDecrementWork={this.decrementWorkTime}
        />
        <button onClick={this.resetClock}> Reset </button>
      </div>
    );
  }
}

export default App;
