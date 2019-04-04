const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  // Setting errors to be empty
  let errors = {};

  // If it exists it will be the result
  //   if School field doesnt exist, make it an empty string
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // If the validator isEmpty (school) ->
  if (Validator.isEmpty(data.school)) {
    errors.school = "School Field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree Field is required";
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study is required";
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
