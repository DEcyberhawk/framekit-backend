const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const User = require("../models/User");

// GET all invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("userId", "name email");
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch invoices" });
  }
});

// POST new invoice
router.post("/", async (req, res) => {
  try {
    const { userId, amount, status } = req.body;
    const invoice = await Invoice.create({ userId, amount, status });
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ message: "Failed to create invoice" });
  }
});

module.exports = router;
