import request from 'supertest';
import express from 'express';
import authRoutes from '../../src/routes/auth';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth API', () => {
  it('should login and return a JWT token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'adminpass' });
    console.log('Login response:', res.body);
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should deny access to protected route without token', async () => {
    const res = await request(app)
      .get('/api/auth/protected');
    expect(res.status).toBe(401);
  });

  it('should allow access to protected route with valid token', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'adminpass' });
    const token = loginRes.body.token;
    const res = await request(app)
      .get('/api/auth/protected')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.role).toBe('admin');
  });
});
