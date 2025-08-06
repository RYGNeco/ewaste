import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, User } from 'firebase/auth';
import '../../firebase';

interface PartnerAuthGuardProps {
  children: React.ReactNode;
}

const PartnerAuthGuard: React.FC<PartnerAuthGuardProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      
      if (!u) {
        // User not authenticated, redirect to login
        navigate('/login');
        return;
      }

      // Get user data from localStorage
      const storedUserData = localStorage.getItem('userData');
      const storedUserType = localStorage.getItem('userType');
      
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);

        // Check if user has pending role approval
        if (parsedUserData?.roleApprovalStatus === 'pending') {
          navigate('/pending-approval');
          return;
        }

        // Check if user is rejected
        if (parsedUserData?.roleApprovalStatus === 'rejected') {
          navigate('/role-rejected');
          return;
        }
      }

      // Check if user type is partner
      if (storedUserType !== 'partner') {
        // User is not a partner, redirect to appropriate page
        if (storedUserType === 'employee') {
          navigate('/admin');
        } else {
          navigate('/login');
        }
        return;
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !userData) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
};

export default PartnerAuthGuard; 