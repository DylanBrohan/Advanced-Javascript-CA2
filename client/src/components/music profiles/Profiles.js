import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Components
import Spinner from "../inputs/Spinner";
import { getProfiles } from "../../actions/musicActions";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  // When the page runs call getProfiles
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    // Destructuring profiles & loading
    const { profiles, loading } = this.props.profile;
    let profileItems;
    // If theres no profiles or its loading
    if (profiles === null || loading) {
      // If thats true load spinner gif
      profileItems = <Spinner />;
    } else {
      // if there is profiles run else load h4
      if (profiles.length > 0) {
        // Map profiles that are coming through the state
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No Profiles Found</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Artists Profiles</h1>
              <p className="lead text-center">
                Browse and Connect with Other Music Lovers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Prop Checking on these fields are required
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
// Mapping state from store to profile
const mapStateToProps = state => ({
  profile: state.profile
});
// Connecting to the store
export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
