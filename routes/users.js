const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

// handlers
const registerUser = require("../routeHandlers/registerUser");

// @route POST api/users
// @desc Register new User
// @access Public
router.post(
	"/register",
	[
		check("name").not().isEmpty().withMessage("Name is Required"),
		check("name")
			.isString()
			.withMessage("Name must be Combination of letters and numbers"),
		check("email").isEmail(),
		check("password").not().isEmpty(),
		check("passwordConfirm").not().isEmpty(),
		check("gender").isString().not().isEmpty(),
	],
	registerUser
);

module.exports = router;
