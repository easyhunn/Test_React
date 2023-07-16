import { combineReducers } from "redux";
import toasts from './toasts';
import todo from './todo';

const getReducers = () => {
    return combineReducers({
     toasts ,
     todo
    });
  };
  
  export default getReducers;
  