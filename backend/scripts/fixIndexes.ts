import mongoose from 'mongoose';
import { connectDatabase } from '../src/config/database';
import User from '../src/models/User';
import { logger } from '../src/utils/logger';

async function fixIndexes() {
  try {
    // Connect to database
    await connectDatabase();
    
    logger.info('🔧 Starting index fix...');

    // Drop the problematic index
    await User.collection.dropIndex('googleId_1');
    logger.info('✅ Dropped old googleId index');

    // Create new index with sparse option
    await User.collection.createIndex(
      { googleId: 1 }, 
      { unique: true, sparse: true }
    );
    logger.info('✅ Created new googleId index with sparse option');

    // Verify indexes
    const indexes = await User.collection.listIndexes().toArray();
    logger.info('Current indexes:', indexes);

    logger.info('🎉 Index fix completed successfully!');
  } catch (error) {
    logger.error('Error fixing indexes:', error);
  } finally {
    await mongoose.disconnect();
    logger.info('🔌 Disconnected from MongoDB');
  }
}

fixIndexes();
