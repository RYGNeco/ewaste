import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRecycle, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaArrowUp,
  FaLeaf,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaArrowRight
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          {/* Column 1: Logo and Description */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <FaRecycle className="text-green-500 text-3xl mr-2" />
              <span className="text-xl font-bold">RYGNeco</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Leading the way in sustainable e-waste management solutions. Together, we can create a cleaner, greener future for our planet.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition duration-300">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition duration-300">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition duration-300">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition duration-300">
                <FaLinkedin />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition duration-300">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-gray-400 hover:text-green-500 transition duration-300 flex items-center">
                  <FaArrowRight className="mr-2 text-xs" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-green-500 transition duration-300 flex items-center">
                  <FaArrowRight className="mr-2 text-xs" /> Services
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-green-500 transition duration-300 flex items-center">
                  <FaArrowRight className="mr-2 text-xs" /> How It Works
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-gray-400 hover:text-green-500 transition duration-300 flex items-center">
                  <FaArrowRight className="mr-2 text-xs" /> Education
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-green-500 transition duration-300 flex items-center">
                  <FaArrowRight className="mr-2 text-xs" /> Contact Us
                </Link>
              </li>
              <li>
                <Link to="/join-us" className="text-gray-400 hover:text-green-500 transition duration-300 flex items-center">
                  <FaArrowRight className="mr-2 text-xs" /> Join Our Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Impact */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Our Impact</h3>
            <ul className="space-y-2">
              <li className="flex items-start mb-3">
                <FaLeaf className="text-green-500 mt-1 mr-2" />
                <div>
                  <span className="block text-white font-semibold">Environmental</span>
                  <span className="text-gray-400 text-sm">Reducing landfill waste and preventing toxic materials from harming ecosystems</span>
                </div>
              </li>
              <li className="flex items-start mb-3">
                <FaUsers className="text-green-500 mt-1 mr-2" />
                <div>
                  <span className="block text-white font-semibold">Community</span>
                  <span className="text-gray-400 text-sm">Creating jobs and supporting local economies through responsible recycling</span>
                </div>
              </li>
              <li className="flex items-start mb-3">
                <FaShieldAlt className="text-green-500 mt-1 mr-2" />
                <div>
                  <span className="block text-white font-semibold">Security</span>
                  <span className="text-gray-400 text-sm">Ensuring secure data destruction and privacy protection</span>
                </div>
              </li>
              <li className="flex items-start">
                <FaChartLine className="text-green-500 mt-1 mr-2" />
                <div>
                  <span className="block text-white font-semibold">Innovation</span>
                  <span className="text-gray-400 text-sm">Driving technological advances in recycling and resource recovery</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-green-500 mt-1 mr-3" />
                <span className="text-gray-400">123 Recycling Way, Green City, EC0 1WM</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-green-500 mt-1 mr-3" />
                <span className="text-gray-400">+44 (0) 123 456 7890</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-green-500 mt-1 mr-3" />
                <span className="text-gray-400">info@rygneco.com</span>
              </li>
              <li className="flex items-start">
                <FaClock className="text-green-500 mt-1 mr-3" />
                <div>
                  <span className="block text-gray-400">Monday - Friday: 9am - 6pm</span>
                  <span className="block text-gray-400">Saturday: 10am - 4pm</span>
                  <span className="block text-gray-400">Sunday: Closed</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Back to top button */}
        <div className="flex justify-center mb-8">
          <button 
            onClick={scrollToTop}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 transition duration-300 shadow-lg"
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} RYGNeco. All rights reserved. Making e-waste management sustainable, one device at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
