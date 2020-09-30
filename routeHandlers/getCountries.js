const User = require("../models/User");

module.exports = async (req, res) => {
	try {
		let users = await User.find({});
		const countries = users.map((user) => {
			return user.address.country;
		});
		res.json({ countries });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
};
