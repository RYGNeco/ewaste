import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { AdminNotificationService } from '../services/adminNotificationService';

const router = express.Router();

/**
 * @route GET /api/admin/pending-requests
 * @desc Get all pending account requests with statistics
 * @access Super Admin only
 */
router.get('/pending-requests', authMiddleware, roleMiddleware(['super_admin']), async (req, res) => {
  try {
    console.log('Admin fetching pending requests');
    
    const adminNotificationService = new AdminNotificationService();
    
    // Get pending requests
    const pendingData = await AdminNotificationService.getPendingRequests();
    
    // Get statistics
    const stats = await adminNotificationService.getApprovalStatistics();
    
    res.status(200).json({
      success: true,
      message: 'Pending requests retrieved successfully',
      data: {
        pendingRequests: pendingData.requests,
        stats
      }
    });

  } catch (error: any) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending requests',
      error: error.message
    });
  }
});

/**
 * @route GET /api/admin/approval-history
 * @desc Get approval history with pagination
 * @access Super Admin only
 */
router.get('/approval-history', authMiddleware, roleMiddleware(['super_admin']), async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const adminNotificationService = new AdminNotificationService();
    const history = await adminNotificationService.getApprovalHistory({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      status: status as string
    });
    
    res.status(200).json({
      success: true,
      message: 'Approval history retrieved successfully',
      data: history
    });

  } catch (error: any) {
    console.error('Error fetching approval history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch approval history',
      error: error.message
    });
  }
});


/**
 * @route POST /api/admin/approve-user/:id
 * @desc Approve a pending user account
 * @access Super Admin only
 */
router.post('/approve-user/:id', authMiddleware, roleMiddleware(['super_admin']), async (req, res) => {
  try {
    const userId = req.params.id;
    const approverId = (req as any).user?.id;
    const user = await (await import('../models/User')).default.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.accountStatus = 'approved';
    user.roleApprovalStatus = 'approved';
    user.status = 'active';
    user.approvedBy = approverId;
    user.approvedAt = new Date();
    await user.save();
    // Notify user
    const approver = await (await import('../models/User')).default.findById(approverId);
    if (approver) {
      await AdminNotificationService.notifyUserAccountApproved(user, approver);
    } else {
      console.warn('Approver not found, skipping approval notification');
    }
    res.json({ success: true, message: 'User approved successfully', user });
  } catch (error: any) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Failed to approve user', details: error.message });
  }
});

/**
 * @route POST /api/admin/reject-user/:id
 * @desc Reject a pending user account
 * @access Super Admin only
 */
router.post('/reject-user/:id', authMiddleware, roleMiddleware(['super_admin']), async (req, res) => {
  try {
    const userId = req.params.id;
    const { rejectionReason } = req.body;
    const user = await (await import('../models/User')).default.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.accountStatus = 'rejected';
    user.roleApprovalStatus = 'rejected';
    user.status = 'inactive';
    user.rejectionReason = rejectionReason || 'Rejected by admin';
    await user.save();
    await AdminNotificationService.notifyUserAccountRejected(user, rejectionReason);
    res.json({ success: true, message: 'User rejected successfully', user });
  } catch (error: any) {
    console.error('Error rejecting user:', error);
    res.status(500).json({ error: 'Failed to reject user', details: error.message });
  }
});

export { router as adminRoutes };
