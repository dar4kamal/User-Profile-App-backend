const nodemailer = require("nodemailer");
const config = require("config");

const User = require("../models/User");

const generateOTP = require("../utils/generateOTP");

module.exports = async (req, res) => {
	try {
		const { email } = req.body;

		// check if user's email exists
		let user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ errors: [{ msg: "User Not Found" }] });

		// generate random otp
		const otpCode = generateOTP();

		// send otp code to user's email
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: config.get("mailAccount"),
				pass: config.get("mailPassword"),
			},
		});

		const mailOptions = {
			from: config.get("mailAccount"),
			to: email,
			subject: "Forget password",
			text: `Here is an OTP to verify email ${otpCode}`,
		};

		const { response, error } = await transporter.sendMail(mailOptions);
		if (!error) {
			console.log("Email sent: " + response);
			// example of response
			// 250 2.0.0 OK  1601324024 i6sm2994001wra.1 - gsmtp
			const sentDate = Date(response.split(" ")[4]);

			// save otp to user's data
			user.otpData = { otpCode, date: sentDate };
			await user.save();

			res.status(200).json({ msg: "Email sent successfully", data: { email } });
		} else {
			console.error(error);
			return res.status(500).json({ msg: "Email Service Error" });
		}
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: "Server Error" });
	}
};
