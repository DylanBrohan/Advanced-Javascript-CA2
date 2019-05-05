import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import axios from "axios";

class ProfileAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    // Takes from parent component PROFILE
    const { profile } = this.props;
    // Get First Name
    const firstName = profile.user.name.trim().split(" ")[0];

    // GetSkill list
    const skill = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      //   Profile About
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            {/* Pull out first name from the state and display */}
            <h3 className="text-center text-success">{firstName}'s Bio</h3>
            <p className="lead">
              {/* Id the users bio is empty display the following */}
              {isEmpty(profile.bio) ? (
                <span> {firstName}Does Not Have a Bio</span>
              ) : (
                // Else pull from state
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-left text-success col-sm-4">Music Skills </h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {/* Pull skills from state */}
                {skill}
              </div>
            </div>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Prop Checking - is Required
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
