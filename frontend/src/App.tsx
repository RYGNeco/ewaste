import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            Rygneco E-Waste Tracker
          </h1>
          <p className="text-gray-600">
            Professional E-Waste Management & Tracking System
          </p>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
                  <p className="text-gray-700">
                    Your Rygneco E-Waste Tracker is now running successfully!
                  </p>
                  <div className="mt-4 p-4 bg-green-50 rounded border border-green-200">
                    <p className="text-green-800">
                      ✅ Frontend: React with TypeScript and Tailwind CSS
                      <br />
                      ✅ Backend: Express.js with MongoDB
                      <br />✅ Development servers are ready
                    </p>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
