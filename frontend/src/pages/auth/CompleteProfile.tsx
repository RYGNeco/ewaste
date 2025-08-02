import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIndustry, FaUsers, FaGlobe } from 'react-icons/fa';

const CompleteProfile: React.FC = () => {
  const [userType, setUserType] = useState<'employee' | 'partner'>('employee');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    // Employee fields
    requestedRoles: [] as string[],
    requestReason: '',
    // Partner fields
    organizationName: '',
    businessType: '',
    industry: '',
    employeeCount: '',
    website: '',
    // Address fields
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const employeeRoles = [
    { value: 'admin', label: 'Admin' },
    { value: 'inventory_manager', label: 'Inventory Manager' },
    { value: 'transporter', label: 'Transporter' },
    { value: 'coordinator', label: 'Coordinator' }
  ];

  const businessTypes = [
    'Corporation',
    'LLC',
    'Partnership',
    'Sole Proprietorship',
    'Non-Profit',
    'Government',
    'Educational Institution',
    'Other'
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Education',
    'Government',
    'Non-Profit',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role: string) => {
    setFormData(prev => ({
      ...prev,
      requestedRoles: prev.requestedRoles.includes(role)
        ? prev.requestedRoles.filter(r => r !== role)
        : [...prev.requestedRoles, role]
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('First name and last name are required');
      return false;
    }

    if (userType === 'employee') {
      if (formData.requestedRoles.length === 0) {
        setError('Please select at least one role');
        return false;
      }
    } else if (userType === 'partner') {
      if (!formData.organizationName || !formData.businessType || !formData.industry) {
        setError('Organization name, business type, and industry are required');
        return false;
      }
      if (!formData.street || !formData.city || !formData.state || !formData.zipCode) {
        setError('Complete address information is required');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        userType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        ...(userType === 'employee' && {
          requestedRoles: formData.requestedRoles,
          requestReason: formData.requestReason
        }),
        ...(userType === 'partner' && {
          organizationName: formData.organizationName,
          businessInfo: {
            businessType: formData.businessType,
            industry: formData.industry,
            employeeCount: parseInt(formData.employeeCount) || 0,
            website: formData.website
          },
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
          }
        })
      };

      const response = await fetch('/api/auth/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('userType', userType);
        localStorage.setItem('userData', JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          userType,
          ...(userType === 'employee' && {
            requestedRoles: formData.requestedRoles,
            roleApprovalStatus: 'pending'
          }),
          ...(userType === 'partner' && {
            organizationName: formData.organizationName,
            status: 'active'
          })
        }));

        // Redirect based on user type
        if (userType === 'employee') {
          navigate('/pending-approval');
        } else {
          navigate('/partner-dashboard');
        }
      } else {
        setError(data.error || 'Failed to complete profile');
      }
    } catch (error) {
      console.error('Complete profile error:', error);
      setError('Failed to complete profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
          <p className="text-gray-600">Please provide additional information to complete your registration</p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">I am a:</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setUserType('employee')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                userType === 'employee'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <FaUser className="text-2xl mx-auto mb-2" />
              <span className="font-medium">Employee</span>
              <p className="text-sm text-gray-600 mt-1">Join our team</p>
            </button>
            <button
              type="button"
              onClick={() => setUserType('partner')}
              className={`p-4 rounded-lg border-2 transition-colors ${
                userType === 'partner'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <FaBuilding className="text-2xl mx-auto mb-2" />
              <span className="font-medium">Partner</span>
              <p className="text-sm text-gray-600 mt-1">Business partner</p>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Employee-specific fields */}
          {userType === 'employee' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Request</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requested Roles *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {employeeRoles.map((role) => (
                      <label key={role.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.requestedRoles.includes(role.value)}
                          onChange={() => handleRoleChange(role.value)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{role.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Role Request
                  </label>
                  <textarea
                    name="requestReason"
                    value={formData.requestReason}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Please explain why you're requesting these roles..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Partner-specific fields */}
          {userType === 'partner' && (
            <>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type *
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select business type</option>
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Employees
                    </label>
                    <input
                      type="number"
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., 50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Completing...' : 'Complete Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile; 