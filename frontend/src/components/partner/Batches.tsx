import React, { useState } from 'react';
import { 
  FaBoxes, 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaDownload,
  FaCalendar,
  FaWeight,
  FaDollarSign,
  FaRecycle
} from 'react-icons/fa';
import StatusBadge from '../common/StatusBadge';
import { StatusType, sortByStatus } from '../../utils/statusConfig';

const PartnerBatches: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - replace with actual API calls
  const batches = [
    {
      id: 'BATCH-001',
      status: 'completed' as StatusType,
      devices: 45,
      weight: '125 kg',
      date: '2024-01-15',
      value: '$2,450',
      pickupDate: '2024-01-10',
      completionDate: '2024-01-15'
    },
    {
      id: 'BATCH-002',
      status: 'processing' as StatusType,
      devices: 32,
      weight: '89 kg',
      date: '2024-01-14',
      value: '$1,890',
      pickupDate: '2024-01-12',
      completionDate: null
    },
    {
      id: 'BATCH-003',
      status: 'scheduled' as StatusType,
      devices: 67,
      weight: '156 kg',
      date: '2024-01-13',
      value: '$3,120',
      pickupDate: '2024-01-20',
      completionDate: null
    },
    {
      id: 'BATCH-004',
      status: 'pending' as StatusType,
      devices: 28,
      weight: '78 kg',
      date: '2024-01-12',
      value: '$1,560',
      pickupDate: null,
      completionDate: null
    }
  ];

  const filteredBatches = batches
    .filter(batch => {
      const matchesSearch = batch.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort(sortByStatus); // Sort by status priority

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Batches</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          <FaBoxes />
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Devices</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBatches.map((batch, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{batch.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={batch.status} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.devices}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{batch.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {batch.pickupDate ? new Date(batch.pickupDate).toLocaleDateString() : 'Not scheduled'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-green-600 hover:text-green-900" title="View Details">
                        <FaEye />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900" title="Download Report">
                        <FaDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Batches</p>
              <p className="text-2xl font-bold text-gray-900">{batches.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaBoxes className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900">
                {batches.reduce((sum, batch) => sum + batch.devices, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaRecycle className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Weight</p>
              <p className="text-2xl font-bold text-gray-900">
                {batches.reduce((sum, batch) => sum + parseFloat(batch.weight), 0).toFixed(1)} kg
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaWeight className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${batches.reduce((sum, batch) => sum + parseFloat(batch.value.replace('$', '').replace(',', '')), 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaDollarSign className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerBatches; 