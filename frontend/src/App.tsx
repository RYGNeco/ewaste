import AppRoutes from './routes';
import React from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};
export default App;
