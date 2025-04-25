import { Router } from 'express';
import oddsRoutes from './oddsRoutes';
import authRoutes from './authRoutes';
const router = Router();
router.use('/auth', authRoutes);
router.use('/odds', oddsRoutes);
export default router;