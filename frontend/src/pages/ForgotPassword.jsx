import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage('Password reset instructions sent to your email.');
        setError('');
        setLoading(false);
      } else {
        setError(data.error || 'Failed to send instructions');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to send instructions');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send Instructions'}
          </button>
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
          {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:underline text-sm">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
