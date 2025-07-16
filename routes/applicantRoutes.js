const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getApplicants,
  addApplicant,
  deleteApplicant
} = require('../controllers/applicantController');

router.get('/', auth, getApplicants);
router.post('/', auth, addApplicant);
router.delete('/:id', auth, deleteApplicant);

module.exports = router;
