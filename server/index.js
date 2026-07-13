import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bookingRoutes from './src/routes/bookingRoutes.js'
import { errorHandler, notFoundHandler } from './src/middleware/errorHandler.js'

dotenv.config({ path: '.env.server' })

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MGM Navratri Demo API', version: '2.0.0' })
})

app.use('/api', bookingRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`MGM Navratri Demo API v2 running at http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})