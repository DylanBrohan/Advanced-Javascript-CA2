import React, { Component } from "react";
import { Link } from "react-router-dom";
// Connected to redux to access off state
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/musicActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    // This clears the profile state just as the user logs out
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    // Pulling authenticated and users from props destructuering
    const { isAuthenticated, user } = this.props.auth;

    // Setting Authenticated links
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Your Dashbaord
          </Link>
        </li>

        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              // Pulling from the users state
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You Need a Gravatar connected to your Email"
            />
            Logout
          </a>
        </li>
      </ul>
    );
    // Guest Links what a user who is not logged in will see
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          {/* Link back to Landing page */}
          <Link className="navbar-brand" to="/">
            My Music{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Navbar styling */}
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                {/* Link to Profiles to view other users */}
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Artists
                </Link>
              </li>
            </ul>
            {/* If the user is Authenticated - AuthLinks else - GuestLinks */}
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}
// Prop Checking
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
// Mapping the state to the props
const mapStateToProps = state => ({
  auth: state.auth
});
// Connecting to the redux store and pulling out the types
export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
