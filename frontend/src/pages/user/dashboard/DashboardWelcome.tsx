import React from 'react';

const DashboardWelcome: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to your E-Waste Dashboard!</h2>
        <p className="text-gray-600 mb-4">
          Track your electronic waste recycling journey and make a positive environmental impact.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800">Next Pickup</h3>
            <p className="text-sm text-gray-600">Aug 15, 2025 - 10:00 AM</p>
            <button className="mt-2 text-sm text-green-700 font-medium hover:underline">
              View Details &rarr;
            </button>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800">Recent Devices</h3>
            <p className="text-sm text-gray-600">5 devices processed this month</p>
            <button className="mt-2 text-sm text-blue-700 font-medium hover:underline">
              View All &rarr;
            </button>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800">Environmental Impact</h3>
            <p className="text-sm text-gray-600">35 kg CO₂ emissions prevented</p>
            <button className="mt-2 text-sm text-purple-700 font-medium hover:underline">
              View Report &rarr;
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Recent Pickups</h3>
            <button className="text-blue-600 hover:underline text-sm">View All</button>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="border-b pb-3 last:border-0">
                <div className="flex justify-between">
                  <p className="font-medium">Pickup #{1000 + i}</p>
                  <span className="text-sm text-gray-500">Jul {25 + i}, 2025</span>
                </div>
                <p className="text-sm text-gray-600">Status: {i === 1 ? 'Completed' : 'Scheduled'}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Quick Actions</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Schedule Pickup
            </button>
            <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
              Add Device
            </button>
            <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">
              View Reports
            </button>
            <button className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;
