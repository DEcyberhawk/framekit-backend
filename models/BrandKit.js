// === BACKEND: models/BrandKit.js ===
const mongoose = require("mongoose");

const BrandKitSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: String,
  colors: [String],
  fonts: [String],
  logoUrl: String,
  bioText: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BrandKit", BrandKitSchema);