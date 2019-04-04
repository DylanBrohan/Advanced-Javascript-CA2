import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteExperience } from "../../actions/profileActions";
import Moment from "react-moment";

class Experience extends Component {
  // On delete click -> by id
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }
  render() {
    // MAP through the experience array and pull out
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          {/* Bind to state of ondeleteclick  */}
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn                                  btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th> </th>
            </tr>
            {/* Display the experience via state */}
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}
Experience.proptype = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
