import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaEnvelope, FaSignOutAlt, FaRedo } from 'react-icons/fa';

const RoleRejected: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isResubmitting, setIsResubmitting] = useState(false);
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
    window.open('mailto:support@rygneco.com?subject=Role Rejection Appeal&body=I would like to discuss my rejected role request.', '_blank');
  };

  const handleResubmitRequest = async () => {
    setIsResubmitting(true);
    try {
      // Navigate to complete profile to make a new request
      navigate('/complete-profile');
    } catch (error) {
      console.error('Error during resubmission:', error);
    } finally {
      setIsResubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <FaExclamationTriangle className="text-2xl text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Role Request Rejected
          </h1>

          {/* Message */}
          <div className="text-gray-600 mb-8 space-y-4">
            <p className="text-lg">
              Hello <span className="font-semibold">{userData?.firstName || 'there'}</span>,
            </p>
            <p>
              Unfortunately, your role request has been rejected by our Super Administrator.
            </p>
            
            {userData?.rejectionReason && (
              <div className="bg-red-50 rounded-lg p-4 mt-4">
                <p className="font-medium text-red-900 mb-2">Reason for rejection:</p>
                <p className="text-red-800 text-sm">{userData.rejectionReason}</p>
              </div>
            )}
          </div>

          {/* Action options */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <FaRedo className="mr-2" />
              What can you do next?
            </h3>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Review the rejection reason and address any concerns</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Contact our support team for clarification</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span>Submit a new role request with additional information</span>
              </li>
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleResubmitRequest}
              disabled={isResubmitting}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaRedo className={isResubmitting ? 'animate-spin' : ''} />
              {isResubmitting ? 'Processing...' : 'Submit New Request'}
            </button>
            
            <button
              onClick={handleContactSupport}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaEnvelope />
              Contact Support
            </button>
          </div>

          {/* Logout option */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 mx-auto"
            >
              <FaSignOutAlt />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleRejected;
