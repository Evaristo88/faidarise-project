"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableSports = exports.getOddsBySport = exports.getOddsData = void 0;
// backend/src/services/oddsService.ts
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../utils/logger"));
const getOddsData = () => {
    return new Promise((resolve, reject) => {
        try {
            // Use the correct absolute path to the sports_odds.json file
            const oddsFilePath = '/home/rama-canon/faidarise-project/scraper/sports_odds.json';
            logger_1.default.info(`Reading odds data from: ${oddsFilePath}`);
            // Check if file exists
            if (!fs_1.default.existsSync(oddsFilePath)) {
                logger_1.default.error(`File does not exist: ${oddsFilePath}`);
                return reject(new Error('Odds data file not found'));
            }
            // Read and parse the data
            const rawData = fs_1.default.readFileSync(oddsFilePath, 'utf8');
            logger_1.default.info(`Raw data loaded, size: ${rawData.length} bytes`);
            const oddsData = JSON.parse(rawData);
            logger_1.default.info(`Successfully loaded ${oddsData.length} events from odds data file`);
            resolve(oddsData);
        }
        catch (error) {
            logger_1.default.error(`Error loading odds data: ${error}`);
            reject(error);
        }
    });
};
exports.getOddsData = getOddsData;
const getOddsBySport = async (sportKey) => {
    try {
        const allOdds = await (0, exports.getOddsData)();
        const filteredOdds = allOdds.filter(event => event.sport_key === sportKey ||
            event.sport_title.toLowerCase().includes(sportKey.toLowerCase()));
        logger_1.default.info(`Filtered odds for sport '${sportKey}': found ${filteredOdds.length} events`);
        return filteredOdds;
    }
    catch (error) {
        logger_1.default.error(`Error filtering odds by sport '${sportKey}': ${error}`);
        throw error;
    }
};
exports.getOddsBySport = getOddsBySport;
const getAvailableSports = async () => {
    try {
        const allOdds = await (0, exports.getOddsData)();
        // Extract unique sports
        const sportsMap = new Map();
        allOdds.forEach(event => {
            if (event.sport_key && event.sport_title) {
                sportsMap.set(event.sport_key, event.sport_title);
            }
        });
        // Convert to array of objects
        const sports = Array.from(sportsMap).map(([key, title]) => ({ key, title }));
        logger_1.default.info(`Found ${sports.length} unique sports`);
        return sports;
    }
    catch (error) {
        logger_1.default.error(`Error getting available sports: ${error}`);
        throw error;
    }
};
exports.getAvailableSports = getAvailableSports;
//# sourceMappingURL=oddsService.js.map