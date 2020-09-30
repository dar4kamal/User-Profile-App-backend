const User = require("../models/User");

module.exports = async (req, res) => {
	try {
		let users = await User.find({});
		const cities = users.map((user) => {
			return user.address.city;
		});
		res.json({ cities });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
};
