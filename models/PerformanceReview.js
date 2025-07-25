const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema({
  employee: { type: String, required: true },
  rating: { type: String, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PerformanceReview', performanceReviewSchema);
