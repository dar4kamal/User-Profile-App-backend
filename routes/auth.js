const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const auth = require("../middlewares/auth");
const forgetPassword = require("../routeHandlers/forgetPassword");

// @route POST api/auth/forgetPass
// @desc send otp to user's email when password is forgotten
// @access private
router.post(
	"/forgetPass",
	[auth, check("email", "Email is Required").isEmail()],
	forgetPassword
);

module.exports = router;
