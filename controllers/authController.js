const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: "User already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(201).json({ token, user: { name: user.name, email: user.email } });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({ token, user: { name: user.name, email: user.email } });
};

// Profile (Protected)
const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);
};

// Forgot Password (Placeholder)
const forgotPassword = (req, res) => {
  res.status(200).json({ message: "Forgot password route" });
};

// Reset Password (Placeholder)
const resetPassword = (req, res) => {
  res.status(200).json({ message: "Reset password route" });
};

module.exports = {
  register,
  login,
  profile,
  forgotPassword,
  resetPassword,
};
