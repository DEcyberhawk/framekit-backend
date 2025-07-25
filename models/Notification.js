const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    type: { type: String, default: "info" }, // e.g., "info", "warning"
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
