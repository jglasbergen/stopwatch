import React from "react";
import PageVisibility from "react-page-visibility";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <Stopwatch />
    </div>
  );
}

class Stopwatch extends React.Component {
  state = {
    status: false,
    runningTime: 0
  };

  handleVisibilityChange = isVisible => {
    if (isVisible && this.state.status === true) {
      const startTime = Date.now() - this.state.runningTime;
      this.timer = setInterval(() => {
        this.setState({ runningTime: Date.now() - startTime });
      });
    } else {
      clearInterval(this.timer);
    }
    // this.setState({ status: !isVisible });
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleClick = () => {
    this.setState(state => {
      if (state.status) {
        clearInterval(this.timer);
      } else {
        const startTime = Date.now() - this.state.runningTime;
        this.timer = setInterval(() => {
          this.setState({ runningTime: Date.now() - startTime });
        });
      }
      return { status: !state.status };
    });
  };

  handleReset = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, status: false });
  };

  time = ms => {
    return new Date(ms).toISOString().slice(11, -1);
  };
  render() {
    const { status, runningTime } = this.state;
    return (
      <PageVisibility onChange={this.handleVisibilityChange}>
        <div>
          <p>{this.time(runningTime)}ms</p>
          <button onClick={this.handleClick}>
            {status ? "Stop" : "Start"}
          </button>
          <button onClick={this.handleReset}>Reset</button>
        </div>
      </PageVisibility>
    );
  }
}

export default App;
