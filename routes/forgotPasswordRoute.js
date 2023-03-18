//---------------------------------------------|
//           All required modules
//---------------------------------------------|
const express = require("express");
const router = express.Router();

//---------------------------------------------|
//           Import controllers
//---------------------------------------------|
const {
  resetMail,
  resetPass,
} = require("../contollers/forgotPasswordController");

//---------------------------------------------|
//              Registration routes
//---------------------------------------------|

// @route /pass/resetMail
// @access public
//@type post
router.route("/resetMail").post(resetMail);

// @route /pass/resetPass
// @access public
//@type post
router.route("/resetPass/:email/:token").post(resetPass);

module.exports = router;
