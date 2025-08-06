import React from 'react';

interface ReportChartsProps {
  data?: any;
}

const ReportCharts: React.FC<ReportChartsProps> = ({ data }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Report Charts</h2>
      <div className="bg-gray-100 p-4 rounded">
        <p className="text-gray-600">Charts will be implemented here</p>
      </div>
    </div>
  );
};

export default ReportCharts;
