import { SET_CURRENT_USER } from "../actions/Constants";
import isEmpty from "../validation/is-empty";
// Creates an initial state and its parameters
const initialState = {
  isAuthenticated: false,
  user: {}
};
// Dispatch actions to this reducer, and test with a switch
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        //   Current State
        // Spread Opperator
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        // The users information is the actual payload
        user: action.payload
      };
    default:
      return state;
  }
}
