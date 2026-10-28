# Stage: Base & Production Runner
FROM node:20-alpine AS production

# Set working directory inside container
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=5000

# Copy package manifests
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production || npm install --omit=dev

# Copy application source code
COPY . .

# Change ownership to non-root user 'node'
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Expose server port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
