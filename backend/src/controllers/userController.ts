import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

// Get all users with optional filters
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { userType, roleApprovalStatus, status, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter: any = {};
    
    if (userType) {
      filter.userType = userType;
    }
    
    if (roleApprovalStatus) {
      filter.roleApprovalStatus = roleApprovalStatus;
    }
    
    if (status) {
      filter.status = status;
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Execute query with pagination
    const users = await User.find(filter)
      .select('-__v')
      .populate('approvedBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      data: users,
      pagination: {
        current: Number(page),
        total: Math.ceil(total / Number(limit)),
        count: users.length,
        totalRecords: total
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select('-__v')
      .populate('approvedBy', 'firstName lastName email');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    });
  }
};

// Update user role (Super Admin only)
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const adminId = (req as any).user.id;

    // Validate role
    const validRoles = ['admin', 'inventory_manager', 'transporter', 'coordinator'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role specified'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Only allow role changes for employees
    if (user.userType !== 'employee') {
      return res.status(400).json({
        success: false,
        error: 'Role can only be changed for employees'
      });
    }

    // Update user role
    user.role = role;
    user.approvedRoles = [role]; // Update approved roles as well
    user.roleApprovalStatus = 'approved';
    user.status = 'active';
    user.approvedBy = adminId;
    user.approvedAt = new Date();

    await user.save();

    res.json({
      success: true,
      message: 'User role updated successfully',
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        roleApprovalStatus: user.roleApprovalStatus,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user role'
    });
  }
};

// Update user status (Super Admin only)
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['active', 'inactive', 'pending'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status specified'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    user.status = status;
    await user.save();

    res.json({
      success: true,
      message: 'User status updated successfully',
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user status'
    });
  }
};

// Delete user (Super Admin only)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const currentUserId = (req as any).user.id;

    // Prevent self-deletion
    if (userId === currentUserId) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete your own account'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prevent deletion of super admin accounts
    if (user.userType === 'super_admin') {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete super admin accounts'
      });
    }

    await User.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete user'
    });
  }
};
