import rateLimit from 'express-rate-limit'
import { logger } from '../utils/logger.js'

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: { success: false, message: 'Too many requests, please try again later', code: 'RATE_LIMITED' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
  handler: (req, res, next, options) => {
    logger.warn({ ip: req.ip, path: req.path }, 'Rate limit exceeded')
    res.status(429).json(options.message)
  },
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many auth attempts, please try again later', code: 'AUTH_RATE_LIMITED' },
  standardHeaders: true,
  legacyHeaders: false,
})

export const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  message: { success: false, message: 'Too many requests, please slow down', code: 'STRICT_RATE_LIMITED' },
  standardHeaders: true,
  legacyHeaders: false,
})