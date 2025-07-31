import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('personal');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, accountType })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setError('');
        setLoading(false);
        // Example: navigate('/login');
      } else {
        setError(data.error || 'Registration failed');
        setLoading(false);
      }
    } catch (err) {
      setError('Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <span className="block text-gray-700 mb-2">Account Type</span>
            <label className="mr-4">
              <input
                type="radio"
                name="accountType"
                value="personal"
                checked={accountType === 'personal'}
                onChange={() => setAccountType('personal')}
              /> Personal Account
            </label>
            <label>
              <input
                type="radio"
                name="accountType"
                value="company"
                checked={accountType === 'company'}
                onChange={() => setAccountType('company')}
              /> Company Account
            </label>
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
