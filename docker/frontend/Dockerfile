# Multi-stage Dockerfile for React Frontend

# Development stage
FROM node:20-alpine AS development
WORKDIR /app

# Copy package files
COPY frontend/package*.json ./
RUN npm install

# Copy source code
COPY frontend/ .
COPY shared/ ./shared/

EXPOSE 3000

# Development command
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Production build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy source code and shared utilities
COPY frontend/ .
COPY shared/ ./shared/

# Add export statement to all empty TypeScript files (excluding .d.ts files)
RUN find src -type f \( -name "*.ts" -o -name "*.tsx" \) ! -name "*.d.ts" -exec sh -c 'if [ -s "$1" ] && ! grep -q "import\|export" "$1"; then echo "export {};" > /tmp/tmp_file && cat "$1" >> /tmp/tmp_file && mv /tmp/tmp_file "$1"; elif [ ! -s "$1" ]; then echo "export {};" > "$1"; fi' _ {} \;

# Build for production
RUN npm run build

# Production stage with nginx
FROM nginx:alpine AS production

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]