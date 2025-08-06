// Performance Optimized Routes
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Lazy load components for better performance
const HomePage = lazy(() => import('../pages/public/HomePage'));
const AboutUsPage = lazy(() => import('../pages/public/AboutUsPage'));
const ContactPage = lazy(() => import('../pages/public/ContactPage'));
const HowItWorksPage = lazy(() => import('../pages/public/HowItWorksPage'));
const EducationPage = lazy(() => import('../pages/public/EducationPage'));
const JoinUsPage = lazy(() => import('../pages/public/JoinUsPage'));

// Auth pages
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const CompleteProfile = lazy(() => import('../pages/auth/CompleteProfile'));
<<<<<<< HEAD
=======
const PendingApproval = lazy(() => import('../pages/auth/PendingApproval'));
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
const RoleRejected = lazy(() => import('../pages/auth/RoleRejected'));

// Admin pages - these can be further split by features
const AdminPage = lazy(() => import('../pages/admin/AdminPage'));
const PartnerDashboard = lazy(() => import('../pages/partner/PartnerDashboard'));

// Loading component with better UX
const PageLoading: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="large" />
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

// Route wrapper with error boundary and suspense
const RouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary>
    <Suspense fallback={<PageLoading />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          <RouteWrapper>
            <HomePage />
          </RouteWrapper>
        } 
      />
      <Route 
        path="/about-us" 
        element={
          <RouteWrapper>
            <AboutUsPage />
          </RouteWrapper>
        } 
      />
      <Route 
        path="/contact" 
        element={
          <RouteWrapper>
            <ContactPage />
          </RouteWrapper>
        } 
      />
      <Route 
        path="/how-it-works" 
        element={
          <RouteWrapper>
            <HowItWorksPage />
          </RouteWrapper>
        } 
      />
      <Route 
        path="/education" 
        element={
          <RouteWrapper>
            <EducationPage />
          </RouteWrapper>
        } 
      />
      <Route 
        path="/join-us" 
        element={
          <RouteWrapper>
            <JoinUsPage />
          </RouteWrapper>
        } 
      />
      
      {/* Auth Routes */}
      <Route 
        path="/login" 
        element={
          <RouteWrapper>
            <Login />
          </RouteWrapper>
        } 
      />
      <Route 
        path="/register" 
        element={
          <RouteWrapper>
            <Register />
          </RouteWrapper>
        } 
      />
      <Route 
        path="/complete-profile" 
        element={
          <RouteWrapper>
            <CompleteProfile />
          </RouteWrapper>
        } 
      />
      <Route 
<<<<<<< HEAD
=======
        path="/pending-approval" 
        element={
          <RouteWrapper>
            <PendingApproval />
          </RouteWrapper>
        } 
      />
      <Route 
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
        path="/role-rejected" 
        element={
          <RouteWrapper>
            <RoleRejected />
          </RouteWrapper>
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/admin/*" 
        element={
          <RouteWrapper>
            <AdminPage />
          </RouteWrapper>
        } 
      />
      <Route 
        path="/partner-dashboard" 
        element={
          <RouteWrapper>
            <PartnerDashboard />
          </RouteWrapper>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <RouteWrapper>
            <PartnerDashboard />
          </RouteWrapper>
        } 
      />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
