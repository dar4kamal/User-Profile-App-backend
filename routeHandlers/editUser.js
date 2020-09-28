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

		res.status(200).json({ msg: "profile updated Successfully" });
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: "Server Error" });
	}
};
