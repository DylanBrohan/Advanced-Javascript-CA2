import React from "react";
import { Link } from "react-router-dom";

// Links to Areas in Profile
const ProfileActions = () => {
  return (
    // Grid and button styling around each
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-success mr-1" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-success mr-1" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-success mr-1" />
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;
