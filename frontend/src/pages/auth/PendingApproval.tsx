import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaEnvelope, FaSignOutAlt, FaUser, FaShieldAlt } from 'react-icons/fa';

const PendingApproval: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    const userType = localStorage.getItem('userType');
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    if (userType !== 'employee') {
      navigate('/login');
      return;
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleContactSupport = () => {
    // Open email client with support email
    window.open('mailto:support@rygneco.com?subject=Role Approval Inquiry', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
            <FaClock className="text-2xl text-yellow-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Role Approval Pending
          </h1>

          {/* Message */}
          <div className="text-gray-600 mb-8 space-y-4">
            <p className="text-lg">
              Hello <span className="font-semibold">{userData?.firstName || 'there'}</span>!
            </p>
            <p>
              Your role request is currently under review by our Super Administrator. 
              This process typically takes 1-2 business days.
            </p>
            
            {userData?.requestedRoles && (
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <p className="font-medium text-gray-900 mb-2">Requested Roles:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {userData.requestedRoles.map((role: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                      {role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* What happens next */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <FaShieldAlt className="mr-2" />
              What happens next?
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Our Super Administrator will review your role request</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>You'll receive an email notification once a decision is made</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Upon approval, you'll have access to your designated dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>If rejected, you'll receive feedback and can submit a new request</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={handleContactSupport}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <FaEnvelope className="mr-2" />
              Contact Support
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <FaSignOutAlt className="mr-2" />
              Sign Out
            </button>
          </div>

          {/* Additional info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need immediate assistance? Contact us at{' '}
              <a 
                href="mailto:support@rygneco.com" 
                className="text-green-600 hover:text-green-700 font-medium"
              >
                support@rygneco.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval; 