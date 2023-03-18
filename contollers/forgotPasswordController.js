//---------------------------------------------|
//           All required modules
//---------------------------------------------|
const resetPassValidation = require("../validation/resetPassValidate");
const resetMailValidation = require("../validation/resetMailValidate");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../helpers/email");
const Auth = require("../models/authModel");
const ResetPass = require("../models/resetPassModel");
const bcrypt = require("bcryptjs");

//---------------------------------------------|
//           resetMail functionality
//---------------------------------------------|
exports.resetMail = asyncHandler(async (req, res) => {
  // validate inputs
  let { errors, isValid } = resetMailValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // check if email existence
  let isExistsEmail = await Auth.findOne({ email: req.body.email }).select(
    "email"
  );

  errors.email = "This email is not exists";
  if (!isExistsEmail) {
    res.status(400).json(errors);
    return;
  }

  const token = uuidv4();
  const info = sendEmail({
    subject: "Reset Password",
    token,
    title: "Reset Password",
    email: req.body.email,
  });

  // add to database
  if (info) {
    const newToken = await ResetPass.create({
      token,
      email: isExistsEmail.email,
    });

    res.status(200).json(newToken);
  } else {
    res.status(400).json("There's an error");
  }
});

//---------------------------------------------|
//           resetPass functionality
//---------------------------------------------|
exports.resetPass = asyncHandler(async (req, res) => {
  const { isValid, errors } = resetPassValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const token = await ResetPass.findOne({ token: req.params.token });

  if (token && req.params.email === token.email) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const updatedUser = await Auth.updateOne(
      { email: req.params.email },
      { $set: { password: hashedPassword } }
    );
    if (updatedUser) {
      res.status(200).json("done");
    }
  } else {
    errors.token = "expired token or wrong email";
    res.status(400).json(errors);
  }
});
