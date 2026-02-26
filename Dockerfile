# ─────────────────────────────────────────
# Stage 1: Dependencies
# ─────────────────────────────────────────
FROM node:20-alpine AS deps

# Install security updates
RUN apk add --no-cache libc6-compat && \
    apk upgrade --no-cache

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with clean install
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# ─────────────────────────────────────────
# Stage 2: Builder
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application
RUN npm run build

# ─────────────────────────────────────────
# Stage 3: Runner (Production)
# ─────────────────────────────────────────
FROM node:20-alpine AS runner

# Install security updates
RUN apk upgrade --no-cache && \
    apk add --no-cache dumb-init

WORKDIR /app

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]
