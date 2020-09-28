module.exports = () => {
	const digits = "0123456789";
	let otpCode = "";

	for (let i = 0; i < 4; i++) {
		otpCode += digits[Math.floor(Math.random() * 10)];
	}
	return otpCode;
};
