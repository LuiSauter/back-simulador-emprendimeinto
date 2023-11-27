import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import config from './config.js'
import authRoutes from './routes/auth.routes.js'
import entrepreneurshipRoutes from './routes/entrepreneurshipRoutes.routes.js'

const app = express()

app.use(cors({
  credentials: true, origin: config.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/entrepreneurship', entrepreneurshipRoutes)

export default app
