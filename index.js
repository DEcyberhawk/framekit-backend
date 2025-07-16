const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON request bodies

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("✅ FrameKit Backend API is Live");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
