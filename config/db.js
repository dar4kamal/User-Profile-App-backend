const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			// DeprecationWarning: current URL string parser is deprecated
			useNewUrlParser: true,
			//DeprecationWarning: current Server Discovery and Monitoring engine is deprecated
			useUnifiedTopology: true,
			// DeprecationWarning: collection.ensureIndex is deprecated.
			useCreateIndex: true,
			// DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
			useFindAndModify: false,
		});
		console.log("MongoDB Connected ...");
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
