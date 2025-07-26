import express from 'express';
import passport from 'passport';
import { oauthCallback, logout } from '../controllers/authController';
import { isAuthenticated } from '../middlewares/authMiddleware';
import { authorizeRoles } from '../middlewares/roleMiddleware';

const router = express.Router();

// 🔐 Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// 🔄 Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  oauthCallback
);

// 🚪 Logout
router.post('/logout', logout);

// 🔒 Example protected route (JWT required)
router.get('/me', isAuthenticated, (req, res) => {
  res.json({ message: 'You are authenticated', user: req.user });
});

// 🔒 Example admin-only route
router.get('/admin', isAuthenticated, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

export default router;
