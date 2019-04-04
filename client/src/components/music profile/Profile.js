// Component for the container for the header about & Credentials etc.
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// All Sub Components of Profile
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import Spinner from "../inputs/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {
  // When the component loads
  componentDidMount() {
    if (this.props.match.params.handle) {
      // If the props handle matches get the users profile via their handle
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  // When theres an update in statae
  componentWillReceiveProps(nextProps) {
    // If there is no profile in the props and the profile is loading ->
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      // IF they are true redirect
      this.props.history.push("/not-found");
    }
  }
  render() {
    //   Checks
    // Using destructuring to take out the profile from state
    const { profile, loading } = this.props.profile;
    let profileContent;
    // If profile is not there or loading - load spinner
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      // Else display profile content
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          {/* Getting the data from this component */}
          {/* passes in properties from profile to the sub components */}
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

// Prop checking - are required
Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
// Mapping state to the props of this component from the store
const mapStateToProps = state => ({
  profile: state.profile
});
// Connecting to Store and its types
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
