import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/public/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompleteProfile from './pages/auth/CompleteProfile';
import PendingApproval from './pages/auth/PendingApproval';
import RoleRejected from './pages/auth/RoleRejected';
import SuperAdminLogin from './pages/auth/SuperAdminLogin';
import TwoFactorPage from './pages/auth/TwoFactorPage';
import SecurityPage from './pages/auth/SecurityPage';
import AdminPage from './pages/admin/AdminPage';
import PartnerDashboard from './pages/partner/PartnerDashboard';
import PartnerPage from './pages/partner/PartnerPage';
import PartnerAuthGuard from './components/partner/PartnerAuthGuard';
import AboutUsPage from './pages/public/AboutUsPage';
import ContactPage from './pages/public/ContactPage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import EducationPage from './pages/public/EducationPage';
import JoinUsPage from './pages/public/JoinUsPage';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';
import ServicesPage from './pages/public/ServicePage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/join-us" element={<JoinUsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/admin-login" element={<SuperAdminLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      {/* <Route path="/pending-approval" element={<PendingApproval />} /> */}
      <Route path="/role-rejected" element={<RoleRejected />} />
      <Route path="/2fa-verify" element={<TwoFactorPage />} />
      <Route path="/security" element={<SecurityPage />} />
      
      {/* Protected Routes */}
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/admin/approvals" element={<SuperAdminDashboard />} />
      <Route 
        path="/partner/*" 
        element={
          <PartnerAuthGuard>
            <PartnerPage />
          </PartnerAuthGuard>
        } 
      />
      <Route path="/partner-dashboard" element={<PartnerDashboard />} />
      <Route 
        path="/dashboard" 
        element={
          <PartnerAuthGuard>
            <PartnerPage />
          </PartnerAuthGuard>
        } 
      />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
