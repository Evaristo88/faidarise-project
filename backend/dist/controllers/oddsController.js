"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableSports = exports.getOddsBySport = exports.getAllOdds = void 0;
const oddsService = __importStar(require("../services/oddsService"));
const logger_1 = __importDefault(require("../utils/logger"));
const getAllOdds = async (req, res) => {
    try {
        logger_1.default.info('Fetching all odds data');
        const oddsData = await oddsService.getOddsData();
        logger_1.default.info(`Returning ${oddsData.length} odds events`);
        res.json(oddsData);
    }
    catch (error) {
        logger_1.default.error(`Error in getAllOdds: ${error}`);
        res.status(500).json({ message: 'Error fetching odds data' });
    }
};
exports.getAllOdds = getAllOdds;
const getOddsBySport = async (req, res) => {
    try {
        const { sportKey } = req.params;
        console.log('Received sportKey:', sportKey); // Debugging log
        if (!sportKey || typeof sportKey !== 'string') {
            logger_1.default.warn('Invalid or missing sport key');
            return res.status(400).json({ message: 'Invalid or missing sport key' });
        }
        const filteredOdds = await oddsService.getOddsBySport(sportKey);
        console.log('Filtered Odds:', filteredOdds); // Debugging log
        if (!filteredOdds || filteredOdds.length === 0) {
            logger_1.default.info(`No odds found for sport: ${sportKey}`);
            return res.status(404).json({ message: `No odds found for sport: ${sportKey}` });
        }
        res.json(filteredOdds);
    }
    catch (error) {
        logger_1.default.error(`Error in getOddsBySport: ${error}`);
        res.status(500).json({ message: 'Error fetching odds by sport' });
    }
};
exports.getOddsBySport = getOddsBySport;
const getAvailableSports = async (req, res) => {
    try {
        logger_1.default.info('Fetching available sports');
        const sports = await oddsService.getAvailableSports();
        if (!sports || sports.length === 0) {
            logger_1.default.info('No sports available');
            return res.status(404).json({ message: 'No sports available' });
        }
        logger_1.default.info(`Returning sports: ${JSON.stringify(sports)}`);
        res.json(sports);
    }
    catch (error) {
        logger_1.default.error(`Error in getAvailableSports: ${error}`);
        res.status(500).json({ message: 'Error fetching available sports' });
    }
};
exports.getAvailableSports = getAvailableSports;
//# sourceMappingURL=oddsController.js.map