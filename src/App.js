import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { ErrorBoundary } from "./component/Error/ErrorBoundary";
import Toast from "./component/Toast/Toast";
// import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { color: "green", count: 1 };
  }
 

  changeColor = () => {
    this.setState({ color: "red" });
  };
  render() {
    return (
      <ErrorBoundary>
        <div className="App">
          <Toast />i am {this.state.count} {this.state.color} class component
          named {this.props.appName}
          <br />
          <button onClick={() => this.changeColor()}>Change Color</button>
          <br />
          <br />
          <br />

          <div className="nav d-flex justify-content-center">
            <Link to="/" className="mr-2">
              Intro
            </Link>
            <Link state={{ data: this.state.count }} to="/Counter" className="mr-2">
              Counter
            </Link>
            {/* <Link to="/Table"  className="mr-2">
              Table
            </Link> */}
            <Link to="/Modal"  className="mr-2">
              Modal
            </Link>
            <Link to="/Form"  className="mr-2">
              Form
            </Link>
          </div>
          <br />
          <Outlet />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
