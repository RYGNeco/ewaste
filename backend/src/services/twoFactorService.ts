import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import crypto from 'crypto';
import User, { IUser } from '../models/User';
import { sendEmail } from './emailService';

export class TwoFactorService {
  private static readonly APP_NAME = 'Rygneco E-Waste Tracker';
  private static readonly BACKUP_CODE_LENGTH = 8;
  private static readonly BACKUP_CODE_COUNT = 10;

  /**
   * Generate a new 2FA secret for a user
   */
  static generateSecret(userEmail: string): string {
    return authenticator.generateSecret();
  }

  /**
   * Generate QR code for 2FA setup
   */
  static async generateQRCode(userEmail: string, secret: string): Promise<string> {
    const otpAuthUrl = authenticator.keyuri(
      userEmail,
      this.APP_NAME,
      secret
    );
    
    return qrcode.toDataURL(otpAuthUrl);
  }

  /**
   * Verify a TOTP token
   */
  static verifyToken(token: string, secret: string): boolean {
    try {
      // Clean the token (remove spaces)
      const cleanToken = token.replace(/\s/g, '');
      
      // Use authenticator.verify which supports window parameter
      return authenticator.verify({
        token: cleanToken,
        secret: secret
      });
    } catch (error) {
      console.error('2FA token verification error:', error);
      return false;
    }
  }

  /**
   * Generate backup codes for 2FA recovery
   */
  static generateBackupCodes(): string[] {
    const codes: string[] = [];
    for (let i = 0; i < this.BACKUP_CODE_COUNT; i++) {
      const code = crypto.randomBytes(this.BACKUP_CODE_LENGTH)
        .toString('hex')
        .toUpperCase()
        .match(/.{1,4}/g)
        ?.join('-') || '';
      codes.push(code);
    }
    return codes;
  }

  /**
   * Verify backup code
   */
  static async verifyBackupCode(userId: string, code: string): Promise<boolean> {
    try {
      const user = await User.findById(userId);
      if (!user || !user.twoFactorBackupCodes) {
        return false;
      }

      const codeIndex = user.twoFactorBackupCodes.indexOf(code.toUpperCase());
      if (codeIndex === -1) {
        return false;
      }

      // Remove used backup code
      user.twoFactorBackupCodes.splice(codeIndex, 1);
      await user.save();

      // Send notification about backup code usage
      await this.sendBackupCodeUsedNotification(user);

      return true;
    } catch (error) {
      console.error('Backup code verification error:', error);
      return false;
    }
  }

  /**
   * Enable 2FA for a user
   */
  static async enable2FA(userId: string, secret: string, token: string): Promise<{
    success: boolean;
    backupCodes?: string[];
    error?: string;
  }> {
    try {
      // Verify the token first
      if (!this.verifyToken(token, secret)) {
        return { success: false, error: 'Invalid verification code' };
      }

      const user = await User.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // Generate backup codes
      const backupCodes = this.generateBackupCodes();

      // Hash the backup codes before storing
      const hashedBackupCodes = backupCodes.map(code => 
        crypto.createHash('sha256').update(code).digest('hex')
      );

      // Update user with 2FA settings
      user.twoFactorEnabled = true;
      user.twoFactorSecret = secret;
      user.twoFactorBackupCodes = hashedBackupCodes;
      await user.save();

      // Send confirmation email
      await this.send2FAEnabledNotification(user);

      return { success: true, backupCodes };
    } catch (error) {
      console.error('Enable 2FA error:', error);
      return { success: false, error: 'Failed to enable 2FA' };
    }
  }

  /**
   * Disable 2FA for a user
   */
  static async disable2FA(userId: string, password: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // For security, require password confirmation or admin approval
      // This is a simplified version - in production, you'd verify the password

      user.twoFactorEnabled = false;
      user.twoFactorSecret = undefined;
      user.twoFactorBackupCodes = [];
      await user.save();

      // Send notification
      await this.send2FADisabledNotification(user);

      return { success: true };
    } catch (error) {
      console.error('Disable 2FA error:', error);
      return { success: false, error: 'Failed to disable 2FA' };
    }
  }

  /**
   * Check if user account is locked due to failed attempts
   */
  static isAccountLocked(user: IUser): boolean {
    return user.lockedUntil ? user.lockedUntil > new Date() : false;
  }

  /**
   * Handle failed login attempt
   */
  static async handleFailedAttempt(userId: string): Promise<void> {
    try {
      const user = await User.findById(userId);
      if (!user) return;

      user.loginAttempts = (user.loginAttempts || 0) + 1;

      // Lock account after 5 failed attempts for 30 minutes
      if (user.loginAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
        await this.sendAccountLockedNotification(user);
      }

      await user.save();
    } catch (error) {
      console.error('Handle failed attempt error:', error);
    }
  }

  /**
   * Reset login attempts after successful login
   */
  static async resetLoginAttempts(userId: string): Promise<void> {
    try {
      await User.findByIdAndUpdate(userId, {
        $unset: { loginAttempts: 1, lockedUntil: 1 },
        lastLoginAt: new Date()
      });
    } catch (error) {
      console.error('Reset login attempts error:', error);
    }
  }

  /**
   * Send 2FA enabled notification
   */
  private static async send2FAEnabledNotification(user: IUser): Promise<void> {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Two-Factor Authentication Enabled',
        template: '2fa-enabled',
        data: {
          name: user.name,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Send 2FA enabled notification error:', error);
    }
  }

  /**
   * Send 2FA disabled notification
   */
  private static async send2FADisabledNotification(user: IUser): Promise<void> {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Two-Factor Authentication Disabled',
        template: '2fa-disabled',
        data: {
          name: user.name,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Send 2FA disabled notification error:', error);
    }
  }

  /**
   * Send backup code used notification
   */
  private static async sendBackupCodeUsedNotification(user: IUser): Promise<void> {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Backup Code Used for Login',
        template: 'backup-code-used',
        data: {
          name: user.name,
          timestamp: new Date().toISOString(),
          remainingCodes: user.twoFactorBackupCodes.length
        }
      });
    } catch (error) {
      console.error('Send backup code used notification error:', error);
    }
  }

  /**
   * Send account locked notification
   */
  private static async sendAccountLockedNotification(user: IUser): Promise<void> {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Account Temporarily Locked',
        template: 'account-locked',
        data: {
          name: user.name,
          timestamp: new Date().toISOString(),
          unlockTime: user.lockedUntil?.toISOString()
        }
      });
    } catch (error) {
      console.error('Send account locked notification error:', error);
    }
  }
}
