<<<<<<< HEAD
import React from 'react';
import AppRoutes from './routes';
import './styles/App.css';
=======
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
>>>>>>> 20352c1 (fix: update frontend App.tsx for login and protected route)

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [showProtected, setShowProtected] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Simulate API call
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      setToken(data.token);
      setError('');
    } else {
      setError(data.error || 'Invalid credentials');
      setToken('');
    }
  };

  return (
<<<<<<< HEAD
    <div className="App">
      <AppRoutes />
=======
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-2">Rygneco E-Waste Tracker</h1>
          <p className="text-gray-600">Professional E-Waste Management And Tracking System</p>
        </header>
        <main>
          <form onSubmit={handleLogin} className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded"
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
              />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {token && (
              <>
                <div className="mt-4 p-4 bg-green-50 rounded border border-green-200">
                  <p className="text-green-800">Welcome, {username}!<br />JWT: {token}</p>
                </div>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                  type="button"
                  onClick={() => setShowProtected(true)}
                >
                  Protected Page
                </button>
                {showProtected && (
                  <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
                    <p className="text-blue-800">Protected Content</p>
                  </div>
                )}
              </>
            )}
          </form>
        </main>
      </div>
>>>>>>> 20352c1 (fix: update frontend App.tsx for login and protected route)
    </div>
  );
};

export default App;
