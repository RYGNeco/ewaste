import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import RoleRequestManagement from '../../components/admin/RoleRequestManagement';
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
import api from '../../utils/api';

const AdminPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pendingRoleRequests, setPendingRoleRequests] = useState<any[]>([]);
  const [allEmployees, setAllEmployees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

      // Check if user has pending role approval
      if (parsedUserData?.roleApprovalStatus === 'pending') {
        navigate('/pending-approval');
        return;
      }
    }

    // Redirect if not employee
    if (storedUserType !== 'employee') {
      navigate('/login');
    }
  }, [navigate]);

// API Functions
const fetchPendingRoleRequests = async () => {
  try {
    const response = await api.get('/role-requests/pending');
    if (response && response.ok) {
      const data = await response.json();
      setPendingRoleRequests(data.data || []);
    }
  } catch (error) {
    console.error('Error fetching role requests:', error);
  }
};

const fetchAllEmployees = async () => {
  try {
    const response = await api.get('/users?userType=employee');
    if (response && response.ok) {
      const data = await response.json();
      setAllEmployees(data.data || []);
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
};

const approveRoleRequest = async (requestId: string, approvedRoles: string[]) => {
  setIsLoading(true);
  try {
    const response = await api.put(`/role-requests/${requestId}/approve`, { approvedRoles });
    if (response && response.ok) {
      await fetchPendingRoleRequests();
      await fetchAllEmployees();
      alert('Role request approved successfully!');
    } else {
      const error = await response!.json();
      alert(`Error: ${error.error}`);
    }
  } catch (error) {
    console.error('Error approving role request:', error);
    alert('Failed to approve role request');
  } finally {
    setIsLoading(false);
  }
};

const rejectRoleRequest = async (requestId: string, reason: string) => {
  setIsLoading(true);
  try {
    const response = await api.put(`/role-requests/${requestId}/reject`, { rejectionReason: reason });
    if (response && response.ok) {
      await fetchPendingRoleRequests();
      await fetchAllEmployees();
      alert('Role request rejected');
    } else {
      const error = await response!.json();
      alert(`Error: ${error.error}`);
    }
  } catch (error) {
    console.error('Error rejecting role request:', error);
    alert('Failed to reject role request');
  } finally {
    setIsLoading(false);
  }
};

const updateUserRole = async (userId: string, newRole: string) => {
  setIsLoading(true);
  try {
    const response = await api.put(`/users/${userId}/role`, { role: newRole });
    if (response && response.ok) {
      await fetchAllEmployees();
      alert('User role updated successfully!');
    } else {
      const error = await response!.json();
      alert(`Error: ${error.error}`);
    }
  } catch (error) {
    console.error('Error updating user role:', error);
    alert('Failed to update user role');
  } finally {
    setIsLoading(false);
  }
};

// Load data when component mounts or tab changes
useEffect(() => {
  if (userData?.role === 'super_admin' || userData?.role === 'admin') {
    if (activeTab === 'approvals') {
      fetchPendingRoleRequests();
    } else if (activeTab === 'employees') {
      fetchAllEmployees();
    }
  }
}, [activeTab, userData]);

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
      change: '+8.3%',
      changeType: 'increase',
      icon: FaUsers,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Devices Recycled',
      value: '15,432',
      change: '+15.2%',
      changeType: 'increase',
      icon: FaRecycle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Revenue',
      value: '$124,567',
      change: '+18.7%',
      changeType: 'increase',
      icon: FaDollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentBatches = [
    {
      id: 'BATCH-001',
      partner: 'TechCorp Inc.',
      devices: 45,
      weight: '125 kg',
      status: 'completed',
      date: '2024-01-15',
      value: '$2,450'
    },
    {
      id: 'BATCH-002',
      partner: 'DataFlow Systems',
      devices: 32,
      weight: '89 kg',
      status: 'processing',
      date: '2024-01-14',
      value: '$1,890'
    },
    {
      id: 'BATCH-003',
      partner: 'GreenTech Solutions',
      devices: 67,
      weight: '156 kg',
      status: 'scheduled',
      date: '2024-01-13',
      value: '$3,120'
    },
    {
      id: 'BATCH-004',
      partner: 'EcoRecycle Ltd.',
      devices: 28,
      weight: '78 kg',
      status: 'pending',
      date: '2024-01-12',
      value: '$1,560'
    }
  ];

  const partners = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      contact: 'John Smith',
      email: 'john@techcorp.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      batches: 24,
      totalValue: '$45,230'
    },
    {
      id: 2,
      name: 'DataFlow Systems',
      contact: 'Sarah Johnson',
      email: 'sarah@dataflow.com',
      phone: '+1 (555) 234-5678',
      status: 'active',
      batches: 18,
      totalValue: '$32,150'
    },
    {
      id: 3,
      name: 'GreenTech Solutions',
      contact: 'Mike Wilson',
      email: 'mike@greentech.com',
      phone: '+1 (555) 345-6789',
      status: 'pending',
      batches: 5,
      totalValue: '$8,900'
    }
  ];

  // Available roles for dropdown
  const availableRoles = [
    'admin',
    'inventory_manager', 
    'transporter',
    'coordinator'
  ];

  const formatRoleName = (role: string) => {
    return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Role Approval Modal Component
  const RoleApprovalModal: React.FC<{
    request: any;
    onApprove: (roles: string[]) => void;
    onReject: (reason: string) => void;
    availableRoles: string[];
  }> = ({ request, onApprove, onReject, availableRoles }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState<'approve' | 'reject'>('approve');
    const [selectedRoles, setSelectedRoles] = useState<string[]>(request.requestedRoles || []);
    const [rejectionReason, setRejectionReason] = useState('');

    const handleApprove = () => {
      if (selectedRoles.length === 0) {
        alert('Please select at least one role to approve');
        return;
      }
      onApprove(selectedRoles);
      setIsOpen(false);
    };

    const handleReject = () => {
      if (!rejectionReason.trim()) {
        alert('Please provide a reason for rejection');
        return;
      }
      onReject(rejectionReason);
      setIsOpen(false);
    };

    const toggleRole = (role: string) => {
      setSelectedRoles(prev => 
        prev.includes(role) 
          ? prev.filter(r => r !== role)
          : [...prev, role]
      );
    };

    return (
      <>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              setModalType('approve');
              setSelectedRoles(request.requestedRoles || []);
              setIsOpen(true);
            }}
            className="text-green-600 hover:text-green-900 px-2 py-1 rounded bg-green-50 text-xs"
          >
            Approve
          </button>
          <button 
            onClick={() => {
              setModalType('reject');
              setIsOpen(true);
            }}
            className="text-red-600 hover:text-red-900 px-2 py-1 rounded bg-red-50 text-xs"
          >
            Reject
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">
                {modalType === 'approve' ? 'Approve Role Request' : 'Reject Role Request'}
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Employee: {request.employeeName}</p>
                <p className="text-sm text-gray-600 mb-4">Email: {request.employeeEmail}</p>
              </div>

              {modalType === 'approve' ? (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select roles to approve:
                  </label>
                  <div className="space-y-2">
                    {availableRoles.map(role => (
                      <label key={role} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedRoles.includes(role)}
                          onChange={() => toggleRole(role)}
                          className="mr-2"
                        />
                        <span className="text-sm">{formatRoleName(role)}</span>
                        {request.requestedRoles?.includes(role) && (
                          <span className="ml-2 text-xs text-blue-600">(requested)</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for rejection:
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Please provide a reason for rejecting this role request..."
                  />
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={modalType === 'approve' ? handleApprove : handleReject}
                  className={`px-4 py-2 rounded-lg text-white ${
                    modalType === 'approve' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {modalType === 'approve' ? 'Approve' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

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
      case 'active':
        return 'bg-green-100 text-green-800';
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
      case 'active':
        return <FaCheckCircle className="text-green-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  const Dashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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

      {/* Recent Batches */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Batches</h3>
          <Link to="/admin/batches" className="text-sm text-green-600 hover:text-green-700 font-medium">
            View all
          </Link>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentBatches.slice(0, 3).map((batch, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaBoxes className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{batch.id}</p>
                    <p className="text-sm text-gray-600">{batch.partner}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(batch.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                      {batch.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{batch.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Batches = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Batch Management</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          <FaPlus />
          New Batch
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
            <option>Pending</option>
            <option>Scheduled</option>
            <option>Processing</option>
            <option>Completed</option>
          </select>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <FaFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Devices</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
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
                    <div className="flex items-center gap-2">
                      {getStatusIcon(batch.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.value}</td>
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
        <h2 className="text-2xl font-bold text-gray-900">Partner Management</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          <FaPlus />
          Add Partner
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batches</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partners.map((partner, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{partner.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(partner.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                        {partner.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.batches}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.totalValue}</td>
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

  const Analytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <span className="text-lg font-semibold text-gray-900">$124,567</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Devices Recycled</span>
              <span className="text-lg font-semibold text-gray-900">15,432</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Partners</span>
              <span className="text-lg font-semibold text-gray-900">89</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Environmental Impact</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">CO2 Saved</span>
              <span className="text-lg font-semibold text-gray-900">2.1 tons</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Landfill Avoided</span>
              <span className="text-lg font-semibold text-gray-900">3.2 tons</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Energy Saved</span>
              <span className="text-lg font-semibold text-gray-900">45,230 kWh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RoleApprovals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Role Approval Requests</h2>
        <button 
          onClick={fetchPendingRoleRequests}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Refresh
        </button>
      </div>
      
      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Roles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingRoleRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No pending role requests
                  </td>
                </tr>
              ) : (
                pendingRoleRequests.map((request: any, index: number) => (
                  <tr key={request._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.employeeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.employeeEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex flex-wrap gap-1">
                        {request.requestedRoles?.map((role: string, idx: number) => (
                          <span 
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {formatRoleName(role)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <RoleApprovalModal 
                          request={request}
                          onApprove={(roles) => approveRoleRequest(request._id, roles)}
                          onReject={(reason) => rejectRoleRequest(request._id, reason)}
                          availableRoles={availableRoles}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Employee Management Component
  const EmployeeManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
        <button 
          onClick={fetchAllEmployees}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Refresh
        </button>
      </div>
      
      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No employees found
                  </td>
                </tr>
              ) : (
                allEmployees.map((employee: any, index: number) => (
                  <tr key={employee._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {employee.name || `${employee.firstName} ${employee.lastName}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {formatRoleName(employee.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.roleApprovalStatus)}`}>
                        {employee.roleApprovalStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(employee.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {userData?.role === 'super_admin' && (
                        <RoleChangeDropdown 
                          employee={employee}
                          availableRoles={availableRoles}
                          onRoleChange={(newRole) => updateUserRole(employee._id, newRole)}
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Role Change Dropdown Component
  const RoleChangeDropdown: React.FC<{
    employee: any;
    availableRoles: string[];
    onRoleChange: (newRole: string) => void;
  }> = ({ employee, availableRoles, onRoleChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors text-xs"
        >
          Change Role
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="py-1">
              {availableRoles.map(role => (
                <button
                  key={role}
                  onClick={() => {
                    if (role !== employee.role) {
                      onRoleChange(role);
                    }
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    role === employee.role ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700'
                  }`}
                >
                  {formatRoleName(role)}
                  {role === employee.role && ' (Current)'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const Settings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" defaultValue={userData?.firstName ? `${userData.firstName} ${userData.lastName}` : user?.email?.split('@')[0] || ''} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" defaultValue={user?.email || ''} />
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Update Profile
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
          <div className="space-y-4">
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
              Change Password
            </button>
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
              Enable 2FA
            </button>
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
              View Login History
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('batches')}
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'batches'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Batches
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'partners'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Partners
            </button>
            {(userData?.role === 'super_admin' || userData?.role === 'admin') && (
              <>
                <button
                  onClick={() => setActiveTab('employees')}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'employees'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Employees
                </button>
                <button
                  onClick={() => setActiveTab('approvals')}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'approvals'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Approvals
                </button>
              </>
            )}
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'batches' && <Batches />}
        {activeTab === 'partners' && <Partners />}
        {activeTab === 'employees' && <EmployeeManagement />}
        {activeTab === 'approvals' && <RoleRequestManagement />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'settings' && <Settings />}
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
