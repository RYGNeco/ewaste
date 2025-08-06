import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHomePage: React.FC = () => {
  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '3rem', marginBottom: '10px' }}>
          🌱 Rygneco E-Waste Tracker
        </h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.2rem' }}>
          Sustainable E-Waste Management Solutions
        </p>
      </header>

      <nav style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            to="/auth/new-login" 
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            🚀 New Registration System
          </Link>
          <Link 
            to="/login" 
            style={{
              backgroundColor: '#2ecc71',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            📱 Login
          </Link>
          <Link 
            to="/admin/approvals" 
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              padding: '12px 24px',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}
          >
            👑 Admin Dashboard
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>✅ Account Approval System</h2>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#34495e', marginBottom: '10px' }}>🎯 Features Implemented:</h3>
            <ul style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              <li>✅ Manual registration with email/password</li>
              <li>✅ Google OAuth registration</li>
              <li>✅ Super admin email notifications</li>
              <li>✅ Approval/rejection workflow</li>
              <li>✅ Pending approval status pages</li>
              <li>✅ Admin dashboard for managing requests</li>
            </ul>
          </div>
          
          <div style={{ 
            backgroundColor: '#e8f5e8', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid #27ae60'
          }}>
            <h4 style={{ color: '#27ae60', marginBottom: '10px' }}>🚀 Test the System:</h4>
            <p style={{ color: '#2c3e50', margin: 0 }}>
              1. Try the <strong>New Registration System</strong> to create an account<br/>
              2. Check that super admin receives email notifications<br/>
              3. Use the <strong>Admin Dashboard</strong> to approve/reject accounts
            </p>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>📧 Email Notification System</h2>
          <p style={{ color: '#7f8c8d', marginBottom: '15px' }}>
            <strong>Core Requirement:</strong> "Whenever someone makes request, super admin should receive that message via email"
          </p>
          <div style={{ 
            backgroundColor: '#fff3cd', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid #ffc107'
          }}>
            <p style={{ color: '#856404', margin: 0 }}>
              ✅ <strong>IMPLEMENTED:</strong> All new registrations (manual & Google OAuth) trigger immediate email notifications to super admins with complete user details and approval links.
            </p>
          </div>
        </div>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#95a5a6' }}>
        <p>© 2025 Rygneco E-Waste Tracker - Sustainable Technology Solutions</p>
      </footer>
    </div>
  );
};

export default SimpleHomePage;
