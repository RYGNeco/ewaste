import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAuth, applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';

const AuthAction: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  useEffect(() => {
    const handleAuthAction = async () => {
      const mode = searchParams.get('mode');
      const actionCode = searchParams.get('oobCode');
      const auth = getAuth();

      if (!actionCode) {
        setError('Invalid action code. Please try again.');
        setLoading(false);
        return;
      }

      try {
        switch (mode) {
          case 'verifyEmail':
            await applyActionCode(auth, actionCode);
            setSuccess('Email verified successfully! You can now sign in.');
            setTimeout(() => navigate('/login'), 3000);
            break;

          case 'resetPassword':
            // Verify the password reset code first
            await verifyPasswordResetCode(auth, actionCode);
            setShowPasswordReset(true);
            setLoading(false);
            break;

          case 'signIn':
            setError('Email sign-in links are handled differently. Please check your email for the sign-in link.');
            setTimeout(() => navigate('/login'), 3000);
            break;

          default:
            setError('Invalid action. Please try again.');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleAuthAction();
  }, [searchParams, navigate]);

  const handlePasswordReset = async () => {
    const actionCode = searchParams.get('oobCode');
    const auth = getAuth();

    if (!actionCode) {
      setError('Invalid action code.');
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordReset(auth, actionCode, newPassword);
      setSuccess('Password reset successfully! You can now sign in with your new password.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Account Action Handler
          </h2>

          {loading && (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600">Processing your request...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <p className="text-green-600">{success}</p>
            </div>
          )}

          {showPasswordReset && !success && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your new password"
                  minLength={8}
                  required
                />
              </div>
              <button
                onClick={handlePasswordReset}
                disabled={loading || !newPassword}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthAction;
