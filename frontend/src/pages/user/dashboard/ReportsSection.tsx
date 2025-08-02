import React, { useState } from 'react';

interface ReportData {
  pickupsCompleted: number;
  devicesCollected: number;
  totalWeight: number;
  refurbished: number;
  recycled: number;
  disposed: number;
  carbonFootprint: number;
  landfillDiversion: number;
  deviceTypes: {
    type: string;
    count: number;
    percentage: number;
  }[];
}

const ReportsSection: React.FC = () => {
  // Mock report data
  const [reportData] = useState<ReportData>({
    pickupsCompleted: 125,
    devicesCollected: 450,
    totalWeight: 2750,
    refurbished: 180,
    recycled: 200,
    disposed: 70,
    carbonFootprint: 5200,
    landfillDiversion: 2750,
    deviceTypes: [
      { type: 'Laptops', count: 150, percentage: 33.3 },
      { type: 'Desktops', count: 100, percentage: 22.2 },
      { type: 'Monitors', count: 80, percentage: 17.8 },
      { type: 'Mobile Devices', count: 70, percentage: 15.6 },
      { type: 'Printers', count: 50, percentage: 11.1 }
    ]
  });

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    subtitle?: string;
    color?: string;
  }> = ({ title, value, subtitle, color = 'blue' }) => (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4`}>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className={`text-2xl font-bold text-${color}-700 mt-1`}>{value}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Pickups Completed"
          value={reportData.pickupsCompleted}
          subtitle="Last 30 days"
          color="blue"
        />
        <StatCard
          title="Devices Collected"
          value={reportData.devicesCollected}
          subtitle="Total devices"
          color="green"
        />
        <StatCard
          title="Total Weight"
          value={`${reportData.totalWeight} kg`}
          subtitle="All e-waste"
          color="purple"
        />
      </div>

      {/* Processing Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Processing Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Refurbished</p>
            <p className="text-2xl font-bold text-green-600">{reportData.refurbished}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{
                  width: `${(reportData.refurbished / reportData.devicesCollected * 100)}%`
                }}
              ></div>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Recycled</p>
            <p className="text-2xl font-bold text-blue-600">{reportData.recycled}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${(reportData.recycled / reportData.devicesCollected * 100)}%`
                }}
              ></div>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Disposed</p>
            <p className="text-2xl font-bold text-red-600">{reportData.disposed}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-red-600 h-2.5 rounded-full"
                style={{
                  width: `${(reportData.disposed / reportData.devicesCollected * 100)}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Environmental Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Carbon Footprint Reduction</p>
            <p className="text-2xl font-bold text-green-600">{reportData.carbonFootprint} kg CO₂e</p>
            <p className="text-sm text-gray-500">Equivalent to planting {Math.round(reportData.carbonFootprint / 25)} trees</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Landfill Diversion</p>
            <p className="text-2xl font-bold text-blue-600">{reportData.landfillDiversion} kg</p>
            <p className="text-sm text-gray-500">Total waste diverted from landfills</p>
          </div>
        </div>
      </div>

      {/* Device Type Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Device Type Distribution</h3>
        <div className="space-y-4">
          {reportData.deviceTypes.map(device => (
            <div key={device.type}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{device.type}</span>
                <span className="text-sm text-gray-500">{device.count} devices ({device.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${device.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;
