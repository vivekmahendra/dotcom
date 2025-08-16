# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps to handle React 19
RUN npm ci --legacy-peer-deps

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only with legacy peer deps
RUN npm ci --only=production --legacy-peer-deps && \
    npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/build ./build

# Copy start script
COPY --chown=nodejs:nodejs scripts/start.sh ./scripts/

# Switch to non-root user
USER nodejs

# Cloud Run sets PORT environment variable
ENV PORT=3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application using the start script
CMD ["sh", "scripts/start.sh"]