import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showToast } from '../../action/toasts';
import axios from 'axios';

class Counter extends Component {
  
  constructor(props) {
    super(props);
    this.state = { color: 'green', count: 1 , anime: null};
  }
  // static getDerivedStateFromProps(nextProps, nextState) {
  //   if (nextState.count !== 1) {
  //     return {...nextState, color: "zzzz"};

  //   }
  //   return null;
  // }

  componentDidMount() {
    // console.log("counter Did mount");
    // console.log(this);
    let me = this;
    let options = {
      method: 'POST',
      url: "https://graphql.anilist.co/",
      data: {
        query: `{
          Character(id: 1) {
            name {
              first
              middle
              last
              full
              native
              userPreferred
            }
            image {
              large
              medium
            }
          }
        }`
      }
    }
    axios
		.request(options)
		.then(function (response) {
      console.log(response.data);
      me.setState({anime: response.data.data})
		})
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  // }
  componentDidUpdate() {
  }

  // custom

  increaseCount = () => {
    this.setState({count: this.state.count + 1});
  }
  
  
  render() {
    const dispatch = this.props.dispatch;
    return (
      <div className="Counter">
       i am counter {this.state.count} - {this.state.color}
        <br />
        <button onClick={() => this.increaseCount()}>Increase</button>
        <br />
        <button onClick={() => showToast(dispatch, "hello")}>show toast</button>
        <br />

        <pre>
          { JSON.stringify(this.state.anime, null, 2)}
        </pre>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapDispatchToProps)(Counter);
