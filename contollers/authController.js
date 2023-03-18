//---------------------------------------------|
//           All required modules
//---------------------------------------------|
const bcrypt = require("bcryptjs");
const validateRegistrationInputs = require("../validation/registerValidate");
const Auth = require("../models/authModel");
const validateLoginInputs = require("../validation/loginValidate.");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//---------------------------------------------|
//           Register functionality
//---------------------------------------------|
const register = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const { isValid, errors } = validateRegistrationInputs(req.body);
  if (!isValid) return res.status(400).json(errors);

  const userExists = await Auth.findOne({ email });

  if (userExists) {
    errors.email = "This email already exists";
    return res.status(400).json(errors);
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Auth({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const newUserAdded = await newUser.save();

    if (newUserAdded) {
      res.status(201).json(newUserAdded);
    } else {
      res.status(400).json({ RegErr: "Failed to create user" });
    }
  }
});

//---------------------------------------------|
//           Login functionality
//---------------------------------------------|
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { isValid, errors } = validateLoginInputs(req.body);
  if (!isValid) return res.status(400).json(errors);

  const user = await Auth.findOne({ email });
  if (!user) {
    errors.email = "This email is not exists";
    return res.status(404).json(errors);
  } else {
    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) {
      errors.password = "Wrong password";
      return res.status(404).json(errors);
    } else {
      res.status(200).json({
        _id: user._id,

        token: generateToken(user.id),
      });
    }
  }
});

//---------------------------------------------|
//           generate token functionality
//---------------------------------------------|
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// export modules
module.exports = {
  register,
  login,
};
