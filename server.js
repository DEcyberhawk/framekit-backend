const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const brandKitRoutes = require("./routes/brandKitRoutes");
const notificationRoutes = require("./routes/notifications"); // ✅ NEW
const userRoutes = require("./routes/users"); // ✅ if you created the users CRUD router we wrote

dotenv.config();

// Debug log to verify MONGO_URI is loaded
console.log("✅ Loaded MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

const app = express();

// ─────────────────────────────────────
// Middleware
// ─────────────────────────────────────
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*", // e.g. "http://localhost:5173,https://framekit-app.netlify.app"
    credentials: true,
  })
);
app.use(express.json());

// ─────────────────────────────────────
// Routes
// ─────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/brandkits", brandKitRoutes);
app.use("/api/notifications", notificationRoutes); // ✅ NEW
app.use("/api/users", userRoutes); // ✅ if present

// Health / test routes
app.get("/", (req, res) => {
  res.send("✅ FrameKit Backend API is Live");
});
app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: Date.now() });
});

// ─────────────────────────────────────
// 404 handler
// ─────────────────────────────────────
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ─────────────────────────────────────
// Error handler
// ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

// ─────────────────────────────────────
// MongoDB connection and server startup
// ─────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
