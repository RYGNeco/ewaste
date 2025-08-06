// Enhanced Auth Service with Google Sign-In and Profile Completion
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  User as FirebaseUser 
} from 'firebase/auth';
import api from '../utils/api';
import '../firebase'; // Initialize Firebase

export interface User {
  id: string;
  googleId?: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  userType?: 'employee' | 'partner' | 'super_admin';
  role?: string;
  roleApprovalStatus?: 'pending' | 'approved' | 'rejected';
  organization?: string;
  phone?: string;
  profileCompleted: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GoogleSignInResult {
  user: User;
  isNewUser: boolean;
  needsProfileCompletion: boolean;
  token: string;
}

export interface ProfileCompletionData {
  userType: 'employee' | 'partner';
  firstName: string;
  lastName: string;
  phone?: string;
  organization?: string; // Required for partners
  requestedRoles?: string[]; // For employees
  businessType?: string; // For partners
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

class AuthService {
  private auth = getAuth();
  private googleProvider = new GoogleAuthProvider();

  constructor() {
    // Configure Google provider
    this.googleProvider.addScope('email');
    this.googleProvider.addScope('profile');
    this.googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
  }

  // Google Sign-In Flow
  async signInWithGoogle(): Promise<GoogleSignInResult> {
    try {
      console.log('🔑 Starting Google sign-in...');
      
      // Step 1: Authenticate with Google
      const result = await signInWithPopup(this.auth, this.googleProvider);
      const firebaseUser = result.user;
      
      if (!firebaseUser) {
        throw new Error('No user returned from Google sign-in');
      }

      console.log('✅ Google authentication successful');

      // Step 2: Get ID token for backend authentication
      const idToken = await firebaseUser.getIdToken();
      
      // Step 3: Send to backend for processing
      const response = await api.post('/auth/google-signin', {
        idToken,
        googleId: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        profilePicture: firebaseUser.photoURL,
        emailVerified: firebaseUser.emailVerified
      });

      if (!response || !response.ok) {
        throw new Error('Backend authentication failed');
      }

      const data = await response.json();
      
      // Step 4: Store authentication data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('userType', data.user.userType || '');

      console.log('✅ Backend authentication successful');

      return {
        user: data.user,
        isNewUser: data.isNewUser,
        needsProfileCompletion: !data.user.profileCompleted,
        token: data.token
      };

    } catch (error) {
      console.error('❌ Google sign-in error:', error);
      throw error;
    }
  }

  // Complete Profile After Google Sign-In
  async completeProfile(profileData: ProfileCompletionData): Promise<User> {
    try {
      console.log('📝 Completing user profile...');

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await api.post('/auth/complete-profile-new', profileData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response || !response.ok) {
        let errorMessage = 'Failed to complete profile';
        if (response) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch {
            // Ignore JSON parsing errors
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Update stored user data
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('userType', data.user.userType);

      console.log('✅ Profile completion successful');
      return data.user;

    } catch (error) {
      console.error('❌ Profile completion error:', error);
      throw error;
    }
  }

  // Traditional Email/Password Sign-In (existing)
  async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (!response || !response.ok) {
        throw new Error('Email login failed');
      }

      const data = await response.json();
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('userType', data.user.userType || '');

      return data.user;

    } catch (error) {
      console.error('❌ Email sign-in error:', error);
      throw error;
    }
  }

  // Check Profile Completion Status
  async checkProfileStatus(): Promise<{
    profileCompleted: boolean;
    needsApproval: boolean;
    user: User;
  }> {
    try {
      const response = await api.get('/auth/profile-status');
      
      if (!response || !response.ok) {
        throw new Error('Failed to check profile status');
      }

      return await response.json();

    } catch (error) {
      console.error('❌ Profile status check error:', error);
      throw error;
    }
  }

  // Get Current User
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get('/auth/me');
      
      if (!response || !response.ok) {
        return null;
      }

      const data = await response.json();
      return data.user;

    } catch (error) {
      console.error('❌ Get current user error:', error);
      return null;
    }
  }

  // Sign Out
  async signOut(): Promise<void> {
    try {
      // Sign out from Firebase
      await firebaseSignOut(this.auth);
      
      // Call backend logout
      await api.post('/auth/logout');
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('userType');

      console.log('✅ Sign-out successful');

    } catch (error) {
      console.error('❌ Sign-out error:', error);
      // Clear local storage even if backend call fails
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('userType');
    }
  }

  // Get stored user data
  getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get user type
  getUserType(): string | null {
    return localStorage.getItem('userType');
  }
}

export default new AuthService();
