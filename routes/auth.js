const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const auth = require("../middlewares/auth");
const forgetPassword = require("../routeHandlers/forgetPassword");
const resetPassword = require("../routeHandlers/resetPassword");

// @route POST api/auth/forgetPass
// @desc send otp to user's email when password is forgotten
// @access private
router.post(
	"/forgetPass",
	[auth, check("email", "Email is Required").isEmail()],
	forgetPassword
);

// @route POST api/auth/resetPass
// @desc verify otp from user
// @access private
router.post(
	"/resetPass",
	[
		auth,
		check("otpCode", "OTP code must be 4 digits").isLength({ min: 4, max: 4 }),
	],
	resetPassword
);

module.exports = router;
