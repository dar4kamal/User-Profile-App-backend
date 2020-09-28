const mongoose = require("mongoose");

const otpData = new mongoose.Schema({
	otpCode: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	otpData,
});

module.exports = User = new mongoose.model("user", UserSchema);
