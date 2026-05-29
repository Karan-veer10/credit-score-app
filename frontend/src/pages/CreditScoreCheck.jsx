import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaChartLine, FaCheckCircle } from 'react-icons/fa';

const CreditScoreCheck = () => {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    loanAmount: '',
    repaymentHistory: 'good',
    existingDebts: '',
    creditUtilization: ''
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/credit-score/check', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(response.data);
      toast.success('Credit score calculated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to calculate score');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 700) return 'text-blue-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score) => {
    if (score >= 750) return 'bg-green-600';
    if (score >= 700) return 'bg-blue-600';
    if (score >= 650) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Check Your Credit Score
            </h1>
            <p className="text-gray-600 text-lg">
              Enter your financial details to get an instant credit score prediction
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your age"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Annual Income (₹)</label>
                  <input
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your annual income"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Loan Amount (₹)</label>
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter loan amount"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Repayment History</label>
                  <select
                    name="repaymentHistory"
                    value={formData.repaymentHistory}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="excellent">Excellent - No late payments</option>
                    <option value="good">Good - 1-2 late payments</option>
                    <option value="average">Average - 3-5 late payments</option>
                    <option value="poor">Poor - 6+ late payments</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Existing Debts (₹)</label>
                  <input
                    type="number"
                    name="existingDebts"
                    value={formData.existingDebts}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter total existing debts"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Credit Utilization (%)</label>
                  <input
                    type="number"
                    name="creditUtilization"
                    value={formData.creditUtilization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter credit utilization percentage"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                >
                  {loading ? 'Calculating...' : 'Check Score'}
                </button>
              </form>
            </div>

            {/* Results */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              {result ? (
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-4">Your Credit Score</h2>
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.score)}`}>
                      {result.score}
                    </div>
                    <div className="text-xl font-semibold text-gray-700 mb-4">
                      Rating: {result.rating}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div
                        className={`${getProgressColor(result.score)} h-4 rounded-full transition-all duration-500`}
                        style={{ width: `${((result.score - 300) / 600) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-600">{result.advice}</p>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-bold text-lg mb-4">Recommendations to Improve:</h3>
                    <div className="space-y-3">
                      {result.recommendations?.map((rec, index) => (
                        <div key={index} className="flex items-start">
                          <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaChartLine className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Fill out the form to see your credit score prediction
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditScoreCheck;