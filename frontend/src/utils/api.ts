// API configuration and utility functions
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  // Default headers
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  // Merge headers
  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Include cookies for authentication
  };

  try {
    const response = await fetch(url, config);
    
    // If unauthorized, clear storage and redirect to login
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      localStorage.removeItem('userData');
      window.location.href = '/login';
      return null;
    }

    return response;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Convenience methods
export const api = {
  get: (endpoint: string, options: RequestInit = {}) => 
    apiCall(endpoint, { ...options, method: 'GET' }),
    
  post: (endpoint: string, data?: any, options: RequestInit = {}) => 
    apiCall(endpoint, { 
      ...options, 
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined 
    }),
    
  put: (endpoint: string, data?: any, options: RequestInit = {}) => 
    apiCall(endpoint, { 
      ...options, 
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined 
    }),
    
  delete: (endpoint: string, options: RequestInit = {}) => 
    apiCall(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
