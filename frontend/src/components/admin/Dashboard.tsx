<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoleRequestService, { RoleRequestStats } from '../../services/RoleRequestService';

const Dashboard: React.FC = () => {
  const [roleRequestStats, setRoleRequestStats] = useState<RoleRequestStats | null>(null);

  useEffect(() => {
    const fetchRoleRequestStats = async () => {
      try {
        const stats = await RoleRequestService.getRoleRequestStats();
        setRoleRequestStats(stats);
      } catch (error) {
        console.error('Failed to fetch role request stats:', error);
      }
    };

    fetchRoleRequestStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Super Admin Dashboard</h1>
=======
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Statistics Cards */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">Total E-Waste Collected</h3>
          <p className="text-2xl font-semibold">1,234 kg</p>
          <span className="text-green-500 text-sm">↑ 12% from last month</span>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">Active Partners</h3>
          <p className="text-2xl font-semibold">45</p>
          <span className="text-green-500 text-sm">↑ 3 new this month</span>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
<<<<<<< HEAD
          <h3 className="text-gray-500 text-sm">Pending Role Requests</h3>
          <p className="text-2xl font-semibold text-blue-600">
            {roleRequestStats?.pending || 0}
          </p>
          <span className="text-blue-500 text-sm">
            {roleRequestStats?.total || 0} total requests
          </span>
=======
          <h3 className="text-gray-500 text-sm">Pending Collections</h3>
          <p className="text-2xl font-semibold">23</p>
          <span className="text-yellow-500 text-sm">Requires attention</span>
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">Recycling Rate</h3>
          <p className="text-2xl font-semibold">89%</p>
          <span className="text-green-500 text-sm">↑ 2% from last month</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">New batch received from Partner A</span>
              <span className="text-xs text-gray-500 ml-auto">2h ago</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">Processing completed for Batch #1234</span>
              <span className="text-xs text-gray-500 ml-auto">5h ago</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm">New partner registration request</span>
              <span className="text-xs text-gray-500 ml-auto">1d ago</span>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
<<<<<<< HEAD
            <Link 
              to="/admin/role-requests" 
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors block text-center"
            >
              <span className="block text-blue-700 font-medium">Role Requests</span>
              <span className="text-sm text-blue-600">
                {roleRequestStats?.pending || 0} pending
              </span>
            </Link>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <span className="block text-green-700 font-medium">Add Partner</span>
              <span className="text-sm text-green-600">Register new partner</span>
=======
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <span className="block text-green-700 font-medium">FUNCTION X</span>
              <span className="text-sm text-green-600"> FUNCTION</span>
            </button>
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <span className="block text-blue-700 font-medium">Add Partner</span>
              <span className="text-sm text-blue-600">Register new partner</span>
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <span className="block text-purple-700 font-medium">Reports</span>
              <span className="text-sm text-purple-600">Generate reports</span>
            </button>
            <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
              <span className="block text-yellow-700 font-medium">Settings</span>
              <span className="text-sm text-yellow-600">Update settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
