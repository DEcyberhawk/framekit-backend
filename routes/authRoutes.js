// framekit-backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// TEMP in-memory token store (replace with DB in prod)
let resetTokens = {};

// ✅ Auth routes
router.post('/login', login);
router.post('/register', register);

// ✅ Protected route
router.get('/me', auth, (req, res) => {
  res.json({ message: 'Token valid', user: req.user });
});

// ✅ Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Email not found' });

  const token = crypto.randomBytes(32).toString('hex');
  resetTokens[token] = {
    userId: user._id,
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  };

  res.json({
    message: 'Reset link generated (for development)',
    token: token,
    link: `http://localhost:5173/reset-password/${token}`,
  });
});

// ✅ Reset Password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  const data = resetTokens[token];
  if (!data || data.expires < Date.now()) {
    return res.status(400).json({ message: 'Token expired or invalid' });
  }

  const user = await User.findById(data.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  delete resetTokens[token];

  res.json({ message: 'Password reset successful' });
});

module.exports = router;
