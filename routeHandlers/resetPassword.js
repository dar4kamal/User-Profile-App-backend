const User = require("../models/User");

module.exports = async (req, res) => {
	try {
		const { otpCode } = req.body;
		const {
			userData: { email },
		} = req.user;

		// check if user's email exists
		let user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ errors: [{ msg: "User Not Found" }] });

		if (otpCode !== user.otpData.otpCode)
			return res.status(400).json({ errors: [{ msg: "Invalid OTP" }] });

		res.status(200).json({ msg: "OTP verified" });
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: "Server Error" });
	}
};
