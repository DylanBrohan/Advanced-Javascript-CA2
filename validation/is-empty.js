// --Specialised isEmpty Function---
// Checks for - EMPTY, Object,String & null
// Setting the parameters for isEmpty validation function
const isEmpty = value =>
  value === undefined ||
  value === null ||
  // if the type of value = an object & object keys ie empty
  (typeof value === "object" && Object.keys(value).length === 0) ||
  // OR = a string & length is 0
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
