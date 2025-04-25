// backend/src/services/oddsService.ts
import fs from 'fs';
import path from 'path';
import { SportEvent } from '../models/types';
import config from '../config/config';
import logger from '../utils/logger';

export const getOddsData = (): Promise<SportEvent[]> => {
  return new Promise((resolve, reject) => {
    try {
      // Use the correct absolute path to the sports_odds.json file
      const oddsFilePath = '/home/rama-canon/faidarise-project/scraper/sports_odds.json';
      
      logger.info(`Reading odds data from: ${oddsFilePath}`);
      
      // Check if file exists
      if (!fs.existsSync(oddsFilePath)) {
        logger.error(`File does not exist: ${oddsFilePath}`);
        return reject(new Error('Odds data file not found'));
      }
      
      // Read and parse the data
      const rawData = fs.readFileSync(oddsFilePath, 'utf8');
      logger.info(`Raw data loaded, size: ${rawData.length} bytes`);
      
      const oddsData: SportEvent[] = JSON.parse(rawData);
      
      logger.info(`Successfully loaded ${oddsData.length} events from odds data file`);
      resolve(oddsData);
    } catch (error) {
      logger.error(`Error loading odds data: ${error}`);
      reject(error);
    }
  });
};

export const getOddsBySport = async (sportKey: string): Promise<SportEvent[]> => {
  try {
    const allOdds = await getOddsData();
    const filteredOdds = allOdds.filter(event => 
      event.sport_key === sportKey || 
      event.sport_title.toLowerCase().includes(sportKey.toLowerCase())
    );
    
    logger.info(`Filtered odds for sport '${sportKey}': found ${filteredOdds.length} events`);
    return filteredOdds;
  } catch (error) {
    logger.error(`Error filtering odds by sport '${sportKey}': ${error}`);
    throw error;
  }
};

export const getAvailableSports = async (): Promise<{ key: string; title: string }[]> => {
  try {
    const allOdds = await getOddsData();
    
    // Extract unique sports
    const sportsMap = new Map<string, string>();
    
    allOdds.forEach(event => {
      if (event.sport_key && event.sport_title) {
        sportsMap.set(event.sport_key, event.sport_title);
      }
    });
    
    // Convert to array of objects
    const sports = Array.from(sportsMap).map(([key, title]) => ({ key, title }));
    logger.info(`Found ${sports.length} unique sports`);
    return sports;
  } catch (error) {
    logger.error(`Error getting available sports: ${error}`);
    throw error;
  }
};