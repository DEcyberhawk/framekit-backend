const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const brandKitRoutes = require("./routes/brandKitRoutes");
const notificationRoutes = require("./routes/notifications");
const userRoutes = require("./routes/users");

dotenv.config();

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
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
    credentials: true,
  })
);
app.use(express.json());

// ─────────────────────────────────────
// Routes
// ─────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/brandkits", brandKitRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);

// ✅ HTML response for root route to fix browser security warning
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>FrameKit Backend API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 40px;
            background-color: #f0f0f0;
          }
          h1 {
            color: #2c3e50;
          }
          p {
            color: #34495e;
          }
        </style>
      </head>
      <body>
        <h1>✅ FrameKit Backend API is Live</h1>
        <p>This server powers the secure backend for the FrameKit platform.</p>
      </body>
    </html>
  `);
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
