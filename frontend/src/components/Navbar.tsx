import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 w-11/12 mx-auto bg-green-600 rounded-2xl shadow-lg px-4 py-3 md:px-6 max-w-7xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/placeholder.svg"
            alt="Rygneco Logo"
            className="h-8 w-auto mr-2"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <span className="font-bold text-white text-xl md:text-2xl">Rygneco</span>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-white hover:text-green-200 font-medium">
            Home
          </a>
          <a href="#about" className="text-white hover:text-green-200 font-medium">
            About
          </a>
          <a href="#services" className="text-white hover:text-green-200 font-medium">
            Services
          </a>
          <a href="#ceo" className="text-white hover:text-green-200 font-medium">
            Our CEO
          </a>
          <a href="#contact" className="text-white hover:text-green-200 font-medium">
            Contact
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-2">
          <div className="flex flex-col space-y-3">
            <a href="#home" className="text-white hover:text-green-200 font-medium">
              Home
            </a>
            <a href="#about" className="text-white hover:text-green-200 font-medium">
              About
            </a>
            <a href="#services" className="text-white hover:text-green-200 font-medium">
              Services
            </a>
            <a href="#ceo" className="text-white hover:text-green-200 font-medium">
              Our CEO
            </a>
            <a href="#contact" className="text-white hover:text-green-200 font-medium">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
