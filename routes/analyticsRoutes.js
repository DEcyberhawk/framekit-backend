const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const revenue = 9820;
    const sessions = 1460;
    const bounceRate = "42%";
    res.json({ users, revenue, sessions, bounceRate });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router;