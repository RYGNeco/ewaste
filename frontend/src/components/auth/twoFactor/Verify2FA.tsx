import React, { useState } from 'react';
import { FiShield, FiAlertCircle } from 'react-icons/fi';

interface Verify2FAProps {
  userId: string;
  onSuccess: (token: string) => void;
  onCancel: () => void;
}

const Verify2FA: React.FC<Verify2FAProps> = ({ userId, onSuccess, onCancel }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isBackupCode, setIsBackupCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const verify2FA = async () => {
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/complete-2fa-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          twoFactorCode: verificationCode,
          isBackupCode
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Store the token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onSuccess(data.token);
      } else {
        setError(data.error || 'Invalid verification code');
        setAttempts(prev => prev + 1);
        setVerificationCode('');
      }
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      verify2FA();
    }
  };

  const isCodeValid = isBackupCode 
    ? verificationCode.length >= 8 
    : verificationCode.length === 6;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiShield size={32} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Two-Factor Authentication
        </h2>
        <p className="text-gray-600">
          {isBackupCode 
            ? 'Enter one of your backup codes'
            : 'Enter the 6-digit code from your authenticator app'
          }
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2 text-red-700">
          <FiAlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {attempts >= 3 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
          <p className="text-sm">
            Having trouble? You can use a backup code instead.
          </p>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isBackupCode ? 'Backup Code' : 'Verification Code'}
        </label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => {
            const value = isBackupCode 
              ? e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 12)
              : e.target.value.replace(/\D/g, '').slice(0, 6);
            setVerificationCode(value);
          }}
          onKeyPress={handleKeyPress}
          placeholder={isBackupCode ? 'XXXX-XXXX-XXXX' : '123456'}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-center text-lg font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={isBackupCode ? 12 : 6}
          autoFocus
        />
      </div>

      <div className="mb-4">
        <button
          type="button"
          onClick={() => {
            setIsBackupCode(!isBackupCode);
            setVerificationCode('');
            setError('');
          }}
          className="text-sm text-blue-500 hover:text-blue-700 underline"
        >
          {isBackupCode 
            ? 'Use authenticator code instead'
            : 'Use backup code instead'
          }
        </button>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          onClick={verify2FA}
          disabled={isLoading || !isCodeValid}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        <p>
          Lost your device? Contact support for account recovery.
        </p>
      </div>
    </div>
  );
};

export default Verify2FA;
