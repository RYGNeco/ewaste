import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import '../firebase';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      // Optionally show error
    }
  };

  return (
    <nav className="bg-white shadow py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-green-600 font-bold text-xl">Rygneco E-Waste Tracker</Link>
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
