import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

interface GoogleAuthResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    userType: string;
    roleApprovalStatus: string;
  };
  message?: string;
}

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      
      try {
        // Try signing in first
        const response = await api.post<GoogleAuthResponse>('/auth/google-signin', {
          email: result.user.email,
          googleId: result.user.uid,
          name: result.user.displayName,
          photoURL: result.user.photoURL
        });

        // Successfully signed in
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');

      } catch (signInError: any) {
        // If error indicates user needs registration
        if (signInError.response?.data?.needsRegistration) {
          // Show registration form
          return {
            needsRegistration: true,
            email: result.user.email,
            name: result.user.displayName,
            photoURL: result.user.photoURL,
            uid: result.user.uid
          };
        } 
        
        // Handle account status responses
        if (signInError.response?.data?.accountStatus === 'pending') {
          navigate('/auth/pending-approval');
          return null;
        }
        
        if (signInError.response?.data?.accountStatus === 'rejected') {
          navigate('/auth/rejected');
          return null;
        }

        throw signInError;
      }

    } catch (error: any) {
      console.error('Google sign in error:', error);
      setError(error.response?.data?.error || error.message || 'Sign in failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async (registrationData: {
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    userType: string;
    requestedRole: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post<GoogleAuthResponse>('/auth/google-register', registrationData);

      if (response.data.success) {
        navigate('/auth/pending-approval');
      }

      return response.data;

    } catch (error: any) {
      console.error('Google registration error:', error);
      setError(error.response?.data?.error || error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleGoogleSignIn,
    handleGoogleRegister,
    isLoading,
    error
  };
};
