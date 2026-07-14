import pino from 'pino'
import pinoPretty from 'pino-pretty'

const isDevelopment = process.env.NODE_ENV !== 'production'

const logger = pino(
  isDevelopment
    ? {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      }
    : { level: 'info' }
)

export const requestLogger = (req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    logger.info({ req: { id: req.id, method: req.method, url: req.originalUrl }, res: { statusCode: res.statusCode }, duration }, 'HTTP request')
  })
  next()
}

export { logger }