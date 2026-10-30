import mongoose from 'mongoose';

const connectDB = async (uri) => {
  const mongoURI = uri || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/itue301_db';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB] External instance at ${mongoURI} not reachable (${error.message}).`);
    
    // In production (e.g. Docker), require external database
    if (process.env.NODE_ENV === 'production' && process.env.MONGO_URI?.includes('mongodb:')) {
      console.error('[MongoDB] Critical: Production container failed to connect to database.');
      process.exit(1);
    }

    // In development fallback mode, spin up MongoMemoryServer for immediate live interaction
    try {
      console.log('[MongoDB Fallback] Starting in-memory MongoDB engine for zero-dependency live run...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const memoryServer = await MongoMemoryServer.create();
      const memUri = memoryServer.getUri();
      const conn = await mongoose.connect(memUri);
      console.log(`[MongoDB Fallback] Connected to in-memory database at ${memUri}`);
      console.log('[MongoDB Fallback] Full CRUD, registration, login, and tasks are live and operational!');
      return conn;
    } catch (memError) {
      console.error(`[MongoDB Fallback] Failed to initialize fallback: ${memError.message}`);
      return null;
    }
  }
};

export default connectDB;
