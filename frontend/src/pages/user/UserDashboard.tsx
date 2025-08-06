import React, { useState } from 'react';

// Dashboard components
import DashboardWelcome from './dashboard/DashboardWelcome';
import PickupsSection from './dashboard/PickupsSection';
import DevicesSection from './dashboard/DevicesSection';
import SummarySection from './dashboard/SummarySection';
import ReportsSection from './dashboard/ReportsSection';
import MessagesSection from './dashboard/messages/MessagesSection';
import AnnouncementsSection from './dashboard/AnnouncementsSection';
import CalendarSection from './dashboard/calendar/CalendarSection';

// Header component for dashboard
const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/favicon.ico" alt="RYGNeco Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-xl font-bold">RYGNeco</h1>
      </div>
      
      <div className="flex-grow mx-4">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex items-center">
        <div className="relative">
          <button className="flex items-center space-x-2 focus:outline-none">
            <img 
              src="/placeholder.svg" 
              alt="Profile" 
              className="h-8 w-8 rounded-full border-2 border-gray-200"
            />
            <span className="hidden md:block">User Name</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {/* Dropdown menu would go here */}
        </div>
      </div>
    </div>
  );
};

// Sidebar navigation
const DashboardSidebar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'pickups', label: 'Pickups', icon: '🚚' },
    { id: 'devices', label: 'Devices', icon: '💻' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'messages', label: 'Messages', icon: '✉️' },
    { id: 'announcements', label: 'Announcements', icon: '📢' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 py-4 flex-shrink-0 h-full">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold">Client Dashboard</h2>
      </div>
      <nav className="mt-8">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-2 ${
                  activeTab === item.id 
                    ? 'bg-blue-600' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// Main Dashboard Component
const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardWelcome />;
      case 'pickups':
        return <PickupsSection />;
      case 'devices':
        return <DevicesSection />;
      case 'reports':
        return <ReportsSection />;
      case 'messages':
        return <MessagesSection />;
      case 'announcements':
        return <AnnouncementsSection />;
      case 'calendar':
        return <CalendarSection />;
      default:
        return <DashboardWelcome />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <DashboardHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-y-auto p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
