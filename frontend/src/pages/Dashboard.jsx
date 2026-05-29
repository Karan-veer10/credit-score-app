import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaChartLine, FaFileAlt, FaShieldAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [creditHistory, setCreditHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReports: 0,
    averageScore: 0,
    riskLevel: 'Medium'
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/credit-score/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCreditHistory(response.data.history || []);
      
      const scores = response.data.history?.map(h => h.score) || [];
      const avgScore = scores.length > 0 
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;
      
      setStats({
        totalReports: scores.length,
        averageScore: avgScore,
        riskLevel: response.data.currentScore >= 750 ? 'Low' : response.data.currentScore >= 650 ? 'Medium' : 'High'
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Here's your credit health overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaChartLine className="text-blue-600 text-xl" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{stats.averageScore || 'N/A'}</span>
            </div>
            <h3 className="text-gray-600">Average Credit Score</h3>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FaFileAlt className="text-green-600 text-xl" />
              </div>
              <span className="text-2xl font-bold text-green-600">{stats.totalReports}</span>
            </div>
            <h3 className="text-gray-600">Reports Generated</h3>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <FaShieldAlt className="text-yellow-600 text-xl" />
              </div>
              <span className="text-2xl font-bold text-yellow-600">{stats.riskLevel}</span>
            </div>
            <h3 className="text-gray-600">Risk Level</h3>
          </div>
        </div>

        {/* Credit Score History Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Credit Score History</h2>
          {creditHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={creditHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                <YAxis domain={[300, 900]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No credit score history available. Check your score to get started!</p>
          )}
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Personalized Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">✓ Pay on Time</h3>
              <p className="text-gray-600 text-sm">Set up automatic payments to never miss a due date</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">✓ Reduce Credit Utilization</h3>
              <p className="text-gray-600 text-sm">Keep your credit card balances below 30% of limits</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">✓ Monitor Credit Report</h3>
              <p className="text-gray-600 text-sm">Check your credit report regularly for errors</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">✓ Avoid Hard Inquiries</h3>
              <p className="text-gray-600 text-sm">Limit new credit applications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;