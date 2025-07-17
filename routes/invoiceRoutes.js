const express = require("express");
const PDFDocument = require("pdfkit");
const User = require("../models/User"); // Optional: if you're using user DB
const router = express.Router();

// Dynamic invoice generator
router.get("/generate", async (req, res) => {
  const {
    name = "Max Collins Botchway",
    email = "maxcollinsbotchway88@gmail.com",
    plan = "FrameKit Pro",
    amount = "89.00",
    invoiceId = "INV-" + Math.floor(Math.random() * 100000),
  } = req.query;

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${invoiceId}.pdf`);
  doc.pipe(res);

  doc.fontSize(18).text("🧾 FrameKit Invoice", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text("Invoice ID: " + invoiceId);
  doc.text("Invoice Date: " + new Date().toLocaleDateString());
  doc.moveDown();
  doc.text(`Billed To:`);
  doc.text(name);
  doc.text(`Email: ${email}`);
  doc.moveDown();
  doc.text(`Description: ${plan}`);
  doc.text(`Amount: €${amount}`);
  doc.moveDown();
  doc.text("Thank you for your purchase!");

  doc.end();
});

module.exports = router;
