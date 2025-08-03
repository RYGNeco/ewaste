import express from 'express';
import passport from 'passport';
import {
  oauthCallback,
  completeProfile,
  getCurrentUser,
  logout,
  login
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  oauthCallback
);

// Profile completion after Google OAuth
router.post('/complete-profile', completeProfile);

// Get current user info
router.get('/me', authenticateToken, getCurrentUser);

// Logout
router.post('/logout', logout);

// Legacy login (for non-Google auth)
router.post('/login', login);

export default router;
