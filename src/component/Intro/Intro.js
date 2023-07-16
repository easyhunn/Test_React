import React, { Component } from "react";
import { connect } from "react-redux";
import { addToDoData } from "../../action/todo";
import InputTagsCustom from "../Input/InputTagsCustom/InputTagsCustom";
import { MultiSelect } from "../Input/CustomReactSelect/SelectAllType";

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "green",
      count: 1 ,
      selected: []
  };
  }

  increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };
  componentDidUpdate() {
    if (this.state.count > 3) {
      throw new Error("error from intro");
    }
  }
  todoList() {
    const todoList = this.props.todo.todo;
    return todoList?.map((todo, key) => <span key={key}>{todo}, </span>);
  }
  onChange = (data) => {
    this.setState({selected: data});
  }
  render() {
    const dispatch = this.props.dispatch;
  const options = [
    { value: "1", label: "Jimmy" },
    { value: "2", label: "Laura" },
    { value: "3", label: "Tommy" },
    { value: "4", label: "Jane" },
    { value: "5", label: "Mike" }
  ];
    return (
      <div className="Intro">
        i am Intro {this.state.count}
        <br />
        <button onClick={() => this.increaseCount()}>Increase</button>
        <br />
        <button onClick={() => dispatch(addToDoData())}>Add To Do </button>
        <div>todo list: {this.todoList()}</div>
        <br />
        <br />
        <InputTagsCustom />
        <MultiSelect  options={options} value={this.state.selected} onChange={this.onChange}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todo: state.todo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
