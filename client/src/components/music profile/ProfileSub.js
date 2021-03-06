import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    //   Destructering from Profile component
    const { experience, education } = this.props;

    // Mapping through both experience & education Items
    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        {/* Display experience company */}
        <h4>{exp.company}</h4>
        <p>
          {/* as a Moment Component display from state */}
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {/* If experience to date is null = Now, Else pull form state */}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </p>
        <p>
          {/* Pull from state */}
          <strong>Position: </strong> {exp.title}
        </p>
        {/* If Locaiton is = nothing let it = null if not pull in  */}
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>Location:</strong>
              {exp.location}
            </span>
          )}
        </p>

        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Description:</strong>
              {exp.description}
            </span>
          )}
        </p>
      </li>
    ));
    // map through education property
    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree: </strong> {edu.degree}
        </p>
        {/* If Locaiton is = nothing let it = null if not pull in  */}
        <p>
          <strong>Field Of Study: </strong> {edu.fieldofstudy}
        </p>

        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Description:</strong>
              {edu.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-success">Experience</h3>
          {/* If there is more than 1 experience display from state  */}
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            // Else there is no Experience Fields
            <p className="text-center">No Experience Fields</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-success">Education</h3>{" "}
          {/* If there is more than 1 education display from state  */}
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            // Else there is no Education Fields
            <p className="text-center">No Education Fields</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
