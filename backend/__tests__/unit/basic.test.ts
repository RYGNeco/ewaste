import request from 'supertest';
import app from '../../src/app';

describe('Basic API Tests', () => {
  it('should return health check without database connection', async () => {
    const res = await request(app)
      .get('/api/health');
    
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(res.body.message).toBe('Rygneco E-Waste Tracker API is running');
    expect(res.body.environment).toBe('test');
  }, 10000);

  it('should handle 404 for unknown routes', async () => {
    const res = await request(app)
      .get('/api/nonexistent');
    
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Route not found');
  }, 10000);

  it('should handle logout endpoint', async () => {
    const res = await request(app)
      .post('/api/auth/logout');
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Logged out successfully');
  }, 10000);
}); 