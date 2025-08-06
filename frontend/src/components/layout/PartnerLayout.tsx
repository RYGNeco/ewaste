import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { FaSignOutAlt, FaUser, FaBell } from 'react-icons/fa';
import { getPartnerNavigationItemsForRole, PartnerNavigationItem } from '../../config/partnerNavigation';

interface PartnerLayoutProps {
  children: React.ReactNode;
  onNavigate?: (section: string) => void;
}

const PartnerLayout: React.FC<PartnerLayoutProps> = ({ children, onNavigate }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isNavCollapsed, setIsNavCollapsed] = useState(isMobile);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [navigationItems, setNavigationItems] = useState<PartnerNavigationItem[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      
      // Get navigation items based on user role
      const userRole = parsedUserData?.role;
      const items = getPartnerNavigationItemsForRole(userRole);
      setNavigationItems(items);
    }
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      localStorage.removeItem('userData');
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsNavCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16 flex items-center px-4 py-15 mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="text-lg font-semibold text-green-700 ml-4">Partner Portal</span>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg fixed left-0 h-full z-40 transform
        ${isMobile 
          ? `${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 top-16`
          : `${isNavCollapsed ? 'w-20' : 'w-64'} top-0`
        }
        transition-[width,transform] duration-200 ease-in-out overflow-hidden`}
      >
        {!isMobile && (
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            {!isNavCollapsed && (
              <span className="text-lg font-semibold text-green-700">Partner Portal</span>
            )}
            <button
              onClick={() => setIsNavCollapsed(!isNavCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        )}
        <nav className={`${isMobile ? 'mt-4' : 'mt-6'} px-2 flex flex-col h-full`}>
          <div className="flex-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.section)}
                  className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center justify-center">{item.icon}</span>
                  {(!isNavCollapsed || isMobile) && (
                    <span className="ml-3 font-medium">{item.title}</span>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Sidebar Logout Button (Mobile/Collapsed) */}
          {(isMobile || isNavCollapsed) && (
            <div className="mt-auto mb-4">
              {userData && (!isNavCollapsed || isMobile) && (
                <div className="px-4 py-2 mb-2 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-500 text-sm" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-700 truncate">
                        {userData?.companyName || userData?.firstName || 'Partner'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {userData?.role?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Partner'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 rounded-lg text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 transition-colors duration-200"
              >
                <FaSignOutAlt className="text-sm" />
                {(!isNavCollapsed || isMobile) && (
                  <span className="ml-3 font-medium">Logout</span>
                )}
              </button>
            </div>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out min-h-screen
        ${isMobile 
          ? 'ml-0 pt-16' 
          : `${isNavCollapsed ? 'ml-20' : 'ml-64'}`
        }`}
      >
        {/* Top Bar - Desktop */}
        <header 
          className={`h-16 bg-white shadow-sm fixed right-0 z-20 items-center justify-end px-6 gap-4
          ${isMobile ? 'hidden' : 'flex top-0'}
          ${!isMobile && (isNavCollapsed ? 'left-20' : 'left-64')}`}
        >
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none relative">
            <FaBell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Partner Profile and Logout */}
          <div className="flex items-center gap-3">
            {/* User Info */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 hidden md:flex">
              <FaUser className="text-gray-500 text-sm" />
              <span className="text-sm font-medium text-gray-700">
                {userData?.companyName || userData?.firstName || 'Partner'}
              </span>
              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                {userData?.role?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Partner'}
              </span>
            </div>
            
            {/* Profile Avatar */}
            <button className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium focus:outline-none hover:bg-green-200 transition-colors">
              {userData?.companyName?.charAt(0) || userData?.firstName?.charAt(0) || 'P'}
            </button>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 border border-red-200 hover:border-red-300 flex items-center gap-2 shadow-sm"
              title="Sign out of your account"
            >
              <FaSignOutAlt className="text-sm" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className={`${isMobile ? 'pt-8' : 'pt-24'} px-4 md:px-6 py-4 md:py-8`}>
          {children}
        </main>

        {/* Mobile menu backdrop */}
        {isMobile && isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PartnerLayout; 