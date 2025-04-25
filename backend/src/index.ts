import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes/api';
import config from './config/config';
import logger from './utils/logger';
import { errorHandler, notFound } from './middleware/errorHandler';

// Initialize express app
const app = express();

// Apply basic middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:4000', // Frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Sports Odds API',
    documentation: '/api/docs',
    version: '1.0.0'
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const port = config.port;
app.listen(port, () => {
  logger.info(`Server running in ${config.nodeEnv} mode on port ${port}`);
});

export default app;