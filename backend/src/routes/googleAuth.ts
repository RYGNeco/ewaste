import express from 'express';
import { handleGoogleSignIn, handleGoogleRegistration } from '../controllers/googleAuthController';

const router = express.Router();

// Google Sign-in routes
router.post('/google-signin', handleGoogleSignIn);
router.post('/google-register', handleGoogleRegistration);

export default router;
