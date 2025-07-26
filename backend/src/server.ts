
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();
const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
// Security middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

    }
const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
// Basic health check route
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.json({ 
    status: 'OK', 
    message: 'Rygneco E-Waste Tracker API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbStatus,
      name: mongoose.connection.name || 'unknown'
    },
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Set strictQuery option to suppress deprecation warning
mongoose.set('strictQuery', false);

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
=======
    const sanitizedURI = mongoURI.includes('@') 

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
>>>>>>> b167781 (t commit -m "fix: update backend server logic and health check)
    if (!mongoURI) {
      console.error('❌ MONGODB_URI is not defined in environment variables');
      process.exit(1);
    }
<<<<<<< HEAD
    
    // Log connection attempt (hide credentials if present)
    const sanitizedURI = mongoURI.includes('@') 
      ? `mongodb://${mongoURI.split('@')[1]}` 
      : mongoURI.replace(/mongodb(\+srv)?:\/\//, 'mongodb$1://[hidden]');
    
    console.log(`🔗 Connecting to MongoDB at ${sanitizedURI}`);
    
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
    
    // Safely log database host without credentials
=======
    const sanitizedURI = mongoURI.includes('@') 
      ? `mongodb://${mongoURI.split('@')[1]}` 
      : mongoURI.replace(/mongodb(\+srv)?:\/\//, 'mongodb$1://[hidden]');
    console.log(`🔗 Connecting to MongoDB at ${sanitizedURI}`);
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
>>>>>>> b167781 (t commit -m "fix: update backend server logic and health check)
    const dbHost = mongoURI.includes('@') 
      ? mongoURI.split('@')[1].split('/')[0]
      : 'database';
    console.log(`🔌 Connected to database: ${dbHost}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
<<<<<<< HEAD
    // Don't exit in production to allow for retries or fallback strategies
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

// Start server
=======
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
      ? `mongodb://${mongoURI.split('@')[1]}` 
      : mongoURI.replace(/mongodb(\+srv)?:\/\//, 'mongodb$1://[hidden]');
    console.log(`🔗 Connecting to MongoDB at ${sanitizedURI}`);
>>>>>>> b167781 (t commit -m "fix: update backend server logic and health check)
const startServer = async () => {
  try {
    // Try to connect to the database
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

const startServer = async () => {
  try {
    await connectDB();
<<<<<<< HEAD
    
    // Start the HTTP server even if DB connection fails in production
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      
      // Use a dynamic host in the logs based on environment
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? process.env.BASE_URL || `http://localhost:${PORT}`
        : `http://localhost:${PORT}`;
        
      console.log(`🔗 Health check: ${baseUrl}/api/health`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      
      // Log available API routes for testing
      console.log('\n📊 Available API Routes:');
      console.log('  GET  /api/health - Health check endpoint');
      
      // Identify if we're in test mode
      if (process.env.NODE_ENV === 'test') {
        console.log('\n🧪 Running in TEST mode');
        const dbInfo = process.env.MONGODB_URI?.includes('@')
          ? process.env.MONGODB_URI?.split('@')[1]?.split('/')[0] 
          : 'unknown';
        console.log(`🔧 Using test database: ${dbInfo}`);
      }
    });
    
    // Handle graceful shutdown
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
    
    // Listen for termination signals
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
<<<<<<< HEAD
    // Only exit in development or test to allow production to retry
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
=======
    process.exit(1);
=======
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
>>>>>>> a96429b (fix: update backend server logic and health check)
>>>>>>> b167781 (t commit -m "fix: update backend server logic and health check)
  }
};

startServer();
