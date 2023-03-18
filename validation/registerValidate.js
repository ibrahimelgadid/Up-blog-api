const validator = require("validator");
const isEmpty = require("../helpers/isEmpty");

const validateRegistrationInputs = (data) => {
  const errors = {};

  data.firstname = isEmpty(data.firstname) ? "" : data.firstname;
  data.lastname = isEmpty(data.lastname) ? "" : data.lastname;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.confirmPassword = isEmpty(data.confirmPassword)
    ? ""
    : data.confirmPassword;

  //---------------------------------------------|
  //           validate username
  //---------------------------------------------|
  if (!validator.isLength(data.firstname, { min: 3, max: 20 })) {
    errors.firstname = "firstname value must be between 3 and 20 charchter";
  }

  if (validator.isEmpty(data.firstname)) {
    errors.firstname = "firstname is required";
  }

  if (!validator.isLength(data.lastname, { min: 3, max: 20 })) {
    errors.lastname = "lastname value must be between 3 and 20 charchter";
  }

  if (validator.isEmpty(data.lastname)) {
    errors.lastname = "lastname is required";
  }

  //---------------------------------------------|
  //           validate email
  //---------------------------------------------|
  if (!validator.isEmail(data.email)) {
    errors.email = "Insert valid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  //---------------------------------------------|
  //           validate password
  //---------------------------------------------|
  if (!validator.isLength(data.password, { min: 4, max: 20 })) {
    errors.password = "Password value must be between 4 and 20 charchter";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = validateRegistrationInputs;
