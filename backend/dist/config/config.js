"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'default_secret_key',
    nodeEnv: process.env.NODE_ENV || 'development',
    // Correct the path to point to the root-level scraper directory
    oddsFilePath: path_1.default.resolve(__dirname, '../../../scraper/sports_odds.json')
};
console.log(`Resolved oddsFilePath: ${path_1.default.resolve(__dirname, '../../../scraper/sports_odds.json')}`);
//# sourceMappingURL=config.js.map