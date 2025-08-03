import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRecycle, 
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaArrowRight
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <FaRecycle className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                RYGNeco
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering responsible e-waste recycling for a cleaner, greener future. Join us in making a difference, one device at a time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-white/90">Quick Links</h3>
            <div className="space-y-4">
              <a href="#our-story" className="block text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Our Story
              </a>
              <a href="#meet-the-team" className="block text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Meet The Team
              </a>
              <a href="#our-values" className="block text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Our Values
              </a>
              <a href="#what-we-do" className="block text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> What We Do
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-white/90">Services</h3>
            <div className="space-y-4">
              <Link to="/how-it-works" className="block text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> How It Works
              </Link>
              <Link to="/education" className="block text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Education
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Contact Us
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-white/90">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest updates on sustainable e-waste management.</p>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                />
                <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
        
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
