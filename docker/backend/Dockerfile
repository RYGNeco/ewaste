# Multi-stage Dockerfile for Node.js/Express Backend

# Development stage
FROM node:18-alpine AS development
WORKDIR /app

# Copy and install shared dependencies first
COPY shared/package.json ./shared/
COPY shared/package-lock.json* ./shared/
WORKDIR /app/shared
RUN npm ci || npm install

# Copy shared source code
COPY shared/ ./

# Switch back to main app directory
WORKDIR /app

# Copy backend package files and install dependencies
COPY backend/package.json ./
COPY backend/package-lock.json* ./
RUN npm ci || npm install

# Copy backend source code
COPY backend/ .

EXPOSE 5000

# Development command
CMD ["npm", "run", "dev"]

# Production build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy and install shared dependencies first
COPY shared/package.json ./shared/
COPY shared/package-lock.json* ./shared/
WORKDIR /app/shared
RUN npm ci || npm install

# Copy shared source code
COPY shared/ ./

# Switch back to main app directory
WORKDIR /app

# Copy backend package files and install ALL dependencies (including dev dependencies for build)
COPY backend/package.json ./
COPY backend/package-lock.json* ./
RUN npm install

# Copy backend source code
COPY backend/ .

# Debug: Check file structure before building
RUN ls -la && ls -la src/ || true 

# Build the application with verbose logging
RUN npm run build --verbose

# Clean up and install only production dependencies
RUN rm -rf node_modules && npm ci --only=production || npm install --only=production

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