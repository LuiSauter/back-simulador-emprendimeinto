import mongoose from 'mongoose'
import config from './config.js'

const connectionString = config.MONGODB_URI

if (connectionString === '') {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

export default async function connectDB() {
  await mongoose.connect(connectionString)
}

mongoose.connection.once('open', () => {
  console.log('Database mongoDB connection stablished on "simulador-emprendimiento"')
})

mongoose.connection.on('error', (error) => {
  console.error(error.message)
  process.exit(0)
})

connectDB().catch(console.error)
