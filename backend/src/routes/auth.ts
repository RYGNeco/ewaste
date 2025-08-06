import express from 'express';
import passport from 'passport';
import {
  oauthCallback,
  completeProfile,
  getCurrentUser,
  logout,
<<<<<<< HEAD
  login,
  googleSignIn,
  completeProfileNew,
  getProfileStatus,
  complete2FALogin,
  manualRegister,
  googleRegister,
  getPendingRequests,
  approveUserAccount,
  rejectUserAccount,
  getApprovalStatus
=======
  login
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

<<<<<<< HEAD
// Google OAuth routes (legacy)
=======
// Google OAuth routes
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  oauthCallback
);

<<<<<<< HEAD
// New Firebase Google Auth endpoint
router.post('/google-signin', googleSignIn);

// Complete 2FA login process
router.post('/complete-2fa-login', complete2FALogin);

// Profile completion endpoints
router.post('/complete-profile', completeProfile); // Legacy
router.post('/complete-profile-new', authenticateToken, completeProfileNew); // New

// Profile status check
router.get('/profile-status', authenticateToken, getProfileStatus);
=======
// Profile completion after Google OAuth
router.post('/complete-profile', completeProfile);
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86

// Get current user info
router.get('/me', authenticateToken, getCurrentUser);

// Logout
router.post('/logout', logout);

// Legacy login (for non-Google auth)
router.post('/login', login);

<<<<<<< HEAD
// Registration endpoints
router.post('/register', manualRegister);
router.post('/manual-register', manualRegister);
router.post('/google-register', googleRegister);

// Account approval endpoints (Super Admin only)
router.get('/pending-requests', authenticateToken, getPendingRequests);
router.post('/approve-user/:userId', authenticateToken, approveUserAccount);
router.post('/reject-user/:userId', authenticateToken, rejectUserAccount);

// Check approval status
router.get('/approval-status', authenticateToken, getApprovalStatus);

=======
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
export default router;
