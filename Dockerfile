# Multi-stage Dockerfile for Railway deployment
# This will build the backend service

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

# Build the application using tsconfig.build.json explicitly
RUN npx tsc -p tsconfig.build.json

# Clean up and install only production dependencies
RUN rm -rf node_modules && npm install --only=production

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

# Expose port (Railway will set the PORT environment variable)
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]