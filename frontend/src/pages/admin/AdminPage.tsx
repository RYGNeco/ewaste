import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaRecycle, 
  FaUsers, 
  FaChartLine, 
  FaBoxes, 
  FaShieldAlt,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaPlus,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaUserTie,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaDollarSign,
  FaWeight,
  FaLeaf
} from 'react-icons/fa';
import { getAuth, signOut, User } from 'firebase/auth';
import '../../firebase';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AdminPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (!u) {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    const storedUserData = localStorage.getItem('userData');
    
    setUserType(storedUserType);
    
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      setUserRole(parsedUserData.role);
    }
    
    // Redirect if not employee
    if (storedUserType !== 'employee') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Mock data
  const stats = [
    {
      title: 'Total Batches',
      value: '1,247',
      change: '+12.5%',
      changeType: 'increase',
      icon: FaBoxes,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Partners',
      value: '89',
      change: '+5.2%',
      changeType: 'increase',
      icon: FaUsers,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Revenue This Month',
      value: '$45,230',
      change: '+18.3%',
      changeType: 'increase',
      icon: FaDollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Devices Recycled',
      value: '12,456',
      change: '+8.7%',
      changeType: 'increase',
      icon: FaRecycle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentBatches = [
    {
      id: 'B-001',
      partner: 'TechCorp Solutions',
      devices: 45,
      weight: '125 kg',
      status: 'completed',
      date: '2024-01-15',
      revenue: '$2,340'
    },
    {
      id: 'B-002',
      partner: 'GreenTech Industries',
      devices: 32,
      weight: '89 kg',
      status: 'processing',
      date: '2024-01-14',
      revenue: '$1,890'
    },
    {
      id: 'B-003',
      partner: 'EcoForward Inc',
      devices: 67,
      weight: '156 kg',
      status: 'scheduled',
      date: '2024-01-13',
      revenue: '$3,120'
    },
    {
      id: 'B-004',
      partner: 'Digital Solutions Ltd',
      devices: 28,
      weight: '78 kg',
      status: 'completed',
      date: '2024-01-12',
      revenue: '$1,650'
    }
  ];

  const recentPartners = [
    {
      id: 'P-001',
      name: 'TechCorp Solutions',
      contact: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      joinDate: '2024-01-10'
    },
    {
      id: 'P-002',
      name: 'GreenTech Industries',
      contact: 'Michael Chen',
      email: 'michael@greentech.com',
      phone: '+1 (555) 234-5678',
      status: 'active',
      joinDate: '2024-01-08'
    },
    {
      id: 'P-003',
      name: 'EcoForward Inc',
      contact: 'Emily Rodriguez',
      email: 'emily@ecoforward.com',
      phone: '+1 (555) 345-6789',
      status: 'pending',
      joinDate: '2024-01-05'
    }
  ];

  const pendingRoleRequests = [
    {
      id: 'EMP-001',
      name: 'John Smith',
      email: 'john.smith@company.com',
      requestedRole: 'inventory_manager',
      requestDate: '2024-01-15',
      status: 'pending'
    },
    {
      id: 'EMP-002',
      name: 'Lisa Johnson',
      email: 'lisa.johnson@company.com',
      requestedRole: 'transporter',
      requestDate: '2024-01-14',
      status: 'pending'
    },
    {
      id: 'EMP-003',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      requestedRole: 'coordinator',
      requestDate: '2024-01-13',
      status: 'pending'
    }
  ];

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FaChartLine },
    { name: 'Batches', href: '/admin/batches', icon: FaBoxes },
    { name: 'Partners', href: '/admin/partners', icon: FaUsers },
    { name: 'Role Approvals', href: '/admin/approvals', icon: FaShieldAlt, adminOnly: true },
    { name: 'Analytics', href: '/admin/analytics', icon: FaRecycle },
    { name: 'Settings', href: '/admin/settings', icon: FaCog }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const Dashboard = () => (
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
                  {stat.changeType === 'increase' ? (
                    <FaArrowUp className="text-green-500 text-xs" />
                  ) : (
                    <FaArrowDown className="text-red-500 text-xs" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Batches */}
        <div className="card">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Batches</h3>
            <Link to="/admin/batches" className="text-sm text-green-600 hover:text-green-700 font-medium">
              View all
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentBatches.map((batch, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FaBoxes className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{batch.id}</p>
                      <p className="text-sm text-gray-600">{batch.partner}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{batch.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Partners */}
        <div className="card">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Partners</h3>
            <Link to="/admin/partners" className="text-sm text-green-600 hover:text-green-700 font-medium">
              View all
            </Link>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentPartners.map((partner, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaBuilding className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{partner.name}</p>
                      <p className="text-sm text-gray-600">{partner.contact}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                      {partner.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
            <FaPlus className="text-green-600" />
            <span className="font-medium text-green-800">Add New Batch</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
            <FaUsers className="text-blue-600" />
            <span className="font-medium text-blue-800">Add New Partner</span>
          </button>
          <button className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
            <FaDownload className="text-purple-600" />
            <span className="font-medium text-purple-800">Export Report</span>
          </button>
        </div>
      </div>
    </div>
  );

  const Batches = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Batches Management</h2>
        <button className="btn btn-primary flex items-center gap-2">
          <FaPlus />
          New Batch
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
                placeholder="Search batches..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <option>All Status</option>
            <option>Completed</option>
            <option>Processing</option>
            <option>Scheduled</option>
          </select>
          <button className="btn btn-secondary flex items-center gap-2">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Batches Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Devices</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBatches.map((batch, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{batch.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.partner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.devices}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.revenue}</td>
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

  const Partners = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Partners Management</h2>
        <button className="btn btn-primary flex items-center gap-2">
          <FaPlus />
          New Partner
        </button>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentPartners.map((partner, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaBuilding className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                <p className="text-sm text-gray-600">{partner.contact}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaEnvelope className="text-gray-400" />
                {partner.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaPhone className="text-gray-400" />
                {partner.phone}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                {partner.status}
              </span>
              <div className="flex items-center gap-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <FaEdit />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaRecycle className="text-green-600" />
                <span className="font-medium text-gray-900">Devices Recycled</span>
              </div>
              <span className="text-2xl font-bold text-green-600">12,456</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaWeight className="text-blue-600" />
                <span className="font-medium text-gray-900">Total Weight</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">34.2 tons</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaDollarSign className="text-purple-600" />
                <span className="font-medium text-gray-900">Revenue</span>
              </div>
              <span className="text-2xl font-bold text-purple-600">$45,230</span>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Impact</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaLeaf className="text-green-600" />
                <span className="font-medium text-gray-900">CO2 Saved</span>
              </div>
              <span className="text-2xl font-bold text-green-600">2.3 tons</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FaRecycle className="text-orange-600" />
                <span className="font-medium text-gray-900">Materials Recovered</span>
              </div>
              <span className="text-2xl font-bold text-orange-600">95%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RoleApprovals = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Role Approval Requests</h2>
        <div className="text-sm text-gray-600">
          {pendingRoleRequests.length} pending requests
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingRoleRequests.map((request, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {request.requestedRole.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.requestDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-green-600 hover:text-green-900">
                        Approve
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Reject
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

  const Settings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" className="form-input" defaultValue={userData?.firstName ? `${userData.firstName} ${userData.lastName}` : 'Admin User'} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="form-input" defaultValue={user?.email || ''} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input type="text" className="form-input" defaultValue={userRole ? userRole.replace('_', ' ').toUpperCase() : 'Admin'} disabled />
            </div>
            <button className="btn btn-primary">Update Profile</button>
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
          <div className="space-y-4">
            <button className="w-full btn btn-outline">Change Password</button>
            <button className="w-full btn btn-outline">Enable 2FA</button>
            <button className="w-full btn btn-outline">View Login History</button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user || userType !== 'employee') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16 pb-16">
        <div className="flex">
          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <FaRecycle className="text-2xl text-green-600" />
                <span className="text-xl font-bold text-gray-900">RYGNeco</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <nav className="mt-6 px-3">
              <div className="space-y-1">
                {navigation
                  .filter(item => !item.adminOnly || userRole === 'admin')
                  .map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="text-lg" />
                        {item.name}
                      </Link>
                    );
                  })}
              </div>
            </nav>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <FaUserTie className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{userData?.firstName ? `${userData.firstName} ${userData.lastName}` : user.email?.split('@')[0]}</p>
                  <p className="text-xs text-gray-500">{userRole ? userRole.replace('_', ' ').toUpperCase() : 'Administrator'}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-0">
            {/* Top Bar */}
            <div className="bg-white shadow-sm border-b border-gray-200">
              <div className="flex items-center justify-between h-16 px-6">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
                >
                  <FaBars />
                </button>
                <div className="flex items-center gap-4">
                  <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <FaCog />
                  </button>
                </div>
              </div>
            </div>

            {/* Page Content */}
            <main className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/batches" element={<Batches />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/approvals" element={<RoleApprovals />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPage;
