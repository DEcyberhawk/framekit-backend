
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Invoice = require("../models/Invoice");
const Project = require("../models/Project");
const SupportTicket = require("../models/SupportTicket");

router.get("/", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    const roles = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);

    const invoices = await Invoice.find();
    const revenue = invoices.reduce((acc, cur) => acc + (cur.amount || 0), 0);

    const projects = await Project.countDocuments({ status: "active" });
    const support = await SupportTicket.countDocuments({ status: "open" });

    const monthlyGrowth = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const monthlyRevenue = await Invoice.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      users,
      revenue,
      projects,
      support,
      monthlyGrowth: monthlyGrowth.map(d => ({ month: "M" + d._id, users: d.users })),
      monthlyRevenue: monthlyRevenue.map(d => ({ month: "M" + d._id, revenue: d.revenue })),
      roles,
      recentUsers
    });
  } catch (err) {
    console.error("Analytics error:", err.message);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

module.exports = router;
