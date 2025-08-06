import AppRoutes from './routes';
import React from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const location = useLocation();
  
  // Check if current path is admin or partner-related
  const isAdminPage = location.pathname.startsWith('/admin') || 
                     location.pathname.startsWith('/dashboard') ||
                     location.pathname.startsWith('/partner-dashboard');
  
  const isPartnerPage = location.pathname.startsWith('/partner') ||
                       location.pathname.startsWith('/dashboard');

  return (
    <div className="App">
      {/* Only show navbar and footer on non-admin and non-partner pages */}
      {!isAdminPage && !isPartnerPage && <Navbar />}
      <main>
        <AppRoutes />
      </main>
      {!isAdminPage && !isPartnerPage && <Footer />}
    </div>
  );
};

export default App;
