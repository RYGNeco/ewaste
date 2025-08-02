import express from 'express';
import {
  getPendingRoleRequests,
  getAllRoleRequests,
  approveRoleRequest,
  rejectRoleRequest,
  getRoleRequestStats,
  getUserRoleRequests
} from '../controllers/roleRequestController';
import { authenticateToken } from '../middleware/auth';
import { requireSuperAdmin, requireAdmin } from '../middleware/roleCheck';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get pending role requests (Super Admin only)
router.get('/pending', requireSuperAdmin, getPendingRoleRequests);

// Get all role requests with filters (Super Admin only)
router.get('/', requireSuperAdmin, getAllRoleRequests);

// Get role request statistics (Super Admin only)
router.get('/stats', requireSuperAdmin, getRoleRequestStats);

// Approve role request (Super Admin only)
router.put('/:requestId/approve', requireSuperAdmin, approveRoleRequest);

// Reject role request (Super Admin only)
router.put('/:requestId/reject', requireSuperAdmin, rejectRoleRequest);

// Get user's own role request history
router.get('/my-requests', getUserRoleRequests);

export default router; 