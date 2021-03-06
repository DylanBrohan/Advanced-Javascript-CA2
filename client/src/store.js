import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
// Redux Thunk is Middleware for dispatching to reducers
const middleware = [thunk];

const initialState = {};

//First parametre [] is  reducer
const store = createStore(
  // Passes in rootReducer which has all the sub reducers combined
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // Implements Redux extension
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
