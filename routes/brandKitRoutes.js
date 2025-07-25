const express = require("express");
const router = express.Router();
const BrandKit = require("../models/BrandKit");

// ✅ Save brand kit
router.post("/", async (req, res) => {
  try {
    const brandKit = new BrandKit(req.body);
    const savedKit = await brandKit.save();
    res.status(201).json(savedKit);
  } catch (err) {
    res.status(500).json({ error: "Failed to save brand kit." });
  }
});

// ✅ Get brand kits by user ID
router.get("/:userId", async (req, res) => {
  try {
    const kits = await BrandKit.find({ userId: req.params.userId });
    res.json(kits);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch brand kits." });
  }
});

module.exports = router;
