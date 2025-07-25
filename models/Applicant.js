const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: 'New Application' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Applicant', applicantSchema);
