import React, { useState, useEffect } from 'react';
import { FaUserCheck, FaUserTimes, FaUsers, FaClock, FaEye, FaEnvelope, FaCalendar, FaFilter, FaSearch, FaSync } from 'react-icons/fa';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface PendingUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  userType: 'individual' | 'employee';
  registrationMethod: 'manual' | 'google';
  accountStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  additionalInfo?: {
    phoneNumber?: string;
    organization?: string;
    reason?: string;
  };
}

interface ApprovalStats {
  totalPending: number;
  totalApproved: number;
  totalRejected: number;
  todayRequests: number;
}

const SuperAdminDashboard: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [stats, setStats] = useState<ApprovalStats>({
    totalPending: 0,
    totalApproved: 0,
    totalRejected: 0,
    todayRequests: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'individual' | 'employee'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPendingUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/admin/pending-requests`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data.data;
      setPendingUsers(data.pendingRequests || []);
      setStats(data.stats || {
        totalPending: 0,
        totalApproved: 0,
        totalRejected: 0,
        todayRequests: 0
      });
    } catch (error: any) {
      console.error('Failed to fetch pending users:', error);
      setError('Failed to load pending approvals');
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('Access denied. Super admin privileges required.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveUser = async (userId: string) => {
    try {
      setProcessingUserId(userId);
      const token = localStorage.getItem('token');
      
      await axios.post(`${API_BASE_URL}/auth/approve-account`, 
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Remove user from pending list
      setPendingUsers(prev => prev.filter(user => user._id !== userId));
      setStats(prev => ({
        ...prev,
        totalPending: prev.totalPending - 1,
        totalApproved: prev.totalApproved + 1
      }));

    } catch (error: any) {
      console.error('Failed to approve user:', error);
      setError('Failed to approve user account');
    } finally {
      setProcessingUserId(null);
    }
  };

  const handleRejectUser = async () => {
    if (!selectedUser || !rejectionReason.trim()) {
      setError('Please provide a rejection reason');
      return;
    }

    try {
      setProcessingUserId(selectedUser._id);
      const token = localStorage.getItem('token');
      
      await axios.post(`${API_BASE_URL}/auth/reject-account`, 
        { 
          userId: selectedUser._id,
          rejectionReason: rejectionReason.trim()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Remove user from pending list
      setPendingUsers(prev => prev.filter(user => user._id !== selectedUser._id));
      setStats(prev => ({
        ...prev,
        totalPending: prev.totalPending - 1,
        totalRejected: prev.totalRejected + 1
      }));

      // Close modal
      setShowRejectModal(false);
      setSelectedUser(null);
      setRejectionReason('');

    } catch (error: any) {
      console.error('Failed to reject user:', error);
      setError('Failed to reject user account');
    } finally {
      setProcessingUserId(null);
    }
  };

  const openRejectModal = (user: PendingUser) => {
    setSelectedUser(user);
    setShowRejectModal(true);
    setRejectionReason('');
    setError('');
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setSelectedUser(null);
    setRejectionReason('');
    setError('');
  };

  const filteredUsers = pendingUsers.filter(user => {
    const matchesFilter = filterType === 'all' || user.userType === filterType;
    const matchesSearch = searchTerm === '' || 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    fetchPendingUsers();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchPendingUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Approval Dashboard</h1>
          <p className="text-gray-600">Manage pending account requests and approvals</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="text-red-400 mr-3">⚠️</div>
              <div>
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaClock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Approval</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalPending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaUserCheck className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalApproved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaUserTimes className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalRejected}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaCalendar className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Today's Requests</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.todayRequests}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as 'all' | 'individual' | 'employee')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="individual">Individual Users</option>
                  <option value="employee">Employees</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <FaSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button
              onClick={fetchPendingUsers}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaSync />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Pending Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Pending Account Requests ({filteredUsers.length})
            </h2>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <FaUsers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
              <p className="text-gray-500">All caught up! No account requests awaiting approval.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type & Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">
                                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mb-1">
                            {user.userType}
                          </span>
                          <div className="text-sm text-gray-500 capitalize">{user.role.replace('_', ' ')}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.registrationMethod === 'google' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.registrationMethod === 'google' ? 'Google OAuth' : 'Manual Registration'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleApproveUser(user._id)}
                          disabled={processingUserId === user._id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {processingUserId === user._id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                          ) : (
                            <FaUserCheck className="mr-1" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => openRejectModal(user)}
                          disabled={processingUserId === user._id}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaUserTimes className="mr-1" />
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Rejection Modal */}
        {showRejectModal && selectedUser && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <FaUserTimes className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
                  Reject Account Request
                </h3>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    User: <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Email: <strong>{selectedUser.email}</strong>
                  </p>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rejection Reason <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Please provide a clear reason for rejection..."
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleRejectUser}
                    disabled={!rejectionReason.trim() || processingUserId === selectedUser._id}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {processingUserId === selectedUser._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : null}
                    Confirm Rejection
                  </button>
                  <button
                    onClick={closeRejectModal}
                    disabled={processingUserId === selectedUser._id}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
