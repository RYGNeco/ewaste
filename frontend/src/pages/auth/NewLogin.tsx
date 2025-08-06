import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash, FaUser, FaBuilding, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  organization: string;
  selectedRole: string;
}

const NewLogin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<'employee' | 'partner'>('employee');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    organization: '',
    selectedRole: 'admin'
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showGoogleRegisterForm, setShowGoogleRegisterForm] = useState(false);
  const [googleUserData, setGoogleUserData] = useState<any>(null);

  const navigate = useNavigate();
  const auth = getAuth();

  const employeeRoles = ['admin', 'inventory_manager', 'transporter', 'coordinator'];
  const partnerRoles = ['partner'];

  const availableRoles = userType === 'employee' ? employeeRoles : partnerRoles;

  useEffect(() => {
    // Reset form when switching tabs
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      organization: '',
      selectedRole: userType === 'employee' ? 'admin' : 'partner'
    });
    setError('');
    setSuccessMessage('');
  }, [activeTab, userType]);

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

  const handleManualRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Validation
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('All fields are required');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (formData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        userType,
        requestedRole: formData.selectedRole,
        organization: formData.organization
      });

      setSuccessMessage('Account request submitted successfully! Please wait for admin approval.');
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        organization: '',
        selectedRole: userType === 'employee' ? 'admin' : 'partner'
      });

    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.response?.data?.error || error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Try to sign in first
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/google-signin`, {
          idToken,
          googleId: user.uid,
          email: user.email,
          name: user.displayName,
          profilePicture: user.photoURL,
          emailVerified: user.emailVerified
        });

        // If successful, user exists and is approved
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        if (response.data.requires2FA) {
          navigate('/auth/2fa');
        } else {
          navigate('/dashboard');
        }

      } catch (signInError: any) {
        // If user not found or needs registration
        if (signInError.response?.data?.needsRegistration || signInError.response?.data?.isNewUser) {
          // Show registration form for Google user
          setGoogleUserData({
            idToken,
            googleId: user.uid,
            email: user.email,
            name: user.displayName,
            profilePicture: user.photoURL
          });
          setShowGoogleRegisterForm(true);
        } else if (signInError.response?.data?.accountStatus === 'pending') {
          navigate('/auth/pending-approval');
        } else if (signInError.response?.data?.accountStatus === 'rejected') {
          navigate('/auth/rejected');
        } else {
          throw signInError;
        }
      }

    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.response?.data?.error || error.message || 'Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!googleUserData) {
        throw new Error('Google authentication data not found');
      }

      const response = await axios.post(`${API_BASE_URL}/auth/google-register`, {
        ...googleUserData,
        userType,
        requestedRole: formData.selectedRole,
        organization: formData.organization
      });

      setSuccessMessage('Account request submitted successfully! Please wait for admin approval.');
      setShowGoogleRegisterForm(false);
      setGoogleUserData(null);

    } catch (error: any) {
      console.error('Google registration error:', error);
      setError(error.response?.data?.error || error.message || 'Google registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-yellow-500';
    if (passwordStrength <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    return 'Strong';
  };

  if (showGoogleRegisterForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Complete Registration</h2>
            <p className="text-gray-600">Complete your account setup with Google</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleGoogleRegistration} className="space-y-4">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('employee')}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    userType === 'employee'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FaUser className="mx-auto mb-2" />
                  <span className="text-sm font-medium">Employee</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('partner')}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    userType === 'partner'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FaBuilding className="mx-auto mb-2" />
                  <span className="text-sm font-medium">Partner</span>
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Requested Role</label>
              <select
                name="selectedRole"
                value={formData.selectedRole}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                {availableRoles.map(role => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization (Optional)</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Your organization name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>Submit Request</span>
                  <FaArrowRight />
                </>
              )}
            </button>
          </form>

          <button
            onClick={() => {
              setShowGoogleRegisterForm(false);
              setGoogleUserData(null);
              setError('');
            }}
            className="w-full mt-4 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Branding */}
          <div className="lg:w-1/2 bg-gradient-to-br from-green-600 to-green-700 p-12 text-white">
            <div className="h-full flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">Rygneco</h1>
              <h2 className="text-2xl font-light mb-6">E-Waste Tracker</h2>
              <p className="text-green-100 mb-8">
                Join our platform to efficiently manage and track electronic waste disposal, 
                contributing to a more sustainable future.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  <span>Real-time inventory tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  <span>Comprehensive reporting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  <span>Secure access control</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Forms */}
          <div className="lg:w-1/2 p-12">
            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                  activeTab === 'login'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                  activeTab === 'signup'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                {successMessage}
              </div>
            )}

            {activeTab === 'login' ? (
              /* Sign In Form */
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h3>
                  <p className="text-gray-600">Sign in to your account</p>
                </div>

                {/* Google Sign In */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-blue-200 transition-colors duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                  ) : (
                    <>
                      <FaGoogle className="text-red-500" />
                      <span>Sign in with Google</span>
                    </>
                  )}
                </button>

                <div className="text-center text-sm text-gray-500">
                  Don't have an account? Use the "Create Account" tab above.
                </div>
              </div>
            ) : (
              /* Create Account Form */
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h3>
                  <p className="text-gray-600">Request access to the platform</p>
                </div>

                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType('employee')}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        userType === 'employee'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <FaUser className="mx-auto mb-2" />
                      <span className="text-sm font-medium">Employee</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('partner')}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        userType === 'partner'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <FaBuilding className="mx-auto mb-2" />
                      <span className="text-sm font-medium">Partner</span>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleManualRegistration} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{getPasswordStrengthText()}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requested Role</label>
                    <select
                      name="selectedRole"
                      value={formData.selectedRole}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      {availableRoles.map(role => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization (Optional)</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="Your organization name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <FaArrowRight />
                      </>
                    )}
                  </button>
                </form>

                {/* Or divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                {/* Google Sign Up */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-blue-200 transition-colors duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                  ) : (
                    <>
                      <FaGoogle className="text-red-500" />
                      <span>Sign up with Google</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLogin;
