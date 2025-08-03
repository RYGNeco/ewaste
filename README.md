# Rygneco E-Waste Tracker

A comprehensive e-waste management and tracking system built with modern web technologies.

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Recharts** - Data visualizations
- **QRCode.react** - QR code generation
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** - File uploads
- **CORS & Helmet** - Security

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Railway** - Deployment platform
- **Snyk** - Security scanning

## 📁 Project Structure

```
rygneco-ewaste-tracker/
├── frontend/          # React application
├── backend/           # Node.js API
├── shared/            # Shared types and utilities
├── docker/            # Docker configurations
├── .github/           # CI/CD workflows
└── docs/              # Documentation
```

## 🏃‍♂️ Quick Start

### Prerequisites
- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **MongoDB** - [Install locally](https://docs.mongodb.com/manual/installation/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - Version control
- **Docker** (optional) - For containerized development

### Project Initialization from Scratch

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/rygneco-ewaste-tracker.git
cd rygneco-ewaste-tracker
```

#### 2. Install Root Dependencies
```bash
# Install workspace dependencies
npm install
```

#### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

#### 4. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

#### 5. Install Shared Dependencies
```bash
cd shared
npm install
cd ..
```

#### 6. Environment Configuration

Create environment files from examples:
```bash
# Backend environment
cp backend/.env.example backend/.env

# Frontend environment (if needed)
cp frontend/.env.example frontend/.env

# Root environment
cp .env.example .env
```

Edit the environment files with your configuration:

**Backend (.env)**:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rygneco
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
```

**Frontend (.env)** (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

#### 7. Database Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service (varies by OS)
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in backend/.env

#### 8. Build TypeScript (if needed)
```bash
# Build backend TypeScript
cd backend
npm run build
cd ..

# Verify shared types are compiled
cd shared
npm run build
cd ..
```

#### 9. Start Development Servers

**All services at once:**
```bash
npm run dev
```

**Individual services:**
```bash
# Backend only (Terminal 1)
npm run dev:backend

# Frontend only (Terminal 2)  
npm run dev:frontend
```

#### 10. Verify Installation

Once servers are running, verify:
- Frontend: http://localhost:3000
- Backend API Health: http://localhost:5000/api/health
- MongoDB connection should show in backend logs

### Installation Troubleshooting

**Common Issues:**

1. **Port conflicts:**
   ```bash
   # Kill processes using ports
   npx kill-port 3000 5000
   ```

2. **Node version issues:**
   ```bash
   # Check Node version
   node --version
   # Should be 18.x or higher
   ```

3. **MongoDB connection:**
   ```bash
   # Check if MongoDB is running locally
   mongosh --eval "db.runCommand({ ping: 1 })"
   ```

4. **Permission errors:**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **TypeScript compilation errors:**
   ```bash
   # Reinstall TypeScript globally
   npm install -g typescript
   
   # Rebuild projects
   npm run build
   ```

### Alternative Installation Method

**Using npm workspaces (recommended):**
```bash
# Install all dependencies at once
npm run install:all

# Or manually
npm install --workspaces
```

**Using Docker (containerized development):**
```bash
# Start all services including MongoDB
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 🎯 Quick Setup Summary

For experienced developers, here's the minimal setup:

```bash
# 1. Clone and install
git clone <repo-url>
cd rygneco-ewaste-tracker
npm run install:all

# 2. Setup environment
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Edit backend/.env with your MongoDB URI

# 3. Start development
npm run dev

# 4. Access
# Frontend: http://localhost:3000
# Backend: http://localhost:5000/api/health
```

### 📦 Package Information

**Root dependencies:**
- `concurrently` - Run multiple npm scripts simultaneously

**Frontend dependencies:**
- React 18, TypeScript, Tailwind CSS, Redux Toolkit
- React Router, Recharts, QRCode.react, Axios
- Testing: Jest, React Testing Library
- Dev tools: Vite, ESLint, Prettier

**Backend dependencies:**
- Express.js, MongoDB/Mongoose, JWT, bcrypt
- File handling: Multer
- Security: CORS, Helmet
- Dev tools: Nodemon, ts-node, TypeScript

### 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend

# Building
npm run build            # Build both applications
npm run build:frontend   # Build frontend only
npm run build:backend    # Build backend only

# Testing
npm run test             # Run all tests
npm run test:frontend    # Run frontend tests
npm run test:backend     # Run backend tests

# Linting
npm run lint             # Lint all code
npm run lint:frontend    # Lint frontend
npm run lint:backend     # Lint backend
```

## 🌟 Features

### Core Functionality
- **QR Code Tracking** - End-to-end batch tracking
- **Role-based Access** - Admin, Client, Transporter, Warehouse
- **Real-time Updates** - Live status tracking
- **File Management** - Certificate and proof uploads
- **Analytics Dashboard** - Comprehensive reporting

### User Roles
- **Admin** - Full system oversight and management
- **Client** - Schedule pickups, track batches, download certificates
- **Transporter** - Scan QR codes, update transit status
- **Warehouse Employee** - Process batches, manage inventory

## 🚀 Deployment

### Railway (Current)
The application is configured for Railway deployment with automatic CI/CD.

### Environment Variables
Required environment variables are documented in `.env.example`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is proprietary to Rygneco.

## 📞 Support

For questions and support, please contact the Rygneco development team.