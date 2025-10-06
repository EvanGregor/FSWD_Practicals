const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const User = require("./userModel");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/cie3", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashed });
    await newUser.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    res.json({ msg: "Login successful", user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running at http://localhost:5000"));
