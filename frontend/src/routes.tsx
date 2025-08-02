import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { getAuth } from 'firebase/auth';

// Import pages from the new organized structure
import HomePage from './pages/public/HomePage';
import ContactPage from './pages/public/ContactPage';
import AboutUsPage from './pages/public/AboutUsPage';
import EducationPage from './pages/public/EducationPage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import JoinUsPage from './pages/public/JoinUsPage';
import AdminPage from './pages/admin/AdminPage';

// Lazy load authentication pages
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));

const isAuthenticated = () => {
  // Check for token in localStorage
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Also check Firebase auth state as backup
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      // If we have Firebase user but no token, get and store the token
      user.getIdToken().then(idToken => {
        localStorage.setItem('token', idToken);
      });
      return true;
    }
    return false;
  }
  
  return true;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  // Lazy load user dashboard
  const UserDashboard = React.lazy(() => import('./pages/user/UserDashboard'));

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

        {/* Protected User Dashboard Route */}
        <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

        {/* Protected Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/admin/*" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />

        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
