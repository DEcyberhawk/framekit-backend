// ✅ controllers/reviewController.js
const PerformanceReview = require('../models/PerformanceReview');

exports.getReviews = async (req, res) => {
  const reviews = await PerformanceReview.find().sort({ createdAt: -1 });
  res.json(reviews);
};

exports.addReview = async (req, res) => {
  const { employee, rating, notes } = req.body;
  const review = new PerformanceReview({ employee, rating, notes });
  await review.save();
  res.status(201).json(review);
};

exports.deleteReview = async (req, res) => {
  await PerformanceReview.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
