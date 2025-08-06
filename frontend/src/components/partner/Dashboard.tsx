import React from 'react';
import { 
  FaRecycle, 
  FaBoxes, 
  FaCalendar,
  FaDollarSign,
  FaWeight,
  FaLeaf,
  FaChartLine
} from 'react-icons/fa';
import StatusBadge from '../common/StatusBadge';
import { StatusType } from '../../utils/statusConfig';

const PartnerDashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = [
    {
      title: 'Total Batches',
      value: '24',
      change: '+3',
      changeType: 'increase',
      icon: FaBoxes,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Devices Recycled',
      value: '1,247',
      change: '+156',
      changeType: 'increase',
      icon: FaRecycle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Weight',
      value: '2.3 tons',
      change: '+0.4',
      changeType: 'increase',
      icon: FaWeight,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Revenue Earned',
      value: '$12,450',
      change: '+$1,890',
      changeType: 'increase',
      icon: FaDollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentBatches = [
    {
      id: 'BATCH-001',
      status: 'completed' as StatusType,
      devices: 45,
      weight: '125 kg',
      date: '2024-01-15',
      value: '$2,450'
    },
    {
      id: 'BATCH-002',
      status: 'processing' as StatusType,
      devices: 32,
      weight: '89 kg',
      date: '2024-01-14',
      value: '$1,890'
    },
    {
      id: 'BATCH-003',
      status: 'scheduled' as StatusType,
      devices: 67,
      weight: '156 kg',
      date: '2024-01-13',
      value: '$3,120'
    }
  ];

  const upcomingPickups = [
    {
      id: 'PICKUP-001',
      date: '2024-01-20',
      time: '10:00 AM',
      location: 'Main Office',
      status: 'confirmed' as StatusType
    },
    {
      id: 'PICKUP-002',
      date: '2024-01-25',
      time: '2:00 PM',
      location: 'Warehouse A',
      status: 'pending' as StatusType
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, Partner!</h1>
        <p className="text-green-100 text-sm sm:text-base">Track your recycling progress and manage your batches efficiently.</p>
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
            <button className="text-xs sm:text-sm text-green-600 hover:text-green-700 font-medium">
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
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{batch.devices} devices • {batch.weight}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <StatusBadge status={batch.status} size="sm" />
                    <p className="text-xs text-gray-600 mt-1">{batch.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Pickups */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Upcoming Pickups</h3>
            <button className="text-xs sm:text-sm text-green-600 hover:text-green-700 font-medium">
              Schedule new
            </button>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {upcomingPickups.map((pickup, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCalendar className="text-green-600 text-sm sm:text-base" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{pickup.id}</p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{pickup.date} at {pickup.time}</p>
                      <p className="text-xs text-gray-500 truncate">{pickup.location}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <StatusBadge status={pickup.status} size="sm" />
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
            <p className="text-lg sm:text-2xl font-bold text-gray-900">2.1 tons</p>
            <p className="text-xs sm:text-sm text-gray-600">CO2 Saved</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <FaWeight className="text-blue-600 text-lg sm:text-xl" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">3.2 tons</p>
            <p className="text-xs sm:text-sm text-gray-600">Landfill Avoided</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <FaChartLine className="text-purple-600 text-lg sm:text-xl" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">45,230 kWh</p>
            <p className="text-xs sm:text-sm text-gray-600">Energy Saved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard; 