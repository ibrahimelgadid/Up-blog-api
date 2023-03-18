const validator = require("validator");
const isEmpty = require("../helpers/isEmpty");

const validateResetMailInputs = (data) => {
  const errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;

  //---------------------------------------------|
  //           validate email
  //---------------------------------------------|
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Insert valid email";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = validateResetMailInputs;
