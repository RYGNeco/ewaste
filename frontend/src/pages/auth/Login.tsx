import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash, FaUser, FaBuilding, FaEnvelope, FaLock, FaArrowRight, FaRecycle } from 'react-icons/fa';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        
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
      // Simulate API call
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user type and data
      localStorage.setItem('userType', registerType);
      localStorage.setItem('userData', JSON.stringify({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        status: registerType === 'employee' ? 'pending' : 'active',
        role: registerType === 'employee' ? formData.selectedRole.toLowerCase().replace(' ', '_') : 'partner'
      }));

      // Redirect based on user type
      if (registerType === 'employee') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Store user type and data
      localStorage.setItem('userType', loginType);
      localStorage.setItem('userData', JSON.stringify({
        email: result.user.email,
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
      console.error('Google sign-in error:', error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Store user type and data
      localStorage.setItem('userType', registerType);
      localStorage.setItem('userData', JSON.stringify({
        email: result.user.email,
        status: registerType === 'employee' ? 'pending' : 'active',
        role: registerType === 'employee' ? formData.selectedRole.toLowerCase().replace(' ', '_') : 'partner'
      }));

      // Redirect based on user type
      if (registerType === 'employee') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Google sign-up error:', error);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />
      
      <div className="pt-16 pb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to RYGNeco
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join us in building a sustainable future through responsible e-waste management
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'login'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab('signup')}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'signup'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  Create Account
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Left Side - Form */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                {activeTab === 'login' ? (
                  /* Login Form */
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back</h2>
                    
                    {/* User Type Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        I am a:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setLoginType('employee')}
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-300 ${
                            loginType === 'employee'
                              ? 'border-green-600 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-green-300 text-gray-600'
                          }`}
                        >
                          <FaUser className="text-sm" />
                          <span className="font-medium">Employee</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setLoginType('partner')}
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-300 ${
                            loginType === 'partner'
                              ? 'border-green-600 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-green-300 text-gray-600'
                          }`}
                        >
                          <FaBuilding className="text-sm" />
                          <span className="font-medium">Partner</span>
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            Sign In
                            <FaArrowRight className="text-sm" />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Google Sign In */}
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>
                      <button
                        onClick={handleGoogleSignIn}
                        className="w-full mt-4 flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FaGoogle className="text-red-500" />
                        <span className="font-medium text-gray-700">Google</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Signup Form */
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Account</h2>
                    
                    {/* User Type Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        I want to register as:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setRegisterType('employee')}
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-300 ${
                            registerType === 'employee'
                              ? 'border-green-600 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-green-300 text-gray-600'
                          }`}
                        >
                          <FaUser className="text-sm" />
                          <span className="font-medium">Employee</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRegisterType('partner')}
                          className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-300 ${
                            registerType === 'partner'
                              ? 'border-green-600 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-green-300 text-gray-600'
                          }`}
                        >
                          <FaBuilding className="text-sm" />
                          <span className="font-medium">Partner</span>
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="First name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Last name"
                          />
                        </div>
                      </div>

                      {registerType === 'partner' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Your company name"
                          />
                        </div>
                      )}

                      {registerType === 'employee' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role Request
                          </label>
                          <select
                            name="selectedRole"
                            value={formData.selectedRole}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          >
                            {employeeRoles.map(role => (
                              <option key={role} value={role}>{role}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Create a password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                        
                        {/* Password Strength Indicator */}
                        {formData.password && (
                          <div className="mt-2">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`h-1 flex-1 rounded-full transition-all ${
                                    level <= passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Password strength: {passwordStrength < 3 ? 'Weak' : passwordStrength < 4 ? 'Fair' : 'Strong'}
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Confirm your password"
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

                      <button
                        type="submit"
                        disabled={isLoading || formData.password !== formData.confirmPassword}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            Create Account
                            <FaArrowRight className="text-sm" />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Google Sign Up */}
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>
                      <button
                        onClick={handleGoogleSignUp}
                        className="w-full mt-4 flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FaGoogle className="text-red-500" />
                        <span className="font-medium text-gray-700">Google</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side - Info */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-xl p-8 text-white">
                <div className="h-full flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-6">
                    {activeTab === 'login' ? 'Welcome Back!' : 'Join Our Mission'}
                  </h2>
                  
                  {activeTab === 'login' ? (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <FaUser className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Employee Access</h3>
                          <p className="text-green-100 text-sm">
                            Access your role-based dashboard with inventory management, batch tracking, and analytics.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <FaBuilding className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Partner Portal</h3>
                          <p className="text-green-100 text-sm">
                            Request services, track your e-waste collection, and view your environmental impact.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <FaRecycle className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Sustainable Impact</h3>
                          <p className="text-green-100 text-sm">
                            Track your contribution to environmental sustainability and see real-time impact metrics.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <FaUser className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Join Our Team</h3>
                          <p className="text-green-100 text-sm">
                            Become part of our mission to create a sustainable future through responsible e-waste management.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <FaBuilding className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Partner With Us</h3>
                          <p className="text-green-100 text-sm">
                            Access our comprehensive e-waste solutions and contribute to environmental sustainability.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <FaRecycle className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Make a Difference</h3>
                          <p className="text-green-100 text-sm">
                            Every device recycled helps reduce environmental impact and creates a cleaner future.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <p className="text-green-100 text-sm">
                      By continuing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login; 