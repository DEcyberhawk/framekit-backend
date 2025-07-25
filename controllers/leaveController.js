// ✅ controllers/leaveController.js
const LeaveRequest = require('../models/LeaveRequest');

exports.getLeaves = async (req, res) => {
  const leaves = await LeaveRequest.find().sort({ createdAt: -1 });
  res.json(leaves);
};

exports.addLeave = async (req, res) => {
  const { employee, type } = req.body;
  const leave = new LeaveRequest({ employee, type });
  await leave.save();
  res.status(201).json(leave);
};

exports.updateLeave = async (req, res) => {
  const { status } = req.body;
  const updated = await LeaveRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updated);
};