import AppRoutes from './routes';
import React from "react";
<<<<<<< HEAD

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};
=======
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

>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
export default App;
