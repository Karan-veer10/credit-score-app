const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Report = require('../models/Report');

dotenv.config();

const sampleReports = [
  {
    title: 'Comprehensive Credit Report',
    category: 'credit-report',
    description: 'Detailed analysis of your credit history and current standing',
    creditScore: 725,
    riskLevel: 'Medium'
  },
  {
    title: 'Risk Analysis Report',
    category: 'risk-assessment',
    description: 'In-depth risk assessment based on your financial behavior',
    creditScore: 680,
    riskLevel: 'High'
  },
  {
    title: 'Fraud Detection Scan',
    category: 'fraud-detection',
    description: 'Comprehensive scan for potential fraud and identity theft',
    riskLevel: 'Low'
  },
  {
    title: 'Score Improvement Analysis',
    category: 'score-analysis',
    description: 'Detailed breakdown of factors affecting your credit score',
    creditScore: 710,
    riskLevel: 'Medium'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Report.deleteMany();
    await Report.insertMany(sampleReports);
    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();