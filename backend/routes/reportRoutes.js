const express = require('express');
const router = express.Router();
const { getAllReports, getUserReports, getReport, createReport } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

router.get('/all', getAllReports);
router.get('/user', protect, getUserReports);
router.get('/:id', protect, getReport);
router.post('/', protect, createReport);

module.exports = router;