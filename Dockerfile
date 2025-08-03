# Multi-stage Dockerfile for Railway deployment
# This will build the backend service

FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies for backend
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy backend source code
COPY backend/ .
COPY shared/ ./shared/

# Build the application
RUN npm run build

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