const Report = require('../models/Report');

// @desc    Get all reports
// @route   GET /api/reports/all
// @access  Public
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's reports
// @route   GET /api/reports/user
// @access  Private
exports.getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single report
// @route   GET /api/reports/:id
// @access  Private
exports.getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    // Check if user owns the report or is admin
    if (report.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json({ report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create report
// @route   POST /api/reports
// @access  Private
exports.createReport = async (req, res) => {
  try {
    const report = await Report.create({
      ...req.body,
      userId: req.user.id
    });
    
    res.status(201).json({ report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};