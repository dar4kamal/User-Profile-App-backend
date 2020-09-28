module.exports = async (req, res) => {
	try {
		if (req.user) return res.json(req.user);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: "Server Error" });
	}
};
