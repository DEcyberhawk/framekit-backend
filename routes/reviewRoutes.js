const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getReviews,
  addReview,
  deleteReview
} = require('../controllers/reviewController');

router.get('/', auth, getReviews);
router.post('/', auth, addReview);
router.delete('/:id', auth, deleteReview);

module.exports = router;
