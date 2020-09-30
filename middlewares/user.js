module.exports = function (req, res, next) {
	// get user Data
	req.user = req.header("x-user-data");
	next();
};
