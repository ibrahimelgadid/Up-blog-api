const validator = require("validator");
const isEmpty = require("../helpers/isEmpty");

module.exports = function resetPassValidation(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.password, { min: 4, max: 20 })) {
    errors.password = "password value must be between 2 and 20 charchter";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
