
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('❌ MONGODB_URI is not defined in environment variables');
      process.exit(1);
    }
    const sanitizedURI = mongoURI.includes('@') 
      ? `mongodb://${mongoURI.split('@')[1]}` 
      : mongoURI.replace(/mongodb(\+srv)?:\/\//, 'mongodb$1://[hidden]');
    console.log(`🔗 Connecting to MongoDB at ${sanitizedURI}`);
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
    const dbHost = mongoURI.includes('@') 
      ? mongoURI.split('@')[1].split('/')[0]
      : 'database';
    console.log(`🔌 Connected to database: ${dbHost}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? process.env.BASE_URL || `http://localhost:${PORT}`
        : `http://localhost:${PORT}`;
      console.log(`🔗 Health check: ${baseUrl}/api/health`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('\n📊 Available API Routes:');
      console.log('  GET  /api/health - Health check endpoint');
      if (process.env.NODE_ENV === 'test') {
        console.log('\n🧪 Running in TEST mode');
        const dbInfo = process.env.MONGODB_URI?.includes('@')
          ? process.env.MONGODB_URI?.split('@')[1]?.split('/')[0] 
          : 'unknown';
        console.log(`🔧 Using test database: ${dbInfo}`);
      }
    });
    const gracefulShutdown = () => {
      console.log('🛑 Shutting down gracefully...');
      server.close(() => {
        console.log('✅ HTTP server closed');
        mongoose.connection.close(false, () => {
          console.log('✅ MongoDB connection closed');
          process.exit(0);
        });
      });
    };
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

startServer();
