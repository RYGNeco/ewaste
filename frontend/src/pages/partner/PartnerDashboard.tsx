import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaRecycle, 
  FaBoxes, 
  FaCalendar, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaBuilding,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaSignOutAlt,
  FaChartLine,
  FaWeight,
  FaDesktop
} from 'react-icons/fa';

const PartnerDashboard: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [partnerData, setPartnerData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    const userType = localStorage.getItem('userType');
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    if (userType !== 'partner') {
      navigate('/login');
      return;
    }
    
    // Mock partner data - in real app, this would come from API
    setPartnerData({
      organizationName: userData?.organizationName || 'Your Organization',
      contactPerson: {
        firstName: userData?.firstName || 'John',
        lastName: userData?.lastName || 'Doe',
        email: userData?.email || 'john@example.com',
        phone: '+1 (555) 123-4567'
      },
      address: {
        street: '123 Business St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      businessInfo: {
        businessType: 'Corporation',
        industry: 'Technology',
        employeeCount: 150,
        website: 'https://example.com'
      },
      totalPickups: 24,
      totalWeight: 1250,
      totalDevices: 450,
      status: 'active'
    });
    
    setIsLoading(false);
  }, [navigate, userData]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Mock pickup history data
  const pickupHistory = [
    {
      id: 'BATCH-001',
      pickupDate: '2024-01-15',
      status: 'completed',
      weight: 125,
      deviceCount: 45,
      value: '$2,450'
    },
    {
      id: 'BATCH-002',
      pickupDate: '2024-01-10',
      status: 'completed',
      weight: 89,
      deviceCount: 32,
      value: '$1,890'
    },
    {
      id: 'BATCH-003',
      pickupDate: '2024-01-05',
      status: 'scheduled',
      weight: 156,
      deviceCount: 67,
      value: '$3,120'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-600" />;
      case 'scheduled':
        return <FaClock className="text-blue-600" />;
      case 'pending':
        return <FaExclamationTriangle className="text-yellow-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const Overview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pickups</p>
              <p className="text-2xl font-bold text-gray-900">{partnerData?.totalPickups || 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaBoxes className="text-xl text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Weight</p>
              <p className="text-2xl font-bold text-gray-900">{partnerData?.totalWeight || 0} kg</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaWeight className="text-xl text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Devices Recycled</p>
              <p className="text-2xl font-bold text-gray-900">{partnerData?.totalDevices || 0}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaDesktop className="text-xl text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Pickups */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Pickups</h3>
          <button className="text-sm text-green-600 hover:text-green-700 font-medium">
            View all
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {pickupHistory.map((pickup, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaBoxes className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{pickup.id}</p>
                    <p className="text-sm text-gray-600">{pickup.pickupDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(pickup.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pickup.status)}`}>
                      {pickup.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{pickup.weight} kg • {pickup.deviceCount} devices</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Profile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
            <input
              type="text"
              value={partnerData?.organizationName || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
            <input
              type="text"
              value={partnerData?.businessInfo?.businessType || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <input
              type="text"
              value={partnerData?.businessInfo?.industry || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employee Count</label>
            <input
              type="text"
              value={partnerData?.businessInfo?.employeeCount || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
            <input
              type="text"
              value={`${partnerData?.contactPerson?.firstName || ''} ${partnerData?.contactPerson?.lastName || ''}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={partnerData?.contactPerson?.email || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={partnerData?.contactPerson?.phone || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              type="url"
              value={partnerData?.businessInfo?.website || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <input
              type="text"
              value={partnerData?.address?.street || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              value={partnerData?.address?.city || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input
              type="text"
              value={partnerData?.address?.state || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
            <input
              type="text"
              value={partnerData?.address?.zipCode || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <input
              type="text"
              value={partnerData?.address?.country || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <FaBuilding className="text-2xl text-green-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Partner Dashboard</h1>
              <p className="text-sm text-gray-600">{partnerData?.organizationName}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'profile'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'profile' && <Profile />}
      </div>
    </div>
  );
};

export default PartnerDashboard; 