const { validationResult } = require("express-validator");
const User = require("../models/User");

module.exports = async (req, res) => {
	try {
		const { email } = req.user.userData;
		const { imageUrl } = req.body;

		// check for validation errors
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		// check if user's email exists
		let user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ errors: [{ msg: "User Not Found" }] });

		user.imageUrl = imageUrl ? imageUrl : user.imageUrl;

		await user.save();
		res.json(user.imageUrl);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: "Server Error" });
	}
};
