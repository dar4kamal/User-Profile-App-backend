const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const User = require("../models/User");

module.exports = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		const { name, email, password, passwordConfirm, gender } = req.body;

		// check if user exists
		let user = await User.findOne({ email });
		if (user)
			return res.status(400).json({ errors: [{ msg: "User Already Exists" }] });

		// check password confirm
		if (password !== passwordConfirm)
			return res
				.status(400)
				.json({ errors: [{ msg: "Passwords don't match" }] });

		user = new User({
			name,
			email,
			password,
			gender,
		});

		// encrypt password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		// return JWT
		const payload = {
			userData: _.pick(user, [
				"_id",
				"name",
				"email",
				"gender",
				"address",
				"imageUrl",
				"optData",
			]),
		};
		jwt.sign(
			payload,
			config.get("jwtToken"),
			{ expiresIn: 360000 },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		console.log(err);
		console.error(err.message);
		return res.status(500).send("Server Error");
	}
};
