import express from 'express';
import mongoose from 'mongoose';
import { getCacheStats } from '../utils/cache.js';

const router = express.Router();

router.get('/', (req, res) => {
  const mongoState = mongoose.connection.readyState;
  const mongoStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.status(200).json({
    success: true,
    message: 'ITUE301 Advanced Web Development Frameworks API is healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    database: {
      status: mongoStatusMap[mongoState] || 'unknown',
      connected: mongoState === 1,
    },
    cache: getCacheStats(),
  });
});

export default router;
