const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  // If it exists it will be the result
  //   if title field doesnt exist, make it an empty string
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // If the title field is empty, title has an error
  if (Validator.isEmpty(data.title)) {
    errors.title = "Job Title Field is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company Field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From Date Field is required";
  }
  // If everthing passes, errors will be empty & valid

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
