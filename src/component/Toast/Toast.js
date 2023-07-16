import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from "./Toast.module.scss";

class Toast extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            toasts: null
        }
    }

  static getDerivedStateFromProps(nextProps, prevState){
    if( nextProps?.toasts[0]?.id !== (prevState?.toasts && prevState?.toasts[0]?.id )){
        return {...prevState, toasts: nextProps.toasts};
    }
    return null;
  }
//   shouldComponentUpdate(nextProps, nextState) {
//    debugger
//         return false;
//   }
  componentDidUpdate(prevProps, prevState) {
   }
  render() {
    const toasts = this.state?.toasts,
        currentToast = toasts && toasts.some(x => x) ? toasts[0] : null;

    if (currentToast?.id) {
        return (
            <div className={styles.Toast}>
             {currentToast?.message}
            </div>
          );
    }
  }
}
const mapStateToProps = (state) => {
    return {
        toasts: state.toasts.toasts,
      }
};

export default connect(mapStateToProps)(Toast);

