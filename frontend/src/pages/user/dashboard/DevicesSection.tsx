import React, { useState } from 'react';

const DeviceForm: React.FC = () => {
  const [formData, setFormData] = useState({
    type: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    status: 'Received',
    weight: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Device form submitted:', formData);
    // Here you would send this data to your API
    alert('Device added successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Add New Device</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              placeholder="e.g., Laptop, Phone, Monitor"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Manufacturer
            </label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              placeholder="e.g., Apple, Dell, Samsung"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              placeholder="e.g., MacBook Pro, XPS 13"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Serial Number
            </label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Optional"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Received">Received</option>
              <option value="In Progress">In Progress</option>
              <option value="Refurbished">Refurbished</option>
              <option value="Recycled">Recycled</option>
              <option value="Disposed">Disposed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              step="0.01"
              min="0"
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Device
          </button>
        </div>
      </form>
    </div>
  );
};

const DevicesList: React.FC = () => {
  // Mock data for devices
  const [devices, setDevices] = useState([
    { 
      id: 1, 
      type: 'Laptop', 
      manufacturer: 'Apple', 
      model: 'MacBook Pro', 
      serialNumber: 'C02XL0GZHV29', 
      status: 'Received',
      weight: '1.8'
    },
    { 
      id: 2, 
      type: 'Phone', 
      manufacturer: 'Samsung', 
      model: 'Galaxy S21', 
      serialNumber: 'R58M50DEXKE', 
      status: 'Refurbished',
      weight: '0.2'
    },
    { 
      id: 3, 
      type: 'Monitor', 
      manufacturer: 'Dell', 
      model: 'UltraSharp U2720Q', 
      serialNumber: 'CN0WTF3272448', 
      status: 'Recycled',
      weight: '4.5'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const filteredDevices = devices
    .filter(device => 
      device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(device => filter ? device.status === filter : true);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      setDevices(devices.filter(device => device.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Devices List</h3>
      
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="Received">Received</option>
            <option value="In Progress">In Progress</option>
            <option value="Refurbished">Refurbished</option>
            <option value="Recycled">Recycled</option>
            <option value="Disposed">Disposed</option>
          </select>
        </div>
        
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Add Device
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manufacturer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serial Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight (kg)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDevices.map((device) => (
              <tr key={device.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {device.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {device.manufacturer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {device.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {device.serialNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${device.status === 'Received' ? 'bg-blue-100 text-blue-800' :
                      device.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      device.status === 'Refurbished' ? 'bg-green-100 text-green-800' :
                      device.status === 'Recycled' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                    {device.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {device.weight}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    Edit
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(device.id)}
                  >
                    Trash
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DevicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'form'

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Devices Management</h2>
        <div className="space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveTab('list')}
          >
            Devices List
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'form' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveTab('form')}
          >
            Add Device
          </button>
        </div>
      </div>
      
      {activeTab === 'form' ? <DeviceForm /> : <DevicesList />}
    </div>
  );
};

export default DevicesSection;
