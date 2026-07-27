import './config/env.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import scanRoutes from './routes/scanRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import insightsRoutes from './routes/insightsRoutes.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'

connectDB()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsDir = path.join(__dirname, 'uploads')
fs.mkdirSync(uploadsDir, { recursive: true })

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || '*' }))
app.use(express.json())
app.use('/uploads', express.static(uploadsDir))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'GreenBin AI backend' })
})

app.use('/api/auth', authRoutes)
app.use('/api/scans', scanRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/insights', insightsRoutes)

app.use('/api', notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
