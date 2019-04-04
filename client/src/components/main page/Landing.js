import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  // when the component executes
  // If the the user is authenticated via props, push / redirect to that specific dashboard
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      //  <!-- Landing -->
      <div className="landing">
        {/* Styling and grid  */}
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">My Music</h1>
                <p className="lead">
                  Are you an Music Artist? Or just a Music fan? Create a Profile
                  and Browse Other Artists
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-success mr-2">
                  Sign Up
                </Link>

                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

// Mapping from the Store to the state
const mapStateToProps = state => ({
  auth: state.auth
});
// Connction to Store
export default connect(mapStateToProps)(Landing);
