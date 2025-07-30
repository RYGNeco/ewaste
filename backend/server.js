const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'mySecretKey';

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Login route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  let payload = null;

  if (username === 'admin' && password === 'adminpass') {
    payload = { id: 1, username: 'admin', role: 'admin' };
  } else if (username === 'user' && password === 'userpass') {
    payload = { id: 2, username: 'user', role: 'user' };
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the protected route!', user: req.user });
});

// Admin-only route
app.get('/api/admin', authenticateToken, (req, res) => {
  if (req.user.role === 'admin') {
    res.json({ message: 'Welcome Admin!' });
  } else {
    res.status(403).json({ error: 'Forbidden: Admins only' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
