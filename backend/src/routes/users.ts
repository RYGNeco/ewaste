import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
  deleteUser
} from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import { requireSuperAdmin, requireAdmin } from '../middleware/roleCheck';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all users with optional filters (Admin/Super Admin only)
router.get('/', requireAdmin, getAllUsers);

// Get user by ID (Admin/Super Admin only)
router.get('/:userId', requireAdmin, getUserById);

// Update user role (Super Admin only)
router.put('/:userId/role', requireSuperAdmin, updateUserRole);

// Update user status (Super Admin only)
router.put('/:userId/status', requireSuperAdmin, updateUserStatus);

// Delete user (Super Admin only)
router.delete('/:userId', requireSuperAdmin, deleteUser);

export default router;
