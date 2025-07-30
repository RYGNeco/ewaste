import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

// Routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import partnerRoutes from './routes/partners';
import batchRoutes from './routes/batches';
import analyticsRoutes from './routes/analytics';
import uploadRoutes from './routes/uploads';

// Middleware
import { errorHandler } from './middleware/errorHandler';
import { logging } from './middleware/logging';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Logging middleware
app.use(logging);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/uploads', uploadRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Rygneco E-Waste Tracker API is running',
    timestamp: new Date().toISOString()
  });
});


// Protected route example
import { isAuthenticated } from './middleware/auth';
import { authorizeRoles } from './middleware/roleCheck';
app.get('/api/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Admin-only route example
app.get('/api/admin', isAuthenticated, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin!', user: req.user });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;