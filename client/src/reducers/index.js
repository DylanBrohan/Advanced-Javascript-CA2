// Root Reducer
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

// Combining all reducers into a single reducer
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
