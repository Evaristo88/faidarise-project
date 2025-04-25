import { Router } from 'express';
import * as oddsController from '../controllers/oddsController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All odds routes require authentication
router.use(authenticate);

// Get all odds
router.get('/', oddsController.getAllOdds);

// Get available sports
router.get('/sports', oddsController.getAvailableSports);

// Get odds by sport
router.get('/sport/:sportKey', oddsController.getOddsBySport);

export default router;