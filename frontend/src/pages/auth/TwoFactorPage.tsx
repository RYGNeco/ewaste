import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Verify2FA from '../../components/auth/twoFactor/Verify2FA';
import Navbar from '../../components/Navbar';

const TwoFactorPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState('');
  
  useEffect(() => {
    // Get userId from location state or localStorage temp data
    const state = location.state as { userId?: string };
    const tempUserId = localStorage.getItem('tempUserId');
    
    if (state?.userId) {
      setUserId(state.userId);
    } else if (tempUserId) {
      setUserId(tempUserId);
    } else {
      // No userId found, redirect to login
      navigate('/login');
    }
  }, [navigate, location]);

  const handleSuccess = (token: string) => {
    // Clean up temporary data
    localStorage.removeItem('tempUserId');
    
    // Get user from token payload or make API call to get user data
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Redirect based on user type and status
    if (user.userType === 'super_admin') {
      navigate('/admin');
    } else if (user.userType === 'employee') {
      if (user.roleApprovalStatus === 'approved') {
        navigate('/admin'); // Or employee dashboard
      } else if (user.roleApprovalStatus === 'pending') {
        navigate('/pending-approval');
      } else {
        navigate('/role-rejected');
      }
    } else if (user.userType === 'partner') {
      navigate('/partner-dashboard');
    } else {
      navigate('/complete-profile');
    }
  };

  const handleCancel = () => {
    // Clean up and redirect to login
    localStorage.removeItem('tempUserId');
    navigate('/login');
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen py-12 px-4">
        <Verify2FA
          userId={userId}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default TwoFactorPage;
