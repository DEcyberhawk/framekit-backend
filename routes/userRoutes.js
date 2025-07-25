const express = require("express");
const router = express.Router();

// GET all users (placeholder)
router.get("/", (req, res) => {
  res.json([{ name: "Max", email: "max@framekit.com" }]);
});

module.exports = router;
