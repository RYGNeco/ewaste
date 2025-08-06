import { sendEmail } from './emailService';
import User, { IUser } from '../models/User';

export class AdminNotificationService {
  
  /**
   * Send email notification to super admins about new account requests
   */
  static async notifyAdminsNewAccountRequest(user: IUser): Promise<void> {
    try {
      // Get all super admins
      const superAdmins = await User.find({ 
        userType: 'super_admin', 
        accountStatus: 'approved',
        isActive: true 
      });

      if (superAdmins.length === 0) {
        console.warn('⚠️ No super admins found to notify about new account request');
        return;
      }

      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const approveUrl = `${frontendUrl}/admin/approve-user/${user._id}`;
      const rejectUrl = `${frontendUrl}/admin/reject-user/${user._id}`;

      // Send email to each super admin
      const emailPromises = superAdmins.map(admin => 
        sendEmail({
          to: admin.email,
          subject: `🔔 New Account Request - ${user.firstName} ${user.lastName}`,
          template: 'new-account-request',
          data: {
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email,
            requestedRole: user.requestedRoles.join(', ') || 'Not specified',
            userType: user.userType || 'Not specified',
            registrationMethod: user.registrationMethod === 'google' ? 'Google OAuth' : 'Manual Registration',
            organization: user.organization || 'Not specified',
            requestDate: new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            approveUrl,
            rejectUrl
          }
        })
      );

      await Promise.all(emailPromises);
      console.log(`✅ Sent new account request notifications to ${superAdmins.length} super admin(s)`);
    } catch (error) {
      console.error('❌ Failed to send admin notifications:', error);
      throw error;
    }
  }

  /**
   * Send approval notification to user
   */
  static async notifyUserAccountApproved(user: IUser, approvedBy: IUser): Promise<void> {
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const loginUrl = `${frontendUrl}/login`;

      await sendEmail({
        to: user.email,
        subject: '🎉 Your Rygneco Account Has Been Approved!',
        template: 'account-approved',
        data: {
          firstName: user.firstName || user.name,
          email: user.email,
          role: user.role || 'User',
          userType: user.userType || 'employee',
          approvedBy: approvedBy.name,
          approvalDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          loginUrl
        }
      });

      console.log(`✅ Sent account approval notification to ${user.email}`);
    } catch (error) {
      console.error('❌ Failed to send approval notification:', error);
      throw error;
    }
  }

  /**
   * Send rejection notification to user
   */
  static async notifyUserAccountRejected(user: IUser, rejectionReason?: string): Promise<void> {
    try {
      await sendEmail({
        to: user.email,
        subject: 'Account Request Update - Rygneco E-Waste Tracker',
        template: 'account-rejected',
        data: {
          firstName: user.firstName || user.name,
          rejectionReason: rejectionReason || ''
        }
      });

      console.log(`✅ Sent account rejection notification to ${user.email}`);
    } catch (error) {
      console.error('❌ Failed to send rejection notification:', error);
      throw error;
    }
  }

  /**
   * Get pending account requests count
   */
  static async getPendingRequestsCount(): Promise<number> {
    try {
      return await User.countDocuments({ 
        accountStatus: 'pending',
        isActive: true 
      });
    } catch (error) {
      console.error('❌ Failed to get pending requests count:', error);
      return 0;
    }
  }

  /**
   * Get all pending account requests
   */
  static async getPendingRequests(limit: number = 50, skip: number = 0) {
    try {
      const requests = await User.find({ 
        accountStatus: 'pending',
        isActive: true 
      })
      .select('-password -twoFactorSecret -twoFactorBackupCodes')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

      const total = await this.getPendingRequestsCount();

      return {
        requests,
        total,
        hasMore: skip + limit < total
      };
    } catch (error) {
      console.error('❌ Failed to get pending requests:', error);
      throw error;
    }
  }

  /**
   * Get approval statistics
   */
  async getApprovalStatistics() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const [totalPending, totalApproved, totalRejected, todayRequests] = await Promise.all([
        User.countDocuments({ accountStatus: 'pending' }),
        User.countDocuments({ accountStatus: 'approved' }),
        User.countDocuments({ accountStatus: 'rejected' }),
        User.countDocuments({ 
          createdAt: { 
            $gte: today, 
            $lt: tomorrow 
          }
        })
      ]);

      return {
        totalPending,
        totalApproved,
        totalRejected,
        todayRequests
      };
    } catch (error) {
      console.error('Error getting approval statistics:', error);
      throw error;
    }
  }

  /**
   * Get approval history with pagination
   */
  async getApprovalHistory(options: {
    page: number;
    limit: number;
    status?: string;
  }) {
    try {
      const { page, limit, status } = options;
      const skip = (page - 1) * limit;
      
      let filter: any = {
        accountStatus: { $in: ['approved', 'rejected'] }
      };
      
      if (status && ['approved', 'rejected'].includes(status)) {
        filter.accountStatus = status;
      }

      const [users, total] = await Promise.all([
        User.find(filter)
          .select('firstName lastName email role userType accountStatus approvedAt rejectedAt createdAt')
          .sort({ updatedAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        User.countDocuments(filter)
      ]);

      return {
        users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      };
    } catch (error) {
      console.error('Error getting approval history:', error);
      throw error;
    }
  }

  /**
   * Get pending account requests (instance method)
   */
  async getPendingRequests(limit: number = 50, skip: number = 0) {
    return AdminNotificationService.getPendingRequests(limit, skip);
  }
}
