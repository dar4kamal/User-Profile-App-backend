const express = require("express");

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// MiddleWares
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
	res.send("user profile App backend");
});

// routes
const users = require("./routes/users");

app.use("/api/users", users);

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
