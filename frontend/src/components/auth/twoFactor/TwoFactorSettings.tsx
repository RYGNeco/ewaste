import React, { useState, useEffect } from 'react';
import { FiShield, FiKey, FiAlertCircle, FiCheck, FiX } from 'react-icons/fi';
import Setup2FA from './Setup2FA';

interface TwoFactorSettingsProps {
  user: any;
  onUpdate: () => void;
}

const TwoFactorSettings: React.FC<TwoFactorSettingsProps> = ({ user, onUpdate }) => {
  const [twoFactorStatus, setTwoFactorStatus] = useState({
    enabled: false,
    backupCodesCount: 0
  });
  const [showSetup, setShowSetup] = useState(false);
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTwoFactorStatus();
  }, []);

  const fetchTwoFactorStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/2fa/status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setTwoFactorStatus({
          enabled: data.twoFactorEnabled,
          backupCodesCount: data.backupCodesCount
        });
      }
    } catch (err) {
      console.error('Failed to fetch 2FA status:', err);
    }
  };

  const disable2FA = async () => {
    if (!password.trim()) {
      setError('Password is required to disable 2FA');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/2fa/disable', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Two-factor authentication disabled successfully');
        setTwoFactorStatus({ enabled: false, backupCodesCount: 0 });
        setShowDisableConfirm(false);
        setPassword('');
        onUpdate();
      } else {
        setError(data.error || 'Failed to disable 2FA');
      }
    } catch (err) {
      setError('Failed to disable 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  const generateNewBackupCodes = async () => {
    if (!password.trim()) {
      setError('Password is required to generate new backup codes');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/2fa/backup-codes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();
      
      if (data.success) {
        // Show backup codes in a modal or download them
        const codesText = data.backupCodes.join('\n');
        const blob = new Blob([codesText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'backup-codes.txt';
        a.click();
        URL.revokeObjectURL(url);

        setSuccess('New backup codes generated and downloaded');
        fetchTwoFactorStatus();
      } else {
        setError(data.error || 'Failed to generate backup codes');
      }
    } catch (err) {
      setError('Failed to generate backup codes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupComplete = (backupCodes: string[]) => {
    setShowSetup(false);
    setSuccess('Two-factor authentication enabled successfully!');
    fetchTwoFactorStatus();
    onUpdate();
    
    // Download backup codes
    const codesText = backupCodes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (showSetup) {
    return (
      <Setup2FA
        onComplete={handleSetupComplete}
        onCancel={() => setShowSetup(false)}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <FiShield className="text-blue-500 mr-2" size={24} />
        <h3 className="text-lg font-semibold text-gray-800">
          Two-Factor Authentication
        </h3>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2 text-red-700">
          <FiAlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center space-x-2 text-green-700">
          <FiCheck size={16} />
          <span className="text-sm">{success}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              twoFactorStatus.enabled ? 'bg-green-500' : 'bg-gray-300'
            }`}></div>
            <div>
              <p className="font-medium text-gray-800">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-gray-600">
                {twoFactorStatus.enabled 
                  ? 'Your account is protected with 2FA'
                  : 'Add an extra layer of security to your account'
                }
              </p>
            </div>
          </div>
          <div>
            {twoFactorStatus.enabled ? (
              <button
                onClick={() => setShowDisableConfirm(true)}
                className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50"
              >
                Disable
              </button>
            ) : (
              <button
                onClick={() => setShowSetup(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Enable
              </button>
            )}
          </div>
        </div>

        {twoFactorStatus.enabled && (
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <FiKey className="text-gray-500" size={20} />
              <div>
                <p className="font-medium text-gray-800">Backup Codes</p>
                <p className="text-sm text-gray-600">
                  {twoFactorStatus.backupCodesCount} backup codes available
                </p>
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setPassword('');
                  setError('');
                }}
                className="px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
              >
                Generate New
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Disable 2FA Confirmation Modal */}
      {showDisableConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-max mx-4">
            <div className="flex items-center mb-4">
              <FiAlertCircle className="text-red-500 mr-2" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">
                Disable Two-Factor Authentication
              </h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Are you sure you want to disable 2FA? This will make your account less secure.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm with password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDisableConfirm(false);
                  setPassword('');
                  setError('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={disable2FA}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
              >
                {isLoading ? 'Disabling...' : 'Disable 2FA'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoFactorSettings;
