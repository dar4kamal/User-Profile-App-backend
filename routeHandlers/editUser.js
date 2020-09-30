const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

module.exports = async (req, res) => {
	try {
		const { email } = req.user.userData;
		const { newName, newEmail, newAddress, newGender } = req.body;

		// check if user's email exists
		let user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ errors: [{ msg: "User Not Found" }] });

		user.name = newName ? newName : user.name;
		user.email = newEmail ? newEmail : user.email;
		user.address = newAddress ? newAddress : user.address;
		user.gender = newGender ? newGender : user.gender;

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
		let authToken;
		jwt.sign(
			payload,
			config.get("jwtToken"),
			{ expiresIn: 360000 },
			(err, token) => {
				if (err) throw err;
				res.status(200).json({ msg: "profile updated Successfully", token });
			}
		);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: "Server Error" });
	}
};
