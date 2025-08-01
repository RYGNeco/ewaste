import express from 'express';
import { oauthCallback, logout, protectedRoute, login } from '../controllers/authController';
import { isAuthenticated } from '../middleware/auth';
import { authorizeRoles } from '../middleware/roleCheck';

const router = express.Router();

router.post('/login', login);
router.get('/google/callback', oauthCallback);
router.post('/logout', logout);
router.get('/protected', isAuthenticated, authorizeRoles('admin', 'user'), protectedRoute);

export default router;
