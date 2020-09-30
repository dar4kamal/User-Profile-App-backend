const mongoose = require("mongoose");

// const otpData = new mongoose.Schema({
// 	otpCode: {
// 		type: String,
// 	},
// 	date: {
// 		type: Date,
// 		default: Date.now(),
// 	},
// });

// const address = new mongoose.Schema({
// 	country: {
// 		type: String,
// 		default: "",
// 	},
// 	city: {
// 		type: String,
// 		default: "",
// 	},
// });

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
	otpData: {
		otpCode: {
			type: String,
		},
		date: {
			type: Date,
			default: Date.now(),
		},
	},
	address: {
		country: {
			type: String,
			default: "",
		},
		city: {
			type: String,
			default: "",
		},
	},
	imageUrl: {
		type: String,
		default:
			"https://res.cloudinary.com/dar4kamal/image/upload/v1601398993/Paul-18-512_vvclwb.png",
	},
});

module.exports = User = new mongoose.model("user", UserSchema);
