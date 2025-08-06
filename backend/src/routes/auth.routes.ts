<<<<<<< HEAD
import express from 'express';
import {
  googleSignIn,
  completeProfileNew,
  getProfileStatus,
  getPendingRequests,
  approveUserAccount,
  rejectUserAccount,
  getApprovalStatus
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Google OAuth routes
router.post('/google-signin', googleSignIn);

// Profile management
router.post('/complete-profile', authenticateToken, completeProfileNew);
router.get('/profile-status', authenticateToken, getProfileStatus);

// Approval system routes
router.get('/pending-requests', authenticateToken, getPendingRequests);
router.post('/approve-account/:userId', authenticateToken, approveUserAccount);
router.post('/reject-account/:userId', authenticateToken, rejectUserAccount);
router.get('/approval-status', authenticateToken, getApprovalStatus);

export default router;
=======
export {};

>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
