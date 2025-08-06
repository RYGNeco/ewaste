import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaEnvelope, FaPhone, FaArrowLeft, FaSync } from 'react-icons/fa';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface RejectionData {
  rejectionReason?: string;
  rejectedAt: string;
  canReapply: boolean;
  contactInfo?: {
    email: string;
    phone: string;
  };
}

const AccountRejected: React.FC = () => {
  const [rejectionData, setRejectionData] = useState<RejectionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchRejectionData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/auth/approval-status`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const status = response.data.data;
      
      if (status.accountStatus !== 'rejected') {
        // If not rejected, redirect to appropriate page
        if (status.accountStatus === 'pending') {
          navigate('/auth/pending-approval');
        } else if (status.canAccessDashboard) {
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
        return;
      }

      setRejectionData({
        rejectionReason: status.rejectionReason || 'No specific reason provided',
        rejectedAt: status.rejectedAt || new Date().toISOString(),
        canReapply: true,
        contactInfo: {
          email: 'support@rygneco.com',
          phone: '+1 (555) 123-4567'
        }
      });

    } catch (error: any) {
      console.error('Failed to fetch rejection data:', error);
      setError('Failed to load rejection information');
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRejectionData();
  }, []);

  const handleBackToLogin = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleReapply = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('userType');
    navigate('/auth/new-login');
  };

  const handleContactSupport = () => {
    window.open('mailto:support@rygneco.com?subject=Account Rejection Appeal&body=I would like to discuss my rejected account application and understand how to proceed.', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleBackToLogin}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-2xl">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white text-center">
          <FaTimes className="text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Account Application Rejected</h1>
          <p className="text-red-100">Your account request has been reviewed and declined</p>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            {rejectionData?.rejectionReason && (
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  📋 Reason for Rejection
                </h3>
                <p className="text-red-700 bg-white p-4 rounded border border-red-200">
                  {rejectionData.rejectionReason}
                </p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Application Details</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Rejection Date:</span>
                  <p className="text-gray-800">
                    {rejectionData && new Date(rejectionData.rejectedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Status:</span>
                  <p className="text-red-600 font-semibold">Rejected</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Can Reapply:</span>
                  <p className="text-gray-800">
                    {rejectionData?.canReapply ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Next Steps:</span>
                  <p className="text-blue-600 font-semibold">Contact Support</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                🔄 What you can do next
              </h3>
              <ul className="text-blue-700 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Contact our support team to understand the rejection reasons in detail</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Address any issues mentioned in the rejection reason</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Submit a new application with updated information if eligible</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Request an appeal review if you believe there was an error</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                💡 Tips for Reapplication
              </h3>
              <ul className="text-yellow-700 space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Ensure all required information is complete and accurate</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Provide additional documentation if requested</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Use a professional email address and contact information</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Wait at least 24 hours before submitting a new application</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📞 Get Support</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <FaEnvelope className="text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Email Support</p>
                    <p className="text-gray-600 text-sm">{rejectionData?.contactInfo?.email || 'support@rygneco.com'}</p>
                    <p className="text-gray-500 text-xs">Response within 4-6 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaPhone className="text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Phone Support</p>
                    <p className="text-gray-600 text-sm">{rejectionData?.contactInfo?.phone || '+1 (555) 123-4567'}</p>
                    <p className="text-gray-500 text-xs">Mon-Fri, 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleContactSupport}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <FaEnvelope />
                <span>Contact Support</span>
              </button>
              
              {rejectionData?.canReapply && (
                <button
                  onClick={handleReapply}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <FaSync />
                  <span>Apply Again</span>
                </button>
              )}
              
              <button
                onClick={handleBackToLogin}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <FaArrowLeft />
                <span>Back to Login</span>
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                We appreciate your interest in our platform and encourage you to reach out for clarification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountRejected;
