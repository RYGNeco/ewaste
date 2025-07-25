# Multi-stage Dockerfile for Node.js/Express Backend

# Development stage
FROM node:18-alpine AS development
WORKDIR /app

# Copy package files
COPY backend/package.json ./
COPY backend/package-lock.json* ./
RUN npm ci || npm install

# Copy source code
COPY backend/ .
COPY shared/ ./shared/

# Install shared dependencies
WORKDIR /app/shared
RUN npm ci || true

WORKDIR /app
EXPOSE 5000

# Development command
CMD ["npm", "run", "dev"]

# Production build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY backend/package.json ./
COPY backend/package-lock.json* ./
RUN npm ci --only=production || npm install --only=production

# Copy source code and build
COPY backend/ .
COPY shared/ ./shared/
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Copy built application and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Create uploads directory
RUN mkdir -p /app/uploads/{proofs,reports,temp}

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S backend -u 1001
RUN chown -R backend:nodejs /app
USER backend

EXPOSE 5000

CMD ["npm", "start"]