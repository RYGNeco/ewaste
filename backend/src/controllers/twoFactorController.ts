import { Request, Response } from 'express';
import { TwoFactorService } from '../services/twoFactorService';
import User from '../models/User';
import { AuthenticatedRequest } from '../middleware/auth';

/**
 * Generate 2FA setup QR code
 */
export const setup2FA = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (user.twoFactorEnabled) {
      res.status(400).json({ error: '2FA is already enabled' });
      return;
    }

    // Generate secret
    const secret = TwoFactorService.generateSecret(user.email);
    // Generate QR code
    const qrCodeUrl = await TwoFactorService.generateQRCode(user.email, secret);

    res.json({
      success: true,
      secret,
      qrCodeUrl,
      message: 'Scan the QR code with your authenticator app and verify with a token'
    });
  } catch (error) {
    console.error('Setup 2FA error:', error);
    res.status(500).json({ error: 'Failed to setup 2FA' });
  }
};

/**
 * Enable 2FA with verification
 */
export const enable2FA = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { secret, token } = req.body;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!secret || !token) {
      res.status(400).json({ error: 'Secret and verification token are required' });    
      return;
    }

    const result = await TwoFactorService.enable2FA(userId, secret, token);

    if (!result.success) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.json({
      success: true,
      backupCodes: result.backupCodes,
      message: '2FA enabled successfully. Save your backup codes in a secure place.'
    });
  } catch (error) {
    console.error('Enable 2FA error:', error);
    res.status(500).json({ error: 'Failed to enable 2FA' });
  }
};

/**
 * Disable 2FA
 */
export const disable2FA = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { password } = req.body;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!password) {
      res.status(400).json({ error: 'Password confirmation is required' });
      return;
    }

    const result = await TwoFactorService.disable2FA(userId, password);

    if (!result.success) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.json({
      success: true,
      message: '2FA disabled successfully'
    });
  } catch (error) {
    console.error('Disable 2FA error:', error);
    res.status(500).json({ error: 'Failed to disable 2FA' });
  }
};

/**
 * Verify 2FA token during login
 */
export const verify2FA = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, token, isBackupCode } = req.body;

    if (!userId || !token) {
      res.status(400).json({ error: 'User ID and token are required' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (!user.twoFactorEnabled) {
      res.status(400).json({ error: '2FA is not enabled for this user' });
      return;
    }

    // Check if account is locked
    if (TwoFactorService.isAccountLocked(user)) {
      res.status(423).json({ 
        error: 'Account is temporarily locked due to failed attempts',
        lockedUntil: user.lockedUntil
      });
      return;
    }

    let isValid = false;

    if (isBackupCode) {
      // Verify backup code
      isValid = await TwoFactorService.verifyBackupCode(userId, token);
    } else {
      // Verify TOTP token
      if (!user.twoFactorSecret) {
        res.status(400).json({ error: '2FA secret not found' });
        return;
      }
      isValid = TwoFactorService.verifyToken(token, user.twoFactorSecret);
    }

    if (!isValid) {
      // Handle failed attempt
      await TwoFactorService.handleFailedAttempt(userId);
      res.status(400).json({ error: 'Invalid verification code' });
      return;
    }

    // Reset login attempts on successful verification
    await TwoFactorService.resetLoginAttempts(userId);

    res.json({
      success: true,
      message: '2FA verification successful'
    });
  } catch (error) {
    console.error('Verify 2FA error:', error);
    res.status(500).json({ error: 'Failed to verify 2FA' });
  }
};

/**
 * Get 2FA status
 */
export const get2FAStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = await User.findById(userId).select('twoFactorEnabled twoFactorBackupCodes');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      success: true,
      twoFactorEnabled: user.twoFactorEnabled || false,
      backupCodesCount: user.twoFactorBackupCodes?.length || 0
    });
  } catch (error) {
    console.error('Get 2FA status error:', error);
    res.status(500).json({ error: 'Failed to get 2FA status' });
  }
};

/**
 * Generate new backup codes
 */
export const generateBackupCodes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { password } = req.body;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!password) {
      res.status(400).json({ error: 'Password confirmation is required' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (!user.twoFactorEnabled) {
      res.status(400).json({ error: '2FA is not enabled' });
      return;
    }

    // Generate new backup codes
    const newBackupCodes = TwoFactorService.generateBackupCodes();
    
    // Hash and store them
    const hashedCodes = newBackupCodes.map(code => 
      require('crypto').createHash('sha256').update(code).digest('hex')
    );

    user.twoFactorBackupCodes = hashedCodes;
    await user.save();

    res.json({
      success: true,
      backupCodes: newBackupCodes,
      message: 'New backup codes generated. Save them in a secure place.'
    });
  } catch (error) {
    console.error('Generate backup codes error:', error);
    res.status(500).json({ error: 'Failed to generate backup codes' });
  }
};
