import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      features: ['Monthly credit score check', 'Basic credit report', 'Email support']
    },
    {
      name: 'Pro',
      price: '$9.99',
      features: ['Weekly credit updates', 'Detailed credit report', 'Priority support', 'Fraud alerts']
    },
    {
      name: 'Premium',
      price: '$19.99',
      features: ['Daily monitoring', 'Comprehensive analysis', '24/7 phone support', 'Identity theft insurance']
    }
  ];

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h1>
          <p className="text-gray-600">Select the perfect plan for your credit monitoring needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">{plan.price}</div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <FaCheck className="text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup" className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;