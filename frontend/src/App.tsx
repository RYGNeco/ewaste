import AppRoutes from './routes';
import React, { useState } from "react";
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";

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
    <div className="App">
      <Navbar />
      <AppRoutes />
    </div>
  );
};
export default App;
