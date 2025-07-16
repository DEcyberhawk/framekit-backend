const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  employee: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
