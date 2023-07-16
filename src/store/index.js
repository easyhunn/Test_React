import { applyMiddleware, compose, createStore } from "redux";
import getReducers from "../reducer";
// import { forbiddenWordsMiddleware } from "../middleware";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initStore = (initialState) => {
    let store = createStore(
      getReducers(),
      initialState || {},
      storeEnhancers(applyMiddleware( thunk))
    );
  
    return store;
  };