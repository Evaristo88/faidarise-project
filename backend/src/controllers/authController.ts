// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/config';
import logger from '../utils/logger';

// Hardcoded user with correct hash for 'admin123'
const users = [
  {
    id: '1',
    username: 'admin',
    // Replace this with your newly generated hash from the terminal
    password: '$2a$10$VQOCd24.8n3YB4zlauGP/ulR68xn.5J/.vSEMrgTiVSziYqGfJsiO'
  }
];

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    logger.info(`Login attempt for username: ${username}`);

    // Validate inputs
    if (!username || !password) {
      logger.warn('Login failed: Missing username or password');
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user (case-insensitive comparison for username)
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!user) {
      logger.warn(`Login failed: User not found - ${username}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    logger.info(`Password comparison result: ${isMatch}`);

    if (!isMatch) {
      logger.warn(`Login failed: Invalid password for user - ${username}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, config.jwtSecret, {
      expiresIn: '1h'
    });

    logger.info(`Login successful for user: ${username}`);
    
    // Send the response
    res.status(200).json({
      message: 'Authentication successful',
      token
    });
  } catch (error) {
    logger.error(`Login error: ${error}`);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};