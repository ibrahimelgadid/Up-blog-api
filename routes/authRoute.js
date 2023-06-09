//---------------------------------------------|
//           All required modules
//---------------------------------------------|
const express = require("express");
const router = express.Router();

//---------------------------------------------|
//           Import controllers
//---------------------------------------------|
const {
  register,
  login,
  registerUsers,
} = require("../contollers/authController");

//---------------------------------------------|
//              Registration routes
//---------------------------------------------|

// @route /auth/register
// @access public
//@type post
router.route("/register").post(register);

// @route /auth/login
// @access public
//@type post
router.route("/login").post(login);

// @route /auth/users
// @access public
//@type post
router.route("/").get(registerUsers);

module.exports = router;
