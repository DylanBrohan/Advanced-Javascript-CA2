import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
// Field Components
import TextFieldGroup from "../inputs/textFieldGroup";
import TextAreaFieldGroup from "../inputs/TextAreaFieldGroup";
// Redux
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { addEducation } from "../../actions/musicActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    // Sets Initial state
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
    // Bings functions to state
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }
  // do this when their is an update in state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    // Education Object
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.decription
    };
    // Call props add Education
    this.props.addEducation(eduData, this.props.history);
  }
  // On Change set the state for that value
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // Changed Disabled state & Current state
  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    //   --Curley Braces pulls errors out--
    // Destructuring of errors
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {/* Public link */}
              <Link to="/dashboard" className="btn btn-light">
                Dashboard
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>

              <p className="lead text-center">
                Add any Education you have Attended
              </p>
              <small className="d-block.pb-3">* = Required Fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="Field Of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  //   If it is true to will be disabled
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current
                  </label>
                  <TextAreaFieldGroup
                    placeholder="Program Description"
                    name="decription"
                    value={this.state.decription}
                    onChange={this.onChange}
                    error={errors.decription}
                    info="Tell us More "
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-success btn-block mt-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Prop Checking Fields
AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
// Mapping State from store to props
const mapStateToProps = state => ({
  // Brings in state from reducer
  profile: state.profile,
  errors: state.errors
});
// Connecting to Store
export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
