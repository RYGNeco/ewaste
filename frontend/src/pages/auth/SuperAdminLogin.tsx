import React, { useState } from 'react';
import api from '../../utils/api';

const SuperAdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@rygneco.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      if (response && response.ok) {
        const data = await response.json();
        
        // Store authentication data
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem('userType', data.user.userType);

        setSuccess('Login successful! Token stored. You can now access role requests.');
        
        // Redirect to admin page after a short delay
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Login error: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const testRoleRequests = async () => {
    try {
      const response = await api.get('/role-requests/pending');
      
      if (response && response.ok) {
        const data = await response.json();
        alert(`Success! Found ${data.data?.length || 0} pending role requests.`);
      } else {
        alert('Failed to fetch role requests. Make sure you are logged in as Super Admin.');
      }
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Super Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Test authentication and role requests access
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@rygneco.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={testRoleRequests}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Test Role Requests API (after login)
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p><strong>Backend Server:</strong> http://localhost:5000</p>
          <p><strong>Frontend Server:</strong> http://localhost:3000</p>
          <p><strong>API Health Check:</strong> <a href="http://localhost:5000/api/health" target="_blank" className="text-blue-600">http://localhost:5000/api/health</a></p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
