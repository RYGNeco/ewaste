import express from 'express';
import {
  setup2FA,
  enable2FA,
  disable2FA,
  verify2FA,
  get2FAStatus,
  generateBackupCodes
} from '../controllers/twoFactorController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All 2FA routes require authentication
router.use(authenticateToken);

// Get 2FA status
router.get('/status', get2FAStatus as express.RequestHandler);

// Setup 2FA (get QR code)
router.post('/setup', setup2FA as express.RequestHandler);

// Enable 2FA with verification
router.post('/enable', enable2FA as express.RequestHandler);

// Disable 2FA
router.post('/disable', disable2FA as express.RequestHandler);

// Verify 2FA token (used during login)
router.post('/verify', verify2FA as express.RequestHandler);

// Generate new backup codes
router.post('/backup-codes', generateBackupCodes as express.RequestHandler);

export default router;
