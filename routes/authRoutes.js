const express = require("express");
const {
  register,
  login,
  profile,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Test Route
router.get("/", (req, res) => {
  res.send("✅ Auth route is live and working");
});

// 🔐 Auth Routes
router.post("/register", register);                     // Register new user
router.post("/login", login);                           // Login user
router.get("/profile", protect, profile);               // Protected: Get user profile
router.post("/forgot-password", forgotPassword);        // Request password reset
router.post("/reset-password/:token", resetPassword);   // Reset password with token

module.exports = router;
