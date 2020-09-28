const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
	// get token
	const token = req.header("x-auth-token");
	// check if token is valid
	if (!token)
		return res.status(401).json({ msg: "no Token, Authoriation failed" });
	// verify token
	try {
		const decoded = jwt.verify(token, config.get("jwtToken"));
		req.user = decoded;
		next();
	} catch (err) {
		console.error(err.message);
		return res.status(401).json({ msg: "Token is not valid" });
	}
};
