import React, { useState } from 'react';

const PickupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    client: '',
    date: '',
    location: '',
    contact: '',
    phone: '',
    status: 'Scheduled',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pickup form submitted:', formData);
    // Here you would send this data to your API
    alert('Pickup scheduled successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Schedule a Pickup</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
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
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Schedule Pickup
          </button>
        </div>
      </form>
    </div>
  );
};

const PickupsList: React.FC = () => {
  // Mock data for pickups
  const [pickups, setPickups] = useState([
    { 
      id: 1, 
      person: 'John Doe', 
      date: '2025-08-10', 
      time: '10:00 AM', 
      location: '123 Main St, City', 
      status: 'Scheduled',
      weight: '15 kg'
    },
    { 
      id: 2, 
      person: 'Jane Smith', 
      date: '2025-08-15', 
      time: '2:30 PM', 
      location: '456 Oak Ave, Town', 
      status: 'Completed',
      weight: '23 kg'
    },
    { 
      id: 3, 
      person: 'Mike Johnson', 
      date: '2025-08-20', 
      time: '9:15 AM', 
      location: '789 Pine St, Village', 
      status: 'In Progress',
      weight: '8 kg'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const filteredPickups = pickups
    .filter(pickup => 
      pickup.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pickup.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(pickup => filter ? pickup.status === filter : true);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this pickup?')) {
      setPickups(pickups.filter(pickup => pickup.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Pickups List</h3>
      
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search by name or location..."
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
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Schedule A Pickup
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Person
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPickups.map((pickup) => (
              <tr key={pickup.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pickup.person}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pickup.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pickup.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pickup.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${pickup.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      pickup.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      pickup.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                    {pickup.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pickup.weight}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    Edit
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(pickup.id)}
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

const PickupsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'form'

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pickups Management</h2>
        <div className="space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveTab('list')}
          >
            Pickups List
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'form' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
            onClick={() => setActiveTab('form')}
          >
            Schedule Pickup
          </button>
        </div>
      </div>
      
      {activeTab === 'form' ? <PickupForm /> : <PickupsList />}
    </div>
  );
};

export default PickupsSection;
