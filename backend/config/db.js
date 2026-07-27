import dns from 'dns'
import mongoose from 'mongoose'

// Works around a common Node-on-Windows issue where Node's own DNS resolver
// fails 'mongodb+srv://' SRV lookups (ECONNREFUSED) even though the OS
// resolver works fine — usually caused by a VPN/secondary network adapter.
// Forcing known-good public resolvers here fixes it without touching the
// connection string or OS network settings.
dns.setServers(['8.8.8.8', '1.1.1.1'])

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB

