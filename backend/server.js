import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { requestLogger } from './middleware/loggerMiddleware.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { registerTaskListeners } from './utils/eventEmitter.js';

import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize native EventEmitter listeners (Practical 10)
registerTaskListeners();

const app = express();

// Enable CORS for local development and container communication
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost',
  'http://127.0.0.1',
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for university testing
    },
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom HTTP request logger middleware (Practical 4)
app.use(requestLogger);

// API Root Index
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'CHARUSAT ITUE301 Advanced Web Development Frameworks API Server',
    author: 'Dhruv Patel',
    version: '1.0.0',
    documentation: {
      health: 'GET /api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
      },
      tasks: {
        list: 'GET /api/tasks',
        create: 'POST /api/tasks',
        getById: 'GET /api/tasks/:id',
        update: 'PUT /api/tasks/:id',
        delete: 'DELETE /api/tasks/:id',
      },
    },
  });
});

// Mount Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Error Handling Middlewares (Practical 4)
app.use(notFound);
app.use(errorHandler);

const PORT = parseInt(process.env.PORT || '5000', 10);
// Crucial: Bind to 0.0.0.0 so containers and remote interfaces can access the server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`ITUE301 Express Backend running on http://0.0.0.0:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`====================================================`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('[Process] SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('[Process] HTTP server closed.');
    process.exit(0);
  });
});

export default app;
