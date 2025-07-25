const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

router.get("/", (req, res) => {
  res.send("✅ Auth route is live and working");
});

router.post("/login", login); // ✅ THIS is the key line

module.exports = router;
