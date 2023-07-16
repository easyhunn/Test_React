import { Component } from "react";

export default class App2 extends Component  {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
      }
   
    countUntilDoom = () => {
      this.setState({
        counter: this.state.counter + 1
      })
    };
    componentDidUpdate() {
        if (this.state.counter > 1) {
            debugger
            throw new Error ("something went wrong");
        }
    }
    render() {
        return (
            <div className="App">
              <h1>Hello CodeSandbox</h1>
              <h2>Start editing to see some magic happen!</h2>
              <button onClick={this.countUntilDoom}>Click on me for money</button>
              <h2>{this.state.counter}</h2>
            </div>
          );
    }
  }