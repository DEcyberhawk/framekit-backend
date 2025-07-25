// ✅ routes/leaveRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/leaveController');

router.get('/', controller.getLeaves);
router.post('/', controller.addLeave);
router.put('/:id', controller.updateLeave);

module.exports = router;