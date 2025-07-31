import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
  // Logout handler
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Optionally, redirect to login or home page
      navigate('/');
    } catch (err) {
      setError('Logout failed');
    }
  };
import '../firebase';

const Login = () => {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // ...existing code...
  const [user, setUser] = useState(null);
  // Listen for auth state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);
  // ...existing code...
  const navigate = useNavigate();
  // Google Sign-In handler
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // You can access user info and token here
      // const user = result.user;
      // const token = await user.getIdToken();
      setError('');
      // Redirect to dashboard after successful Google sign-in
      navigate('/dashboard');
    } catch (err) {
      setError('Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const endpoint = '/api/auth/login';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      console.log('Login response:', data); // Debug log
      if (res.ok && data.token) {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        setError('');
        // Redirect to dashboard or admin page
        if (isAdminLogin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
  };

  const toggleLoginMode = () => {
    setIsAdminLogin(!isAdminLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{isAdminLogin ? 'Administrator Login' : 'Client Login'}</h2>
        {loading && (
          <div className="flex justify-center items-center mb-4">
            <svg className="animate-spin h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="ml-2 text-green-600">Processing...</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">{isAdminLogin ? 'Admin Email' : 'Email Address'}</label>
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
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-3 flex items-center justify-center"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.18v2.98h5.27c-.23 1.24-1.39 3.65-5.27 3.65-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.02.77 3.72 1.43l2.54-2.47C16.13 4.7 14.04 3.7 11.82 3.7c-5.01 0-9.07 4.06-9.07 9.07s4.06 9.07 9.07 9.07c5.24 0 8.72-3.68 8.72-8.87 0-.59-.07-1.17-.17-1.67z"/></svg>
            Sign in with Google
          </button>
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don’t have an account? Create one:</span>
          <Link to="/register" className="ml-2 text-blue-600 hover:underline text-sm">Sign Up</Link>
        </div>
        {user && (
          <div className="mt-4 text-center">
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded w-full mt-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
        <div className="mt-6 text-center">
          {isAdminLogin ? (
            <button className="text-blue-600 hover:underline" onClick={toggleLoginMode}>Client Login</button>
          ) : (
            <>
              <span className="text-gray-600">Are you an administrator?</span>
              <button className="ml-2 text-blue-600 hover:underline" onClick={toggleLoginMode}>Admin Login</button>
            </>
          )}
        </div>
        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
