import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaShieldAlt, FaClock, FaMobileAlt } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaChartLine className="text-4xl text-blue-600" />,
      title: '360° Credit Profile',
      description: 'Get a complete view of your credit health with detailed analysis'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-blue-600" />,
      title: 'Fraud Detection',
      description: 'Real-time alerts for suspicious activities on your credit profile'
    },
    {
      icon: <FaClock className="text-4xl text-blue-600" />,
      title: 'Real-time Insights',
      description: 'Instant updates on your credit score changes and factors affecting it'
    },
    {
      icon: <FaMobileAlt className="text-4xl text-blue-600" />,
      title: 'Mobile Friendly',
      description: 'Access your credit report anytime, anywhere from any device'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Know Your Credit Score
            </h1>
            <p className="text-xl mb-8">
              Get instant access to your credit score, detailed reports, and personalized
              recommendations to improve your financial health.
            </p>
            <Link
              to="/credit-score-check"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300"
            >
              Check Your Score Now
            </Link>
          </div>
        </div>
      </div>

      {/* Why Credit Score Matters */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Your Credit Score Matters
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your credit score affects your financial opportunities and can save you thousands
            of dollars over your lifetime.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-3">750+</div>
            <h3 className="text-xl font-semibold mb-2">Excellent Credit</h3>
            <p className="text-gray-600">Qualify for the best interest rates and loan terms</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-3">$100k+</div>
            <h3 className="text-xl font-semibold mb-2">Save on Interest</h3>
            <p className="text-gray-600">Better credit means lower interest payments</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-3">24/7</div>
            <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-gray-600">Stay informed about changes to your credit profile</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Comprehensive Credit Monitoring
            </h2>
            <p className="text-gray-600">
              Everything you need to understand and improve your credit health
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;