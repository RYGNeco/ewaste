import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';

// Import pages from the new organized structure
import HomePage from './pages/public/HomePage';
import ContactPage from './pages/public/ContactPage';
import AboutUsPage from './pages/public/AboutUsPage';
import EducationPage from './pages/public/EducationPage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import JoinUsPage from './pages/public/JoinUsPage';
import AdminPage from './pages/admin/AdminPage';

// Lazy load authentication pages
const Login = React.lazy(() => import('./pages/auth/Login.jsx'));
const Register = React.lazy(() => import('./pages/auth/Register.jsx'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword.jsx'));

// TODO: Add proper authentication check
const isAuthenticated = () => {
  // Check for JWT token in localStorage
  const token = localStorage.getItem('token');
  return !!token;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/join-us" element={<JoinUsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />

        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
