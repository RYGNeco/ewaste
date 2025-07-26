import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

/**
 * Application routes
 * This file will be populated as we implement various pages
 */
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Additional routes will be added here as components are developed */}
    </Routes>
  );
};

export default AppRoutes;
