import { Request, Response } from 'express';
import RoleRequest, { IRoleRequest } from '../models/RoleRequest';
import User, { IUser } from '../models/User';

// Get all pending role requests (Super Admin only)
export const getPendingRoleRequests = async (req: Request, res: Response) => {
  try {
    const requests = await RoleRequest.find({ status: 'pending' })
      .populate('employeeId', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: requests,
      count: requests.length
    });
  } catch (error) {
    console.error('Get pending role requests error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch pending role requests' 
    });
  }
};

// Get all role requests with filters
export const getAllRoleRequests = async (req: Request, res: Response) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const filter: any = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const requests = await RoleRequest.find(filter)
      .populate('employeeId', 'firstName lastName email')
      .populate('reviewedBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await RoleRequest.countDocuments(filter);

    res.json({
      success: true,
      data: requests,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get all role requests error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch role requests' 
    });
  }
};

// Approve role request (Super Admin only)
export const approveRoleRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    const { approvedRoles, notes } = req.body;
    const adminId = (req as any).user.id;

    const roleRequest = await RoleRequest.findById(requestId);
    if (!roleRequest) {
      return res.status(404).json({ 
        success: false, 
        error: 'Role request not found' 
      });
    }

    if (roleRequest.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        error: 'Role request has already been processed' 
      });
    }

    // Update role request
    roleRequest.status = 'approved';
    roleRequest.reviewedBy = adminId;
    roleRequest.reviewedAt = new Date();
    await roleRequest.save();

    // Update user
    const user = await User.findById(roleRequest.employeeId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    user.roleApprovalStatus = 'approved';
    user.approvedRoles = approvedRoles;
    user.role = approvedRoles[0]; // Set primary role
    user.status = 'active';
    user.approvedBy = adminId;
    user.approvedAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Role request approved successfully',
      data: {
        roleRequest,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          approvedRoles: user.approvedRoles,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Approve role request error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to approve role request' 
    });
  }
};

// Reject role request (Super Admin only)
export const rejectRoleRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    const { rejectionReason } = req.body;
    const adminId = (req as any).user.id;

    const roleRequest = await RoleRequest.findById(requestId);
    if (!roleRequest) {
      return res.status(404).json({ 
        success: false, 
        error: 'Role request not found' 
      });
    }

    if (roleRequest.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        error: 'Role request has already been processed' 
      });
    }

    // Update role request
    roleRequest.status = 'rejected';
    roleRequest.reviewedBy = adminId;
    roleRequest.reviewedAt = new Date();
    roleRequest.rejectionReason = rejectionReason;
    await roleRequest.save();

    // Update user
    const user = await User.findById(roleRequest.employeeId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    user.roleApprovalStatus = 'rejected';
    user.status = 'inactive';
    user.rejectionReason = rejectionReason;
    await user.save();

    res.json({
      success: true,
      message: 'Role request rejected successfully',
      data: {
        roleRequest,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          roleApprovalStatus: user.roleApprovalStatus
        }
      }
    });
  } catch (error) {
    console.error('Reject role request error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to reject role request' 
    });
  }
};

// Get role request statistics
export const getRoleRequestStats = async (req: Request, res: Response) => {
  try {
    const [pending, approved, rejected] = await Promise.all([
      RoleRequest.countDocuments({ status: 'pending' }),
      RoleRequest.countDocuments({ status: 'approved' }),
      RoleRequest.countDocuments({ status: 'rejected' })
    ]);

    const total = pending + approved + rejected;

    res.json({
      success: true,
      data: {
        pending,
        approved,
        rejected,
        total,
        pendingPercentage: total > 0 ? Math.round((pending / total) * 100) : 0,
        approvedPercentage: total > 0 ? Math.round((approved / total) * 100) : 0,
        rejectedPercentage: total > 0 ? Math.round((rejected / total) * 100) : 0
      }
    });
  } catch (error) {
    console.error('Get role request stats error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch role request statistics' 
    });
  }
};

// Get user's role request history
export const getUserRoleRequests = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const requests = await RoleRequest.find({ employeeId: userId })
      .populate('reviewedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    console.error('Get user role requests error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch user role requests' 
    });
  }
}; 