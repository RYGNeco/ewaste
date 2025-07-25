import express from 'express';
import { login, protectedRoute } from '../controllers/authController';
import { isAuthenticated } from '../middleware/auth';
import { authorizeRoles } from '../middleware/roleCheck';

const router = express.Router();

router.post('/login', login);
router.get('/protected', isAuthenticated, authorizeRoles('admin', 'user'), protectedRoute);

export default router;
