import React, { useState } from 'react';
import { FaFileAlt, FaSearch } from 'react-icons/fa';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const sampleReports = [
    { id: 1, title: 'Credit Score Report', category: 'credit-report', description: 'Detailed credit score analysis' },
    { id: 2, title: 'Risk Assessment', category: 'risk-assessment', description: 'Comprehensive risk evaluation' },
    { id: 3, title: 'Fraud Detection', category: 'fraud-detection', description: 'Identity theft protection scan' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Credit Reports</h1>
          <p className="text-gray-600">Access detailed credit reports and analysis</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleReports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaFileAlt className="text-blue-600 text-xl mr-2" />
                <h3 className="font-semibold text-lg">{report.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{report.description}</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                View Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;