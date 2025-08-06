import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FiCopy, FiEye, FiEyeOff, FiCheck, FiAlertCircle } from 'react-icons/fi';

interface Setup2FAProps {
  onComplete: (backupCodes: string[]) => void;
  onCancel: () => void;
}

const Setup2FA: React.FC<Setup2FAProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const fetchQRCode = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/2fa/setup', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setQrCodeUrl(data.qrCodeUrl);
        setSecret(data.secret);
        setStep(2);
      } else {
        setError(data.error || 'Failed to setup 2FA');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const enable2FA = async () => {
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/2fa/enable', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          secret,
          token: verificationCode
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setBackupCodes(data.backupCodes);
        setStep(3);
      } else {
        setError(data.error || 'Invalid verification code');
      }
    } catch (err) {
      setError('Failed to enable 2FA');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAllBackupCodes = () => {
    const allCodes = backupCodes.join('\n');
    copyToClipboard(allCodes);
  };

  React.useEffect(() => {
    if (step === 1) {
      fetchQRCode();
    }
  }, [step]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Enable Two-Factor Authentication
        </h2>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          {[1, 2, 3].map((stepNum) => (
            <div
              key={stepNum}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step > stepNum ? <FiCheck size={16} /> : stepNum}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2 text-red-700">
          <FiAlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {step === 1 && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up 2FA...</p>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Scan QR Code
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Use your authenticator app (Google Authenticator, Authy, etc.) to scan this QR code:
            </p>
            
            {qrCodeUrl && (
              <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                <QRCodeSVG value={qrCodeUrl} size={200} />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter this code manually:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type={showSecret ? 'text' : 'password'}
                value={secret}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                {showSecret ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(secret)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <FiCopy size={16} />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter verification code from your app:
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-center text-lg font-mono tracking-wider"
              maxLength={6}
            />
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
              onClick={enable2FA}
              disabled={isLoading || verificationCode.length !== 6}
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Enable 2FA'}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck size={32} className="text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              2FA Enabled Successfully!
            </h3>
            <p className="text-sm text-gray-600">
              Save these backup codes in a secure place. You can use them to access your account if you lose your authenticator device.
            </p>
          </div>

          <div className="mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">Backup Codes</h4>
                <button
                  onClick={copyAllBackupCodes}
                  className="text-sm text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                >
                  <FiCopy size={14} />
                  <span>Copy All</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {backupCodes.map((code, index) => (
                  <div
                    key={index}
                    className="bg-white px-2 py-1 border border-gray-200 rounded text-sm font-mono text-center"
                  >
                    {code}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-red-600 mt-2">
              ⚠️ Store these codes safely. Each code can only be used once.
            </p>
          </div>

          <button
            onClick={() => onComplete(backupCodes)}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Setup2FA;
