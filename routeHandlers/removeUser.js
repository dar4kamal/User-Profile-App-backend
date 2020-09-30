const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = async (req, res) => {
	try {
		const email = req.user;
		const { password } = req.body;

		// check if user's email exists
		let user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ errors: [{ msg: "User Not Found" }] });

		if (password) {
			// compare old password to password saved to db
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch)
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid Credentials" }] });
		}
		await User.deleteOne({ email });
		res.status(200).json({ msg: "user Deleted" });
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: "Server Error" });
	}
};
