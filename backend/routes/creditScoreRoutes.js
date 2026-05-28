const express = require('express');
const router = express.Router();
const { checkCreditScore, getCreditHistory } = require('../controllers/creditScoreController');
const { protect } = require('../middleware/authMiddleware');

router.post('/check', protect, checkCreditScore);
router.get('/history', protect, getCreditHistory);

module.exports = router;