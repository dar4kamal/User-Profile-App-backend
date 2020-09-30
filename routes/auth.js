const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const user = require("../middlewares/user");
const forgetPassword = require("../routeHandlers/forgetPassword");
const resetPassword = require("../routeHandlers/resetPassword");
const editPassword = require("../routeHandlers/editPassword");
const removeUser = require("../routeHandlers/removeUser");

// @route POST api/auth/forgetPass
// @desc send otp to user's email when password is forgotten
// @access private
router.post(
	"/forgetPass",
	check("email", "Email is Required").isEmail(),
	forgetPassword
);

// @route POST api/auth/resetPass
// @desc verify otp from user
// @access private
router.post(
	"/resetPass",
	[
		user,
		check("otpCode", "OTP code must be 4 digits").isLength({ min: 4, max: 4 }),
	],
	resetPassword
);

// @route POST api/auth/editPass
// @desc change password either when password is forgottn or when editing password
// @access private
router.post(
	"/editPass",
	[
		user,
		check("password", "password is required").not().isEmpty(),
		check("passwordConfirm", "password confirm is required").not().isEmpty(),
	],
	editPassword
);

// @route POST api/auth/remove
// @desc remove user
// @access private
router.post("/remove", user, removeUser);

module.exports = router;
