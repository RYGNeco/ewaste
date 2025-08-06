import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import AuthAction from '../pages/auth/AuthAction';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/action" element={<AuthAction />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
