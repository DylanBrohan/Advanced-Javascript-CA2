import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    // Pulls profile from the properties of this component - from parent component profiles
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            {/* Have to test is company empty as its not required */}
            <p>
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at{profile.company}</span>
              )}
            </p>
            <p>
              {/* If the location is empty then nothing else, put it in a span */}
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            {/* View Profile through the profile handle of the users  */}
            <Link to={`/profile/${profile.handle}`} className="btn btn-success">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>

            <ul className="list-group">
              {/* Slices the array */}
              {/* & Maps them to index-skill */}
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1">{skill}</i>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
