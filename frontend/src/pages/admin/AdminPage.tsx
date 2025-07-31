import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import Dashboard from '../../components/admin/Dashboard';
import BatchManagement from '../../components/admin/BatchManagement';
import EmployeeManagement from '../../components/admin/EmployeeManagement';
import InventoryManagement from '../../components/admin/InventoryManagement';
import PartnerManagement from '../../components/admin/PartnerManagement';
import Settings from '../../components/admin/Settings';

const AdminPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
    }
  }, [location.hash]);

  const handleNavigate = (section: string) => {
    navigate(`/admin#${section}`);
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'batches':
        return <BatchManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'employees':
        return <EmployeeManagement />;
      case 'partners':
        return <PartnerManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout onNavigate={handleNavigate}>
      {renderSection()}
    </AdminLayout>
  );
};

export default AdminPage;
