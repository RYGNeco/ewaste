import express from 'express';
import passport from 'passport';
import {
  oauthCallback,
  completeProfile,
  getCurrentUser,
  logout,
  login,
  googleSignIn,
  completeProfileNew,
  getProfileStatus
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Google OAuth routes (legacy)
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  oauthCallback
);

// New Firebase Google Auth endpoint
router.post('/google-signin', googleSignIn);

// Profile completion endpoints
router.post('/complete-profile', completeProfile); // Legacy
router.post('/complete-profile-new', authenticateToken, completeProfileNew); // New

// Profile status check
router.get('/profile-status', authenticateToken, getProfileStatus);

// Get current user info
router.get('/me', authenticateToken, getCurrentUser);

// Logout
router.post('/logout', logout);

// Legacy login (for non-Google auth)
router.post('/login', login);

export default router;
