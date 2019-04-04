import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteEducation } from "../../actions/profileActions";
import Moment from "react-moment";

// Education Component
class Education extends Component {
  // On delete -> by the id from props
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }
  render() {
    // Map through the education array props
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          {/* On Click delete education via their _id */}
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn                                  btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th> </th>
            </tr>
            {/* Display education */}
            {education}
          </thead>
        </table>
      </div>
    );
  }
}
Education.proptype = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
