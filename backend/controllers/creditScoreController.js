const axios = require('axios');
const User = require('../models/User');
const Report = require('../models/Report');

// Calculate credit score based on inputs
const calculateScore = (data) => {
  const { age, income, loanAmount, repaymentHistory, existingDebts, creditUtilization } = data;
  
  let score = 600; // Base score
  
  // Age factor (18-25: -20, 26-35: 0, 36-50: +20, 51+: +10)
  if (age < 25) score -= 20;
  else if (age >= 36 && age <= 50) score += 20;
  else if (age > 50) score += 10;
  
  // Income factor
  if (income < 30000) score -= 30;
  else if (income >= 30000 && income < 60000) score += 0;
  else if (income >= 60000 && income < 100000) score += 20;
  else if (income >= 100000) score += 40;
  
  // Loan amount relative to income (debt-to-income ratio)
  const dti = (loanAmount / income) * 100;
  if (dti > 50) score -= 50;
  else if (dti > 35) score -= 25;
  else if (dti < 20) score += 20;
  
  // Repayment history
  switch(repaymentHistory) {
    case 'excellent':
      score += 80;
      break;
    case 'good':
      score += 40;
      break;
    case 'average':
      score += 0;
      break;
    case 'poor':
      score -= 60;
      break;
    default:
      score += 0;
  }
  
  // Existing debts
  if (existingDebts > 50000) score -= 40;
  else if (existingDebts > 20000) score -= 20;
  else if (existingDebts === 0) score += 30;
  
  // Credit utilization
  if (creditUtilization < 30) score += 30;
  else if (creditUtilization > 70) score -= 40;
  
  // Ensure score is within 300-900 range
  score = Math.max(300, Math.min(900, score));
  
  return Math.round(score);
};

// Get rating based on score
const getRating = (score) => {
  if (score >= 750) return { rating: 'Excellent', color: '#10b981', advice: 'Great work! Keep maintaining your credit habits.' };
  if (score >= 700) return { rating: 'Good', color: '#3b82f6', advice: 'Your credit is in good shape. Keep making payments on time.' };
  if (score >= 650) return { rating: 'Fair', color: '#f59e0b', advice: 'Consider reducing debt and making timely payments.' };
  return { rating: 'Poor', color: '#ef4444', advice: 'Focus on improving payment history and reducing debt.' };
};
const getRiskLevel = (score) => {
  if (score >= 750) return { level: 'Low Risk', color: '#10b981' };
  if (score >= 650) return { level: 'Medium Risk', color: '#f59e0b' };
  return { level: 'High Risk', color: '#ef4444' };
};

// @desc    Get credit score prediction
// @route   POST /api/credit-score/check
// @access  Private
exports.checkCreditScore = async (req, res) => {
  try {
    const { age, income, loanAmount, repaymentHistory, existingDebts, creditUtilization } = req.body;
    
    // Calculate score
    const score = calculateScore({
      age,
      income,
      loanAmount,
      repaymentHistory,
      existingDebts,
      creditUtilization
    });
    
    const rating = getRating(score);
    const risk = getRiskLevel(score);
    
    // Generate recommendations
    const recommendations = [];
    
    if (score < 650) {
      recommendations.push('Make all payments on time to build positive credit history');
      recommendations.push('Reduce your credit utilization below 30%');
      recommendations.push('Avoid opening multiple new credit accounts at once');
    } else if (score < 750) {
      recommendations.push('Continue making timely payments');
      recommendations.push('Consider diversifying your credit mix');
      recommendations.push('Monitor your credit report regularly');
    } else {
      recommendations.push('Maintain your excellent credit habits');
      recommendations.push('Consider applying for premium credit cards with better rewards');
    }
    
    if (creditUtilization > 70) {
      recommendations.push('High credit utilization detected. Pay down balances to improve score');
    }
    
    if (existingDebts > 50000) {
      recommendations.push('High debt levels. Create a debt repayment plan');
    }
    
    // Save to user's credit history if user is logged in
    if (req.user) {
      const user = await User.findById(req.user.id);
      if (user) {
        user.creditHistory.push({ score, date: new Date() });
        user.creditScore = score;
        await user.save();
        
        // Create report
        await Report.create({
          userId: user._id,
          title: `Credit Score Report - ${new Date().toLocaleDateString()}`,
          category: 'score-analysis',
          creditScore: score,
          creditData: req.body,
          recommendations,
          riskLevel: score < 650 ? 'High' : score < 750 ? 'Medium' : 'Low'
        });
      }
    }
    
    res.json({
  score,
  rating: rating.rating,
  color: rating.color,
  advice: rating.advice,

  riskLevel: risk.level,   // 
  riskColor: risk.color,   // 

  recommendations
});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's credit history
// @route   GET /api/credit-score/history
// @access  Private
exports.getCreditHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('creditHistory creditScore');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      currentScore: user.creditScore,
      history: user.creditHistory.sort((a, b) => a.date - b.date)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};