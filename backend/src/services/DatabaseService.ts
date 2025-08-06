// Database Service Layer Example
import mongoose from 'mongoose';
import Redis from 'ioredis';

class DatabaseService {
  private static instance: DatabaseService;
  private redis: Redis;

  private constructor() {
    this.redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  }

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async connectMongoDB(): Promise<void> {
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      retryWrites: true,
<<<<<<< HEAD
      w: 'majority'
=======
      w: 'majority' as const
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
    };
    
    await mongoose.connect(process.env.MONGODB_URI!, options);
  }

  async getCached(key: string): Promise<any> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

<<<<<<< HEAD
  async setCached(key: string, value: any, ttl: number = 3600): Promise<void> {
=======
  async setCached(key: string, value: any, ttl = 3600): Promise<void> {
>>>>>>> c1d976faeace438720baff3c129c4dea43581e86
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }

  async invalidateCache(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}

export default DatabaseService;
