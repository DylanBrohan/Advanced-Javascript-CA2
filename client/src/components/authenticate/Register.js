import React, { Component } from "react";
// Prop Types
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
// connects redux to this component
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import TextFieldGroup from "../inputs/textFieldGroup";
// Main Register page
class Register extends Component {
  constructor() {
    super();
    // Sets the state
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    // Links each of the fields to the components state
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    // Check for an error prop
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  //   Whenever user types, set the state variables
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    // any actions is called through props
    // History allows to redirect within the action
    this.props.registerUser(newUser, this.props.history);
  }
  //   <-- Register -->
  render() {
    // If we have errors
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your My Music Account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This Site Uses Gravatar"
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Comfirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input
                  type="submit"
                  className="btn btn-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Mapping all prop types
// PropTypes for typechecking check when wrong props are passed through the component
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
// putting auth state inside a property called auth for easy access
// maps the state from the store to this component
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
// maps actions in component Register
// creates connection to the store
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
