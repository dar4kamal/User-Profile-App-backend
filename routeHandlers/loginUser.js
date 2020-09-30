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

		const { email, password } = req.body;
		// check if user exists
		let user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

		// Decrypt password
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch)
			return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
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
		console.error(err.message);
		return res.status(500).send("Server Error");
	}
};
