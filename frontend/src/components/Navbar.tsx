import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAuth, signOut, User } from 'firebase/auth';
import { 
  FaRecycle, 
  FaBars, 
  FaTimes, 
  FaChevronDown,
  FaUser,
  FaSignOutAlt,
  FaBuilding,
  FaUserTie
} from 'react-icons/fa';
import '../firebase';
import JoinUsDropdown from './navbar/JoinUsDropdown';
import ServicesDropdown from './navbar/ServicesDropdown';
import AboutDropdown from './navbar/AboutDropdown';

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownComponent?: React.ComponentType;
}

const navItems: NavItem[] = [
  {
    label: 'About',
    href: '/about-us',
    hasDropdown: true,
    dropdownComponent: AboutDropdown
  },
  {
    label: 'Services',
    href: '/services',
    hasDropdown: true,
    dropdownComponent: ServicesDropdown
  },
  {
    label: 'Join Us',
    href: '/join-us',
    hasDropdown: true,
    dropdownComponent: JoinUsDropdown
  },
  {
    label: 'Contact',
    href: '/contact'
  }
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMobileDropdown(null);
  }, [location]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      localStorage.removeItem('userData');
      setUserType(null);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const isAuthenticated = () => {
    return !!user || !!localStorage.getItem('token');
  };

  const getDashboardLink = () => {
    if (userType === 'employee') {
      return '/admin';
    } else if (userType === 'partner') {
      return '/dashboard';
    }
    return '/dashboard';
  };

  const toggleMobileDropdown = (label: string) => {
    setActiveMobileDropdown(activeMobileDropdown === label ? null : label);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <FaRecycle className="text-xl text-green-600" />
            <span className="text-lg font-bold text-gray-900">RYGNeco</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className="flex items-center gap-1 py-2 px-3 text-gray-700 hover:text-green-600 font-medium transition-colors text-sm"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                
                {/* Desktop Dropdown */}
                {item.hasDropdown && item.dropdownComponent && (
                  <div className="group">
                    <item.dropdownComponent />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons / User Menu - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated() ? (
              <div className="flex items-center gap-3">
                <Link
                  to={getDashboardLink()}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors text-sm"
                >
                  {userType === 'employee' ? (
                    <>
                      <FaUserTie className="text-sm" />
                      Dashboard
                    </>
                  ) : (
                    <>
                      <FaBuilding className="text-sm" />
                      Dashboard
                    </>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors text-sm"
                >
                  <FaSignOutAlt className="text-sm" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Always Visible on Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden block p-2 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className="py-3 border-t border-gray-200 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between">
                  <Link
                    to={item.href}
                    className="block py-2 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                    onClick={() => {
                      if (!item.hasDropdown) {
                        setIsMobileMenuOpen(false);
                        setActiveMobileDropdown(null);
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <button
                      onClick={() => toggleMobileDropdown(item.label)}
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      aria-label={`Toggle ${item.label} dropdown`}
                    >
                      <FaChevronDown 
                        className={`text-xs transition-transform duration-200 ${
                          activeMobileDropdown === item.label ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                  )}
                </div>
                
                {/* Mobile Dropdown */}
                {item.hasDropdown && (
                  <div className={`overflow-hidden transition-all duration-200 ${
                    activeMobileDropdown === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="bg-gray-50 ml-4 rounded-lg my-1">
                      <Link
                        to="/about-us"
                        className="block py-2 px-6 text-sm text-gray-600 hover:text-green-600 transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setActiveMobileDropdown(null);
                        }}
                      >
                        Our Mission
                      </Link>
                      <Link
                        to="/about-us#team"
                        className="block py-2 px-6 text-sm text-gray-600 hover:text-green-600 transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setActiveMobileDropdown(null);
                        }}
                      >
                        Meet The Team
                      </Link>
                      <Link
                        to="/about-us#values"
                        className="block py-2 px-6 text-sm text-gray-600 hover:text-green-600 transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setActiveMobileDropdown(null);
                        }}
                      >
                        Our Values
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="border-t border-gray-200 pt-3 mt-3">
              {isAuthenticated() ? (
                <div className="space-y-1">
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-2 py-2 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveMobileDropdown(null);
                    }}
                  >
                    {userType === 'employee' ? (
                      <>
                        <FaUserTie className="text-sm" />
                        Dashboard
                      </>
                    ) : (
                      <>
                        <FaBuilding className="text-sm" />
                        Dashboard
                      </>
                    )}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                      setActiveMobileDropdown(null);
                    }}
                    className="flex items-center gap-2 w-full py-2 px-4 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  >
                    <FaSignOutAlt className="text-sm" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    to="/login"
                    className="block py-2 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveMobileDropdown(null);
                    }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm text-center"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setActiveMobileDropdown(null);
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
