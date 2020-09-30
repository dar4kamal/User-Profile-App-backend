const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = async (req, res) => {
	try {
		const { oldPassword, newPassword, passwordConfirm } = req.body;
		const { email } = req.user;

		// check if user's email exists
		let user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ errors: [{ msg: "User Not Found" }] });

		if (oldPassword) {
			// compare old password to password saved to db
			const isMatch = await bcrypt.compare(oldPassword, user.password);

			if (!isMatch)
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid Credentials" }] });
		}

		// check password confirm
		if (newPassword !== passwordConfirm)
			return res
				.status(400)
				.json({ errors: [{ msg: "Passwords don't match" }] });

		// encrypt password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(newPassword, salt);

		await user.save();
		res.status(200).json({ msg: "password have been changed succssfully" });
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: "Server Error" });
	}
};
