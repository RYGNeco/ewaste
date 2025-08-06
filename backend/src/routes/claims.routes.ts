import { Router } from 'express';
import { updateUserClaims } from '../controllers/claims.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/update-claims', authMiddleware, updateUserClaims);

export default router;
