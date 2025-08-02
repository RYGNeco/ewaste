import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRecycle, 
  FaPlus, 
  FaSearch, 
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaUser,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaArrowRight,
  FaDownload,
  FaChartLine,
  FaBoxes,
  FaTruck,
  FaLeaf,
  FaDollarSign,
  FaWeight,
  FaHistory,
  FaBell,
  FaTimes,
  FaShieldAlt
} from 'react-icons/fa';
import { getAuth, signOut, User } from 'firebase/auth';
import '../../firebase';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PartnerDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (!u) {
        window.location.href = '/login';
      }
    });

    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      localStorage.removeItem('userData');
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Mock data
  const stats = [
    {
      title: 'Total Requests',
      value: '24',
      change: '+12.5%',
      changeType: 'increase',
      icon: FaBoxes,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Devices Recycled',
      value: '1,247',
      change: '+8.3%',
      changeType: 'increase',
      icon: FaRecycle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Weight',
      value: '3.2 tons',
      change: '+15.2%',
      changeType: 'increase',
      icon: FaWeight,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Environmental Impact',
      value: '2.1 tons CO2',
      change: '+18.7%',
      changeType: 'increase',
      icon: FaLeaf,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentRequests = [
    {
      id: 'REQ-001',
      type: 'Corporate Pickup',
      devices: 45,
      weight: '125 kg',
      status: 'completed',
      date: '2024-01-15',
      pickupDate: '2024-01-10',
      location: 'Main Office'
    },
    {
      id: 'REQ-002',
      type: 'Data Destruction',
      devices: 32,
      weight: '89 kg',
      status: 'processing',
      date: '2024-01-14',
      pickupDate: '2024-01-12',
      location: 'Data Center'
    },
    {
      id: 'REQ-003',
      type: 'Asset Recovery',
      devices: 67,
      weight: '156 kg',
      status: 'scheduled',
      date: '2024-01-13',
      pickupDate: '2024-01-18',
      location: 'Warehouse'
    },
    {
      id: 'REQ-004',
      type: 'Corporate Pickup',
      devices: 28,
      weight: '78 kg',
      status: 'pending',
      date: '2024-01-12',
      pickupDate: '2024-01-20',
      location: 'Branch Office'
    }
  ];

  const serviceTypes = [
    {
      id: 'corporate_pickup',
      title: 'Corporate Pickup',
      description: 'Scheduled collection from your business location',
      icon: FaTruck,
      features: ['Flexible scheduling', 'Volume discounts', 'Certified handling', 'Real-time tracking']
    },
    {
      id: 'data_destruction',
      title: 'Data Destruction',
      description: 'Secure data wiping and physical destruction',
      icon: FaShieldAlt,
      features: ['Certified destruction', 'Audit trails', 'Compliance reports', 'Secure chain of custody']
    },
    {
      id: 'asset_recovery',
      title: 'Asset Recovery',
      description: 'Maximize value from your old electronics',
      icon: FaDollarSign,
      features: ['Value assessment', 'Market analysis', 'Revenue sharing', 'Detailed reporting']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-600" />;
      case 'processing':
        return <FaClock className="text-blue-600" />;
      case 'scheduled':
        return <FaCalendar className="text-yellow-600" />;
      case 'pending':
        return <FaExclamationTriangle className="text-orange-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  const Overview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`text-sm font-medium text-green-600`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">from last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon className={`text-xl ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <FaPlus className="text-green-600" />
            <span className="font-medium text-green-800">Request Service</span>
          </button>
          <Link 
            to="/partner/requests"
            className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FaHistory className="text-blue-600" />
            <span className="font-medium text-blue-800">View All Requests</span>
          </Link>
          <Link 
            to="/partner/reports"
            className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <FaDownload className="text-purple-600" />
            <span className="font-medium text-purple-800">Download Reports</span>
          </Link>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="card">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Requests</h3>
          <Link to="/partner/requests" className="text-sm text-green-600 hover:text-green-700 font-medium">
            View all
          </Link>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentRequests.slice(0, 3).map((request, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaBoxes className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{request.id}</p>
                    <p className="text-sm text-gray-600">{request.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(request.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{request.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Requests = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Service Requests</h2>
        <button 
          onClick={() => setShowRequestModal(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <FaPlus />
          New Request
        </button>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option>All Status</option>
            <option>Pending</option>
            <option>Scheduled</option>
            <option>Processing</option>
            <option>Completed</option>
          </select>
          <button className="btn btn-secondary flex items-center gap-2">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Requests Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Devices</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentRequests.map((request, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.devices}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(request.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.pickupDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-green-600 hover:text-green-900">
                        <FaEye />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const Profile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input type="text" className="form-input" defaultValue={userData?.company || 'Your Company'} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
              <input type="text" className="form-input" defaultValue={`${userData?.firstName || ''} ${userData?.lastName || ''}`} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="form-input" defaultValue={user?.email || ''} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input type="tel" className="form-input" defaultValue={userData?.phone || ''} />
            </div>
            <button className="btn btn-primary">Update Profile</button>
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
          <div className="space-y-4">
            <button className="w-full btn btn-outline">Change Password</button>
            <button className="w-full btn btn-outline">Enable 2FA</button>
            <button className="w-full btn btn-outline">View Login History</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Service Request Modal
  const ServiceRequestModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showRequestModal ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Request Service</h3>
          <button 
            onClick={() => setShowRequestModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
            <div className="grid grid-cols-1 gap-4">
              {serviceTypes.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <service.icon className="text-xl text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{service.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                      <ul className="text-xs space-y-1 text-gray-500">
                        {service.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Devices</label>
              <input type="number" className="form-input" placeholder="Enter number of devices" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Weight (kg)</label>
              <input type="number" className="form-input" placeholder="Enter estimated weight" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
            <input type="text" className="form-input" placeholder="Enter pickup address" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Pickup Date</label>
            <input type="date" className="form-input" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea rows={4} className="form-input" placeholder="Any special requirements or notes..."></textarea>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setShowRequestModal(false)}
              className="flex-1 btn btn-secondary"
            >
              Cancel
            </button>
            <button className="flex-1 btn btn-primary">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Partner Dashboard</h1>
              <p className="text-gray-600">Welcome back, {userData.firstName}!</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="btn btn-outline">
                <FaBell />
              </button>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8 shadow-sm">
            {[
              { id: 'overview', label: 'Overview', icon: FaChartLine },
              { id: 'requests', label: 'Requests', icon: FaBoxes },
              { id: 'profile', label: 'Profile', icon: FaUser }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'requests' && <Requests />}
          {activeTab === 'profile' && <Profile />}
        </div>
      </div>

      <ServiceRequestModal />
      <Footer />
    </div>
  );
};

export default PartnerDashboard; 