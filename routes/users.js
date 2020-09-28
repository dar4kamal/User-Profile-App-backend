const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const auth = require("../middlewares/auth");
// handlers
const registerUser = require("../routeHandlers/registerUser");
const loginUser = require("../routeHandlers/loginUser");
const getUserData = require("../routeHandlers/getUserData");
const editUser = require("../routeHandlers/editUser");

// @route POST api/users/register
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

// @route POST api/users/login
// @desc Login User
// @access Public
router.post(
	"/login",
	[
		check("email", "Please Enter a Valid Email Address").isEmail(),
		check("password", "Password is required").not().isEmpty(),
	],
	loginUser
);

// @route GET /api/users
// @desc get user data
// @access Public
router.get("/", auth, getUserData);

// @route PUT /api/users
// @desc edit user data
// @access Private
router.put("/", auth, editUser);

module.exports = router;
