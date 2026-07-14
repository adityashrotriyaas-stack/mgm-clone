import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import dotenv from 'dotenv'
import multer from 'multer'
import { randomUUID } from 'crypto'
import bookingRoutes from './routes/bookingRoutes.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import { logger, requestLogger } from './utils/logger.js'
import { validateRequest } from './middleware/validateRequest.js'
import { apiLimiter, authLimiter } from './middleware/rateLimiter.js'

dotenv.config({ path: '.env.server' })

const upload = multer()
const app = express()

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://checkout.razorpay.com'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.razorpay.com', 'https://checkout.razorpay.com'],
      frameSrc: ["'self'", 'https://api.razorpay.com'],
    },
  },
}))

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Request-ID'],
}))

// Request ID middleware
app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] || randomUUID()
  res.setHeader('X-Request-ID', req.id)
  next()
})

// Request logging
app.use(requestLogger)

// Rate limiting
app.use('/api/', apiLimiter)
app.use('/api/auth/', authLimiter)

// Body parsers
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

// Handle multipart/form-data BEFORE body parsers
app.use('/api/events/:eventId/commonEvent/registrationform/answer', upload.none())

// Validation middleware
app.use(validateRequest)

// Routes
app.use('/api', bookingRoutes)

// Health check (no rate limit)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  })
})

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  logger.info('MGM Navratri API started', {
    port: PORT,
    env: process.env.NODE_ENV || 'development',
    pid: process.pid,
  })
})

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully')
  server.close(() => {
    logger.info('Server closed')
    process.exit(0)
  })
})

export default app