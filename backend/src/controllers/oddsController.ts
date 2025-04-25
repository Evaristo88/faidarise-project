// backend/src/controllers/oddsController.ts
import { Request, Response } from 'express';
import * as oddsService from '../services/oddsService';
import logger from '../utils/logger';

export const getAllOdds = async (req: Request, res: Response) => {
  try {
    logger.info('Fetching all odds data');
    const oddsData = await oddsService.getOddsData();
    logger.info(`Returning ${oddsData.length} odds events`);
    res.json(oddsData);
  } catch (error) {
    logger.error(`Error in getAllOdds: ${error}`);
    res.status(500).json({ message: 'Error fetching odds data' });
  }
};

export const getOddsBySport = async (req: Request, res: Response) => {
  try {
    const { sportKey } = req.params;
    console.log('Received sportKey:', sportKey); // Debugging log

    if (!sportKey || typeof sportKey !== 'string') {
      logger.warn('Invalid or missing sport key');
      return res.status(400).json({ message: 'Invalid or missing sport key' });
    }

    const filteredOdds = await oddsService.getOddsBySport(sportKey);
    console.log('Filtered Odds:', filteredOdds); // Debugging log

    if (!filteredOdds || filteredOdds.length === 0) {
      logger.info(`No odds found for sport: ${sportKey}`);
      return res.status(404).json({ message: `No odds found for sport: ${sportKey}` });
    }

    res.json(filteredOdds);
  } catch (error) {
    logger.error(`Error in getOddsBySport: ${error}`);
    res.status(500).json({ message: 'Error fetching odds by sport' });
  }
};

export const getAvailableSports = async (req: Request, res: Response) => {
  try {
    logger.info('Fetching available sports');
    const sports = await oddsService.getAvailableSports();

    if (!sports || sports.length === 0) {
      logger.info('No sports available');
      return res.status(404).json({ message: 'No sports available' });
    }

    logger.info(`Returning sports: ${JSON.stringify(sports)}`);
    res.json(sports);
  } catch (error) {
    logger.error(`Error in getAvailableSports: ${error}`);
    res.status(500).json({ message: 'Error fetching available sports' });
  }
};