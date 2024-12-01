import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { errorHandler, notFound } from './middleware/error.js';
import memberRouter from './routes/member.js';
import resultsRouter from './routes/results.js';
import { initCache } from './services/cache.js';
import { config } from './config/index.js';

dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize cache
initCache();

// Middleware
app.use(express.json());
app.use(cors({
  origin: config.frontend.url,
  credentials: true
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// API Routes
app.use('/api/member', memberRouter);
app.use('/api/results', resultsRouter);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const port = config.port;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Frontend URL: ${config.frontend.url}`);
});

export default app;