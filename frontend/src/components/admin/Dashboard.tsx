import React from 'react';
import { 
  FaRecycle, 
  FaBoxes, 
  FaUsers,
  FaDollarSign,
  FaWeight,
  FaLeaf,
  FaChartLine,
  FaCalendar,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';

const Dashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: 'Total Batches',
      value: '156',
      change: '+12',
      changeType: 'increase',
      icon: FaBoxes,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Partners',
      value: '89',
      change: '+5',
      changeType: 'increase',
      icon: FaUsers,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Devices Recycled',
      value: '8,247',
      change: '+1,234',
      changeType: 'increase',
      icon: FaRecycle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Revenue',
      value: '$45,230',
      change: '+$5,890',
      changeType: 'increase',
      icon: FaDollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentBatches = [
    {
      id: 'BATCH-001',
      status: 'completed',
      partner: 'TechCorp Inc.',
      devices: 45,
      weight: '125 kg',
      date: '2024-01-15'
    },
    {
      id: 'BATCH-002',
      status: 'processing',
      partner: 'GreenTech Solutions',
      devices: 32,
      weight: '89 kg',
      date: '2024-01-14'
    },
    {
      id: 'BATCH-003',
      status: 'scheduled',
      partner: 'EcoRecycle Ltd.',
      devices: 67,
      weight: '156 kg',
      date: '2024-01-13'
    }
  ];

  const pendingApprovals = [
    {
      id: 'REQ-001',
      name: 'John Smith',
      company: 'NewTech Solutions',
      role: 'partner',
      date: '2024-01-15'
    },
    {
      id: 'REQ-002',
      name: 'Sarah Johnson',
      company: 'EcoPartners Inc.',
      role: 'employee',
      date: '2024-01-14'
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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-600" />;
      case 'processing':
        return <FaRecycle className="text-blue-600" />;
      case 'scheduled':
        return <FaCalendar className="text-yellow-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-blue-100 text-sm sm:text-base">Monitor your e-waste recycling operations and manage partners efficiently.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs sm:text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">from last month</span>
                </div>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${stat.bgColor} flex-shrink-0 ml-3`}>
                <stat.icon className={`text-lg sm:text-xl ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Batches */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Batches</h3>
            <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all
            </button>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {recentBatches.map((batch, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaBoxes className="text-blue-600 text-sm sm:text-base" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{batch.id}</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{batch.partner}</p>
                      <p className="text-xs text-gray-500">{batch.devices} devices • {batch.weight}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      {getStatusIcon(batch.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(batch.status)}`}>
                        {batch.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{batch.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Pending Approvals</h3>
            <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all
            </button>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {pendingApprovals.map((approval, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaUsers className="text-orange-600 text-sm sm:text-base" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{approval.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{approval.company}</p>
                      <p className="text-xs text-gray-500 capitalize">{approval.role}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Pending
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{approval.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Environmental Impact</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <FaLeaf className="text-green-600 text-lg sm:text-xl" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">12.5 tons</p>
            <p className="text-xs sm:text-sm text-gray-600">CO2 Saved</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <FaWeight className="text-blue-600 text-lg sm:text-xl" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">18.2 tons</p>
            <p className="text-xs sm:text-sm text-gray-600">Landfill Avoided</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <FaChartLine className="text-purple-600 text-lg sm:text-xl" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">156,230 kWh</p>
            <p className="text-xs sm:text-sm text-gray-600">Energy Saved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
