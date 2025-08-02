import React from 'react';

// Mock data for the charts
const deviceStatusData = {
  received: 15,
  refurbished: 8,
  inProgress: 5,
  recycled: 12,
  disposed: 3
};

const SummaryCard: React.FC<{ title: string, value: string | number, subtitle?: string, color?: string }> = ({
  title,
  value,
  subtitle,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    purple: 'bg-purple-50 border-purple-200',
    red: 'bg-red-50 border-red-200',
  };

  const textColorClasses = {
    blue: 'text-blue-700',
    green: 'text-green-700',
    yellow: 'text-yellow-700',
    purple: 'text-purple-700',
    red: 'text-red-700',
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} rounded-lg shadow-sm p-4 border`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className={`text-2xl font-bold ${textColorClasses[color as keyof typeof textColorClasses]} mt-1`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};

const SummarySection: React.FC = () => {
  // Calculate totals from our mock data
  const totalDevices = Object.values(deviceStatusData).reduce((a, b) => a + b, 0);
  const totalWeight = 43.5; // This would come from your actual data
  
  // Environmental impact calculations
  const carbonOffset = totalWeight * 2.1; // kg CO2e
  const landfillDiversion = totalWeight; // kg
  const waterSaved = totalWeight * 30; // liters
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reports & Environmental Impact</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard 
          title="Total Devices" 
          value={totalDevices} 
          subtitle="All device types"
          color="blue"
        />
        <SummaryCard 
          title="Total Weight" 
          value={`${totalWeight} kg`} 
          subtitle="All collected e-waste"
          color="green"
        />
        <SummaryCard 
          title="CO₂ Prevented" 
          value={`${carbonOffset.toFixed(1)} kg`} 
          subtitle="Carbon emissions avoided"
          color="purple"
        />
        <SummaryCard 
          title="Water Saved" 
          value={`${waterSaved.toFixed(0)} L`} 
          subtitle="From manufacturing avoidance"
          color="blue"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Status Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Device Status Breakdown</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Received</span>
                <span className="text-sm font-medium">{deviceStatusData.received}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(deviceStatusData.received / totalDevices * 100).toFixed(0)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">In Progress</span>
                <span className="text-sm font-medium">{deviceStatusData.inProgress}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-yellow-500 h-2.5 rounded-full" 
                  style={{ width: `${(deviceStatusData.inProgress / totalDevices * 100).toFixed(0)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Refurbished</span>
                <span className="text-sm font-medium">{deviceStatusData.refurbished}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${(deviceStatusData.refurbished / totalDevices * 100).toFixed(0)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Recycled</span>
                <span className="text-sm font-medium">{deviceStatusData.recycled}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-purple-500 h-2.5 rounded-full" 
                  style={{ width: `${(deviceStatusData.recycled / totalDevices * 100).toFixed(0)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Disposed</span>
                <span className="text-sm font-medium">{deviceStatusData.disposed}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gray-500 h-2.5 rounded-full" 
                  style={{ width: `${(deviceStatusData.disposed / totalDevices * 100).toFixed(0)}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                <span className="text-xs">Received</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-xs">In Progress</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs">Refurbished</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-xs">Recycled</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                <span className="text-xs">Disposed</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Environmental Impact Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Environmental Impact</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Carbon Footprint Reduction</h4>
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  {carbonOffset.toFixed(1)} kg CO₂e
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Equivalent to planting {Math.round(carbonOffset / 25)} trees
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Landfill Diversion</h4>
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-blue-500 h-4 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  {landfillDiversion.toFixed(1)} kg
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Waste diverted from landfills
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Water Conservation</h4>
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-purple-500 h-4 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  {waterSaved.toFixed(0)} liters
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Water saved from manufacturing new devices
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Recycling Efficiency</h4>
              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  90%
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Material recovery rate
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Monthly Comparison */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Monthly Comparison</h3>
        
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="flex h-64 items-end border-b border-gray-300">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((month, i) => {
                const height = [30, 45, 25, 60, 48, 80, 65, 50][i]; // percent height
                
                return (
                  <div key={month} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full mx-1 bg-blue-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-xs mt-2">{month}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 text-center text-sm text-gray-500">
              Monthly E-Waste Collection (kg)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;
