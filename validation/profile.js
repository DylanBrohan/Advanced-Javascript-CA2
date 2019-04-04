const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  // If it exists it will be the result
  // if School field doesnt exist, make it an empty string
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  // Validation settings/ testing
  if (
    !Validator.isLength(data.handle, {
      min: 6,
      max: 40
    })
  ) {
    errors.handle = "Handle needs to between 6 and 40 charecters ";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile is Required ";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status Field is Required ";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills Field is Required ";
  }

  //   Checks to see if website is not empty, if its not empty check to see if its a real URL
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  // If youtube is not empty
  if (!isEmpty(data.youtube)) {
    // if the url is not valid (youtube)
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  // If linkedin is not empty
  if (!isEmpty(data.linkedin)) {
    // if the url is not valid (linkedin)
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  // If everthing passes, errors will be empty & valid
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
