import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI,
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'secret',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173'
}
