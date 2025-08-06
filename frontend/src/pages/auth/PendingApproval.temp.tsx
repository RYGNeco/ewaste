import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      
      const response = await axios.get(`${API_BASE_URL}/users/approval-status`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setApprovalStatus(response.data);
      
      // If approved and can access dashboard, redirect to dashboard
      if (response.data.accountStatus === 'approved' && response.data.canAccessDashboard) {
        navigate('/dashboard');
      }
      
      // Fetch user data as well
      const userResponse = await axios.get(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setUserData(userResponse.data);
    } catch (err: any) {
      console.error('Error fetching approval status:', err);
      setError(err.response?.data?.message || 'An error occurred while checking your approval status');
      
      // If token is invalid, redirect to login
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
      setIsCheckingAccount(false);
    }
  };

  useEffect(() => {
    fetchApprovalStatus();
    
    // Poll every 60 seconds for updates
    const intervalId = setInterval(fetchApprovalStatus, 60000);
    
    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <FaSync className="animate-spin text-green-500 text-4xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Checking Account Status</h2>
            <p className="mt-2 text-gray-600">
              Please wait while we check your account approval status...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <div className="bg-red-100 p-4 rounded-lg mb-4">
              <h2 className="text-2xl font-semibold text-red-800">Error</h2>
              <p className="mt-2 text-red-600">{error}</p>
            </div>
            <button
              onClick={handleBackToLogin}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaArrowLeft className="mr-2" /> Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <FaClock className="text-yellow-500 text-5xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Account Pending Approval</h1>
        </div>

        {userData && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
              <FaUser className="mr-2" /> Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{userData.firstName} {userData.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium capitalize">{userData.role || 'User'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium flex items-center">
                  <FaEnvelope className="mr-2 text-gray-400" />
                  {userData.email}
                </p>
              </div>
              {userData.phone && (
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium flex items-center">
                    <FaPhone className="mr-2 text-gray-400" />
                    {userData.phone}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaShieldAlt className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800">
                Your account is pending approval
              </h3>
              <div className="mt-2 text-yellow-700">
                <p>
                  Thank you for registering with our e-waste management platform. Your account
                  is currently under review by our administrators.
                </p>
                <p className="mt-2">
                  You will receive an email notification once your account has been approved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {approvalStatus && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Status Details</h2>
            <div className="bg-gray-50 p-4 rounded-md space-y-3">
              <div>
                <span className="text-sm text-gray-500">Request Date:</span>
                <span className="ml-2 font-medium">
                  {formatDate(approvalStatus.requestDate)}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <span className="ml-2 font-medium">
                  {approvalStatus.status}
                </span>
              </div>
              {approvalStatus.rejectionReason && (
                <div>
                  <span className="text-sm text-gray-500">Reason:</span>
                  <span className="ml-2 font-medium text-red-600">
                    {approvalStatus.rejectionReason}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-3">
          <button
            onClick={fetchApprovalStatus}
            disabled={isCheckingAccount}
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isCheckingAccount ? (
              <>
                <FaSync className="animate-spin mr-2" />
                Checking...
              </>
            ) : (
              <>
                <FaSync className="mr-2" />
                Check Again
              </>
            )}
          </button>
          
          <button
            onClick={handleLogout}
            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
