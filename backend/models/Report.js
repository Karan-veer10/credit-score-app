const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['credit-report', 'score-analysis', 'risk-assessment', 'fraud-detection'],
    required: true
  },
  description: String,
  creditScore: Number,
  creditData: {
    income: Number,
    loanAmount: Number,
    repaymentHistory: String,
    existingDebts: Number,
    age: Number,
    creditUtilization: Number
  },
  recommendations: [String],
  riskLevel: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  reportUrl: String,
  downloadCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);