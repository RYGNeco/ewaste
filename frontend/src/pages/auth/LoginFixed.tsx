import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash, FaUser, FaBuilding, FaEnvelope, FaLock, FaArrowRight, FaRecycle } from 'react-icons/fa';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GoogleSignInButton from '../../components/auth/GoogleSignInButton';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginType, setLoginType] = useState<'employee' | 'partner'>('employee');
  const [registerType, setRegisterType] = useState<'employee' | 'partner'>('employee');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: '',
    selectedRole: 'Admin'
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const employeeRoles = ['Admin', 'Inventory Manager', 'Transporter', 'Coordinator'];

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userType = localStorage.getItem('userType');
        if (userType === 'employee') {
          navigate('/admin');
        } else if (userType === 'partner') {
          navigate('/dashboard');
        }
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Password strength calculation
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[a-z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For existing users, use the regular login API (you can implement this later)
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user type and data
      localStorage.setItem('userType', loginType);
      localStorage.setItem('userData', JSON.stringify({
        email: formData.email,
        status: 'active',
        role: loginType === 'employee' ? 'admin' : 'partner'
      }));

      // Redirect based on user type
      if (loginType === 'employee') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      if (passwordStrength < 3) {
        alert('Please choose a stronger password');
        return;
      }

      // Prepare registration data for the new approval system
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        userType: registerType === 'employee' ? 'employee' : 'individual',
        role: registerType === 'employee' ? formData.selectedRole.toLowerCase().replace(' ', '_') : 'individual_user',
        ...(registerType === 'partner' && { organization: formData.companyName })
      };

      // Call the new manual registration API
      const response = await axios.post(`${API_BASE_URL}/auth/manual-register`, registrationData);

      if (response.data.success) {
        // Store the token and user info
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Show success message and redirect to pending approval
        alert('✅ Registration successful! Your account is pending admin approval. Super admins have been notified and you will receive an email notification once approved.');
        navigate('/auth/pending-approval');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      alert('❌ Registration failed: ' + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (activeTab === 'signup') {
        // This is a registration with Google OAuth
        const userType = registerType === 'employee' ? 'employee' : 'individual';
        const role = userType === 'employee' ? formData.selectedRole.toLowerCase().replace(' ', '_') : 'individual_user';
        
        const registrationData = {
          googleId: result.user.uid,
          email: result.user.email,
          name: result.user.displayName || '',
          profilePicture: result.user.photoURL || '',
          userType,
          role,
          emailVerified: result.user.emailVerified
        };

        const response = await axios.post(`${API_BASE_URL}/auth/google-register`, registrationData);

        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          alert('✅ Google registration successful! Your account is pending admin approval. Super admins have been notified and you will receive an email notification once approved.');
          navigate('/auth/pending-approval');
        }
      } else {
        // This is a login attempt - use existing Google sign-in flow
        const loginData = {
          googleId: result.user.uid,
          email: result.user.email,
          name: result.user.displayName || '',
          profilePicture: result.user.photoURL || '',
          emailVerified: result.user.emailVerified
        };

        const response = await axios.post(`${API_BASE_URL}/auth/google-signin`, loginData);

        if (response.data.success) {
          const { user, token, requires2FA, needsProfileCompletion } = response.data;

          if (requires2FA) {
            localStorage.setItem('tempUserId', user.id);
            navigate('/2fa-verify', { state: { userId: user.id } });
            return;
          }

          if (token) {
            localStorage.setItem('token', token);
          }
          localStorage.setItem('user', JSON.stringify(user));

          // Check account approval status first
          if (user.accountStatus === 'pending') {
            navigate('/auth/pending-approval');
          } else if (user.accountStatus === 'rejected') {
            navigate('/auth/rejected');
          } else if (user.accountStatus === 'approved') {
            // Redirect based on completion and user type
            if (needsProfileCompletion) {
              navigate('/complete-profile');
            } else if (user.userType === 'super_admin') {
              navigate('/admin');
            } else if (user.userType === 'employee') {
              if (user.roleApprovalStatus === 'approved') {
                navigate('/admin');
              } else if (user.roleApprovalStatus === 'pending') {
                navigate('/pending-approval');
              } else {
                navigate('/role-rejected');
              }
            } else {
              navigate('/dashboard');
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      const errorMessage = error.response?.data?.message || 'Google Sign-In failed. Please try again.';
      alert('❌ Google Sign-In failed: ' + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FaRecycle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {activeTab === 'login' ? 'Welcome Back' : 'Join RYGNeco'}
            </h2>
            <p className="text-gray-600">
              {activeTab === 'login' 
                ? 'Sign in to your account to continue' 
                : 'Create your account - all new accounts require admin approval'
              }
            </p>
          </div>

          {/* Tab Switches */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'login'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'signup'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* User Type Selection */}
          <div className="space-y-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  if (activeTab === 'login') setLoginType('employee');
                  else setRegisterType('employee');
                }}
                className={`flex-1 flex items-center justify-center py-3 text-sm font-medium rounded-md transition-colors ${
                  (activeTab === 'login' ? loginType : registerType) === 'employee'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaUser className="mr-2" />
                Employee
              </button>
              <button
                onClick={() => {
                  if (activeTab === 'login') setLoginType('partner');
                  else setRegisterType('partner');
                }}
                className={`flex-1 flex items-center justify-center py-3 text-sm font-medium rounded-md transition-colors ${
                  (activeTab === 'login' ? loginType : registerType) === 'partner'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaBuilding className="mr-2" />
                Partner
              </button>
            </div>
          </div>

          {/* Google Sign In Button */}
          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaGoogle className="mr-3 text-red-500" />
              {activeTab === 'login' ? 'Sign in with Google' : 'Register with Google'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Forms */}
          <form onSubmit={activeTab === 'login' ? handleLogin : handleSignup} className="space-y-6">
            {activeTab === 'signup' && (
              <>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Role Selection for Employees */}
                {registerType === 'employee' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Requested Role
                    </label>
                    <select
                      name="selectedRole"
                      value={formData.selectedRole}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {employeeRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Company Name for Partners */}
                {registerType === 'partner' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your Company Name"
                    />
                  </div>
                )}
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaEnvelope className="inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaLock className="inline mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
              
              {/* Password Strength Indicator (only for signup) */}
              {activeTab === 'signup' && formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${getPasswordStrengthColor().replace('bg-', 'text-')}`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use 8+ characters with uppercase, lowercase, numbers, and symbols
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field (only for signup) */}
            {activeTab === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              ) : (
                <FaArrowRight className="mr-2" />
              )}
              {activeTab === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            {/* Additional Info for Signup */}
            {activeTab === 'signup' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h4 className="font-medium text-blue-900 mb-2">📋 Account Approval Process</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your account will be pending approval after registration</li>
                  <li>• Super admins will receive an immediate email notification</li>
                  <li>• You'll be notified via email once your account is approved</li>
                  <li>• Approved accounts get full access to the platform</li>
                </ul>
              </div>
            )}
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
