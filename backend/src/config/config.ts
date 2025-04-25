import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'default_secret_key',
  nodeEnv: process.env.NODE_ENV || 'development',
  // Correct the path to point to the root-level scraper directory
  oddsFilePath: path.resolve(__dirname, '../../../scraper/sports_odds.json')
};

console.log(`Resolved oddsFilePath: ${path.resolve(__dirname, '../../../scraper/sports_odds.json')}`);