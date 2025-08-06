import React from 'react';

interface ReportsProps {
  data?: any;
}

const Reports: React.FC<ReportsProps> = ({ data }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Reports</h2>
      <div className="bg-gray-100 p-4 rounded">
        <p className="text-gray-600">Reports will be implemented here</p>
      </div>
    </div>
  );
};

export default Reports;
