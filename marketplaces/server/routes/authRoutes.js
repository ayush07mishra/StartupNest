const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

const JWT_SECRET = "super_secret_key_12345"; // You can make this anything long and random

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashed });
    res.json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid email" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
});

module.exports = router;
