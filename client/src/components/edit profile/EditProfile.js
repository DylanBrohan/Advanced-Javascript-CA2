import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
// Uses same Profile action as CreateProfile
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
// IsEmpty Function
import isEmpty from "../../validation/is-empty";
// Input Components
import TextFieldGroup from "../inputs/textFieldGroup";
import TextAreaFieldGroup from "../inputs/TextAreaFieldGroup";
import InputGroup from "../inputs/InputGroup";
import SelectListGroup from "../inputs/SelectListGroup";

class CreateProfile extends Component {
  // Component state values
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      //   Get errors from redux state
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    //   Fetches profile when the component loads
    this.props.getCurrentProfile();
  }
  //   This will run with the received props (CurrentUser)
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    // Profile state & profile object
    // Check for profile & set this variable to profile for easy access
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      //   Brings Skills array back to a CSV
      const skillsCSV = profile.skills.join("");

      //   if profile field doesnt exist, make an empty string
      // If its there will be used if not return an empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";

      profile.website = !isEmpty(profile.website) ? profile.website : "";

      profile.location = !isEmpty(profile.location) ? profile.location : "";

      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

      // Social is an Array so must be treated like an empty string
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      // All are contained within profile-social-
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";

      profile.facebook = !isEmpty(profile.social.facebook)
        ? // If it exists it will be the result
          profile.social.facebook
        : // if not its an empty string
          "";

      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";

      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";

      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // Sets Component Fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    // Has All the profile fields
    // Gets everything in the form
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    // Redux actions are always in the Props
    // Then calls create profile
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    // This will come from the constructor errors state
    const { errors, displaySocialInputs } = this.state;
    // This contains all social inputs
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile Url"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile Url"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linked Profile Url"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube Profile Url"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Profile Url"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Solo Artist", value: "Solo Artist" },
      { label: "Mix DJ", value: "Mix DJ" },
      { label: "MC", value: "MC" },
      { label: "Vocalist", value: "Vocalist" },
      { label: "Rock Band", value: "Rock Band" },
      { label: "Hip-Hop Artist", value: "Hip-Hop Artist" },
      { label: "Alternative Group", value: "Alternative Group" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Dashboard
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <p className="lead text-center">
                Edit Information In Your Profile
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A Unique handle for your Profile Url !"
                />
                <SelectListGroup
                  placeholder="* Professional Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Tell Others Your Profession!"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Company of work?"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Want to Show of your Beats? Give a Website"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Place of Living?"
                />
                <TextFieldGroup
                  placeholder="Musical Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma Seperated values (eg.Guitar,Drummer,Deck Mixing,Synthesizers)"
                />
                <TextFieldGroup
                  placeholder="GitHub"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="Add Your Github Repos for Extra Umphh"
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell Other Music Artists about yourself"
                />
                <div className="mb-3">
                  <button
                    // Toggles displaySocialInputs component
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>

                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
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
// creates Prop Types
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Maps the state to the Field
const mapStateToProps = state => ({
  // current profile will get mapped to props
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: state.profile,
  // Listens for the errors state, in the Errors Reducer
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
