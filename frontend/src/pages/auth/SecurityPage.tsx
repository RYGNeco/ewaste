import React from 'react';
import TwoFactorSettings from '../../components/auth/twoFactor/TwoFactorSettings';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const SecurityPage: React.FC = () => {
  // Get user from localStorage (in a real app, you'd use a proper state management solution)
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleSecurityUpdate = () => {
    // Refresh user data or trigger a re-fetch
    console.log('Security settings updated');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Security Settings
              </h1>
              <p className="text-gray-600">
                Manage your account security and two-factor authentication settings
              </p>
            </div>

            <div className="space-y-6">
              {/* Account Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">{user.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium">{user.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">User Type:</span>
                    <span className="ml-2 font-medium capitalize">{user.userType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Role:</span>
                    <span className="ml-2 font-medium capitalize">{user.role}</span>
                  </div>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <TwoFactorSettings user={user} onUpdate={handleSecurityUpdate} />

              {/* Login Activity (placeholder for future implementation) */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Login Activity
                </h3>
                <p className="text-gray-600 text-sm">
                  Login activity tracking will be available in a future update.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SecurityPage;
