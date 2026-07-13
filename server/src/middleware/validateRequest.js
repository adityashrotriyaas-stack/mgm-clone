import { logger } from '../utils/logger.js'

export function validateRequest(req, res, next) {
  const contentType = req.headers['content-type'] || ''
  if (!contentType.includes('multipart/form-data') && req.method !== 'GET' && !contentType.includes('application/json') && !contentType.includes('application/x-www-form-urlencoded')) {
    logger.warn({ contentType }, 'Unsupported content type')
    return res.status(415).json({ success: false, message: 'Unsupported content type', code: 'UNSUPPORTED_MEDIA_TYPE' })
  }
  next()
}

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        errors: result.error.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
      })
    }
    req.validatedBody = result.data
    next()
  }
}

export function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query)
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters',
        code: 'INVALID_QUERY',
        errors: result.error.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
      })
    }
    req.validatedQuery = result.data
    next()
  }
}

export function validateParams(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.params)
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid route parameters',
        code: 'INVALID_PARAMS',
        errors: result.error.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
      })
    }
    req.validatedParams = result.data
    next()
  }
}