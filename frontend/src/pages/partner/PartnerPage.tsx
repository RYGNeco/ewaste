import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PartnerLayout from '../../components/layout/PartnerLayout';
import PartnerDashboard from '../../components/partner/Dashboard';
import PartnerBatches from '../../components/partner/Batches';
import { getAuth, User } from 'firebase/auth';
import '../../firebase';
import { getPartnerActiveTabFromPath, hasPartnerAccessToSection } from '../../config/partnerNavigation';

const PartnerPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (!u) {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    const storedUserData = localStorage.getItem('userData');
    
    setUserType(storedUserType);
    
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);

      // Check if user has pending role approval
      if (parsedUserData?.roleApprovalStatus === 'pending') {
        navigate('/pending-approval');
        return;
      }
    }

    // Redirect if not partner
    if (storedUserType !== 'partner') {
      navigate('/login');
    }
  }, [navigate]);

  // Handle navigation from sidebar
  const handleNavigation = (section: string) => {
    // Check if user has access to this section
    if (!hasPartnerAccessToSection(section, userData?.role)) {
      console.warn(`User does not have access to section: ${section}`);
      return;
    }
    setActiveTab(section);
  };

  // Set active tab based on URL path using shared configuration
  useEffect(() => {
    const activeTab = getPartnerActiveTabFromPath(location.pathname);
    setActiveTab(activeTab);
  }, [location.pathname]);

  if (!user || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <PartnerLayout onNavigate={handleNavigation}>
      {/* Content Area */}
      <div className="space-y-6">
        {activeTab === 'dashboard' && <PartnerDashboard />}
        {activeTab === 'batches' && <PartnerBatches />}
        {activeTab === 'pickup' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule Pickup</h2>
            <p className="text-gray-600">Pickup scheduling functionality will be implemented here.</p>
          </div>
        )}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports</h2>
            <p className="text-gray-600">Reports and analytics will be implemented here.</p>
          </div>
        )}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>
            <p className="text-gray-600">Messaging system will be implemented here.</p>
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
            <p className="text-gray-600">Profile management will be implemented here.</p>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
};

export default PartnerPage; 