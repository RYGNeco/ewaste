<<<<<<< HEAD
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  data?: Record<string, any>;
}

export class EmailService {
  private static transporter: nodemailer.Transporter;

  static initialize() {
    // Configure email transporter
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log('✅ Email service initialized');
  }

  static async sendEmail(options: EmailOptions): Promise<void> {
    try {
      if (!this.transporter) {
        this.initialize();
      }

      const html = this.getEmailTemplate(options.template, options.data);

      const mailOptions = {
        from: `"${process.env.APP_NAME || 'Rygneco E-Waste Tracker'}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        html: html,
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${options.to}: ${options.subject}`);
    } catch (error) {
      console.error('❌ Email sending error:', error);
      throw error;
    }
  }

  private static getEmailTemplate(template: string, data: Record<string, any> = {}): string {
    // Try to load template from file first
    try {
      const templatePath = path.join(__dirname, '..', 'templates', 'email', `${template}.html`);
      if (fs.existsSync(templatePath)) {
        let templateContent = fs.readFileSync(templatePath, 'utf8');
        
        // Simple template replacement (you can use a more sophisticated template engine like Handlebars)
        Object.keys(data).forEach(key => {
          const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
          templateContent = templateContent.replace(regex, data[key] || '');
        });
        
        // Handle conditional blocks for rejectionReason
        if (template === 'account-rejected') {
          if (data.rejectionReason) {
            templateContent = templateContent.replace(/\{\{#rejectionReason\}\}([\s\S]*?)\{\{\/rejectionReason\}\}/g, '$1');
          } else {
            templateContent = templateContent.replace(/\{\{#rejectionReason\}\}[\s\S]*?\{\{\/rejectionReason\}\}/g, '');
          }
        }
        
        return templateContent;
      }
    } catch (error) {
      console.warn(`Failed to load template file ${template}.html:`, error);
    }

    // Fallback to hardcoded templates
    const templates: Record<string, string> = {
      '2fa-enabled': `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Two-Factor Authentication Enabled</h2>
          <p>Hello ${data.name},</p>
          <p>Two-factor authentication has been successfully enabled on your Rygneco E-Waste Tracker account.</p>
          <p><strong>When:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
          <p>Your account is now more secure. You'll need to provide a verification code from your authenticator app each time you sign in.</p>
          <p>If you didn't enable this feature, please contact our support team immediately.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated message from Rygneco E-Waste Tracker.</p>
        </div>
      `,
      '2fa-disabled': `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Two-Factor Authentication Disabled</h2>
          <p>Hello ${data.name},</p>
          <p>Two-factor authentication has been disabled on your Rygneco E-Waste Tracker account.</p>
          <p><strong>When:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
          <p style="color: #dc2626;"><strong>⚠️ Security Notice:</strong> Your account is now less secure without 2FA.</p>
          <p>If you didn't disable this feature, please contact our support team immediately and consider re-enabling 2FA.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated message from Rygneco E-Waste Tracker.</p>
        </div>
      `,
      'backup-code-used': `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">Backup Code Used</h2>
          <p>Hello ${data.name},</p>
          <p>A backup code was used to access your Rygneco E-Waste Tracker account.</p>
          <p><strong>When:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
          <p><strong>Remaining backup codes:</strong> ${data.remainingCodes}</p>
          ${data.remainingCodes <= 2 ? 
            '<p style="color: #dc2626;"><strong>⚠️ Warning:</strong> You have very few backup codes remaining. Consider generating new ones.</p>' : 
            ''}
          <p>If this wasn't you, please secure your account immediately by changing your password and reviewing your 2FA settings.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated message from Rygneco E-Waste Tracker.</p>
        </div>
      `,
      'account-locked': `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Account Temporarily Locked</h2>
          <p>Hello ${data.name},</p>
          <p>Your Rygneco E-Waste Tracker account has been temporarily locked due to multiple failed login attempts.</p>
          <p><strong>Locked at:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
          <p><strong>Unlock time:</strong> ${new Date(data.unlockTime).toLocaleString()}</p>
          <p>This is a security measure to protect your account. The lock will be automatically removed after 30 minutes.</p>
          <p>If you believe this is an error or if you didn't attempt to log in, please contact our support team.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated message from Rygneco E-Waste Tracker.</p>
        </div>
      `,
      'login-notification': `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">New Login Detected</h2>
          <p>Hello ${data.name},</p>
          <p>A new login to your Rygneco E-Waste Tracker account was detected.</p>
          <p><strong>When:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
          <p><strong>IP Address:</strong> ${data.ipAddress}</p>
          <p><strong>User Agent:</strong> ${data.userAgent}</p>
          <p>If this was you, no action is needed. If you don't recognize this login, please secure your account immediately.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated message from Rygneco E-Waste Tracker.</p>
        </div>
      `
    };

    return templates[template] || `<p>Template not found: ${template}</p>`;
  }
}

// Convenience function
export const sendEmail = (options: EmailOptions): Promise<void> => {
  return EmailService.sendEmail(options);
};
=======
// This file will be implemented in the future
export {};
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
