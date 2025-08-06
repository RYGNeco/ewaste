import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { FaClock, FaEnvelope, FaPhone, FaSync, FaArrowLeft, FaSignOutAlt, FaUser, FaShieldAlt } from 'react-icons/fa';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApprovalStatus {
  accountStatus: 'pending' | 'approved' | 'rejected';
  status: string;
  roleApprovalStatus?: string;
  rejectionReason?: string;
  approvedAt?: string;
  requestDate: string;
  canAccessDashboard: boolean;
}

const PendingApproval: React.FC = () => {
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCheckingAccount, setIsCheckingAccount] = useState(false);
  const navigate = useNavigate();

  const fetchApprovalStatus = async () => {
    try {
      setIsCheckingAccount(true);
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
      setApprovalStatus(status);

      // If approved, redirect to dashboard
      if (status.canAccessDashboard) {
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }

      // If rejected, redirect to rejection page
      if (status.accountStatus === 'rejected') {
        navigate('/auth/rejected');
      }

    } catch (error: any) {
      console.error('Failed to fetch approval status:', error);
      setError('Failed to check approval status');
      
      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userData');
        localStorage.removeItem('userType');
        navigate('/login');
      }
    } finally {
      setIsCheckingAccount(false);
    }
  };

=======
import { FaClock, FaEnvelope, FaSignOutAlt, FaUser, FaShieldAlt } from 'react-icons/fa';

const PendingApproval: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    const userType = localStorage.getItem('userType');
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
<<<<<<< HEAD

    // Check if this is an employee role request scenario
    if (userType === 'employee' && !localStorage.getItem('token')) {
      // This is the old role approval flow
      setIsLoading(false);
      return;
    }

    // This is the new account approval flow
    fetchApprovalStatus();
    
    // Poll for status updates every 30 seconds
    const interval = setInterval(fetchApprovalStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchApprovalStatus();
  };

  const handleBackToLogin = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('userType');
    navigate('/login');
  };
=======
    
    if (userType !== 'employee') {
      navigate('/login');
      return;
    }
    
    setIsLoading(false);
  }, [navigate]);
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
<<<<<<< HEAD
    localStorage.removeItem('user');
=======
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
    navigate('/login');
  };

  const handleContactSupport = () => {
    // Open email client with support email
<<<<<<< HEAD
    window.open('mailto:support@rygneco.com?subject=Account Approval Inquiry', '_blank');
  };

  // Account approval loading state
  if (isLoading && approvalStatus === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking approval status...</p>
=======
    window.open('mailto:support@rygneco.com?subject=Role Approval Inquiry', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  // Account approval error state
  if (error && approvalStatus === null) {
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

  // Account approved - redirecting
  if (approvalStatus?.canAccessDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-green-500 text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Approved!</h2>
          <p className="text-gray-600 mb-6">
            Great news! Your account has been approved. Redirecting you to the dashboard...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Account approval pending state
  if (approvalStatus && approvalStatus.accountStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-2xl">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white text-center">
            <FaClock className="text-6xl mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Account Pending Approval</h1>
            <p className="text-yellow-100">Your request is being reviewed by our administrators</p>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  📋 What happens next?
                </h3>
                <ul className="text-yellow-700 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Our super administrators have been notified of your account request</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>They will review your information and requested access level</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>You'll receive an email notification once a decision is made</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Approved accounts get immediate access to the platform</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Request Details</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Request Date:</span>
                    <p className="text-gray-800">
                      {new Date(approvalStatus.requestDate).toLocaleDateString('en-US', {
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
                    <p className="text-gray-800 capitalize">{approvalStatus.accountStatus}</p>
                  </div>
                  {approvalStatus.roleApprovalStatus && (
                    <div>
                      <span className="font-medium text-gray-600">Role Status:</span>
                      <p className="text-gray-800 capitalize">{approvalStatus.roleApprovalStatus}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-600">Account Type:</span>
                    <p className="text-gray-800 capitalize">{approvalStatus.status}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  ⏱️ Typical Review Timeline
                </h3>
                <p className="text-blue-700 mb-3">
                  Most account requests are reviewed within <strong>24-48 hours</strong> during business days.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-600">
                  <div>
                    <strong>Business Hours:</strong>
                    <br />Monday - Friday, 9 AM - 6 PM
                  </div>
                  <div>
                    <strong>Urgent Requests:</strong>
                    <br />Contact support for priority review
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📞 Need Help?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <FaEnvelope className="text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-800">Email Support</p>
                      <p className="text-gray-600 text-sm">support@rygneco.com</p>
                      <p className="text-gray-500 text-xs">Response within 4-6 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FaPhone className="text-green-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-800">Phone Support</p>
                      <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                      <p className="text-gray-500 text-xs">Mon-Fri, 9 AM - 6 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRefresh}
                  disabled={isCheckingAccount}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSync className={isCheckingAccount ? 'animate-spin' : ''} />
                  <span>Refresh Status</span>
                </button>
                
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
                  This page automatically refreshes every 30 seconds to check for updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Legacy role approval flow (for existing employee users)
  if (userData && !approvalStatus) {
    setIsLoading(false);
    
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
  }

  // Default loading state
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
=======
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
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
      </div>
    </div>
  );
};

export default PendingApproval; 