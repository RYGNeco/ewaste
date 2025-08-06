// Test setup file
import dotenv from 'dotenv';

dotenv.config();

// Set test environment variables with proper defaults
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco-test';
process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Suppress console logs during tests unless verbose
if (!process.env.VERBOSE) {
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
}

// Global test timeout
jest.setTimeout(15000);
