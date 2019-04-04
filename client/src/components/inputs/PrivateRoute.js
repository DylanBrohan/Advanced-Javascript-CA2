import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    // Spread Attributes
    {...rest}
    render={props =>
      //  if this is = true we are logged in
      auth.isAuthenticated === true ? (
        // load component
        <Component {...props} />
      ) : (
        // if not redirect to login
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
// Map props from the state
const mapStateToProps = state => ({
  auth: state.auth
});
// Connect to redux store
export default connect(mapStateToProps)(PrivateRoute);
