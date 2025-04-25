"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config/config"));
const logger_1 = __importDefault(require("../utils/logger"));
// Hardcoded user with correct hash for 'admin123'
const users = [
    {
        id: '1',
        username: 'admin',
        // Replace this with your newly generated hash from the terminal
        password: '$2a$10$VQOCd24.8n3YB4zlauGP/ulR68xn.5J/.vSEMrgTiVSziYqGfJsiO'
    }
];
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        logger_1.default.info(`Login attempt for username: ${username}`);
        // Validate inputs
        if (!username || !password) {
            logger_1.default.warn('Login failed: Missing username or password');
            return res.status(400).json({ message: 'Username and password are required' });
        }
        // Find user (case-insensitive comparison for username)
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
        if (!user) {
            logger_1.default.warn(`Login failed: User not found - ${username}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        logger_1.default.info(`Password comparison result: ${isMatch}`);
        if (!isMatch) {
            logger_1.default.warn(`Login failed: Invalid password for user - ${username}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, config_1.default.jwtSecret, {
            expiresIn: '1h'
        });
        logger_1.default.info(`Login successful for user: ${username}`);
        // Send the response
        res.status(200).json({
            message: 'Authentication successful',
            token
        });
    }
    catch (error) {
        logger_1.default.error(`Login error: ${error}`);
        res.status(500).json({ message: 'Server error during authentication' });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map