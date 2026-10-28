import mongoose from 'mongoose';

const connectDB = async (uri) => {
  const mongoURI = uri || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/itue301_db';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    // If running in development without external Mongo, indicate connection failure
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    return null;
  }
};

export default connectDB;
