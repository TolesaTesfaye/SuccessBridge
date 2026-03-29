import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

// Test connection function
export const testConnection = async (sequelize: Sequelize, connectionName: string) => {
  try {
    console.log(`🔍 Testing ${connectionName} connection...`)
    console.log(`📍 Host: ${process.env.DB_HOST}`)
    console.log(`🔌 Port: ${process.env.DB_PORT}`)
    console.log(`🗄️  Database: ${process.env.DB_NAME}`)
    console.log(`👤 User: ${process.env.DB_USER}`)
    console.log(`🔐 Password: ${process.env.DB_PASSWORD ? '[SET]' : '[NOT SET]'}`)
    
    await sequelize.authenticate()
    console.log(`✅ ${connectionName} connection successful!`)
    return true
  } catch (error: any) {
    console.error(`❌ ${connectionName} connection failed:`, error.message)
    console.error('🔍 Error details:', {
      code: error.code,
      errno: error.errno,
      syscall: error.syscall,
      hostname: error.hostname
    })
    return false
  }
}

// Create sequelize instance with fallback
const createSequelizeInstance = () => {
  // Primary configuration (Supabase)
  const primaryConfig = {
    dialect: 'postgres' as const,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'successbridge',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      ssl: process.env.DB_HOST?.includes('supabase.co') ? {
        require: true,
        rejectUnauthorized: false
      } : false,
      family: 4, // Force IPv4
      connectTimeout: 10000, // 10 seconds timeout
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    retry: {
      match: [
        /ECONNRESET/,
        /ENOTFOUND/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
      ],
      max: 3
    }
  }

  // Fallback configuration (Local PostgreSQL)
  const fallbackConfig = {
    dialect: 'postgres' as const,
    host: 'localhost',
    port: 5432,
    database: 'successbridge',
    username: 'postgres',
    password: 'password',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    }
  }

  // Try primary first, then fallback
  try {
    console.log('🔄 Attempting primary database connection (Supabase)...')
    return new Sequelize(primaryConfig)
  } catch (error) {
    console.warn('⚠️  Primary connection failed, using fallback configuration')
    return new Sequelize(fallbackConfig)
  }
}

// Create the sequelize instance
const sequelize = createSequelizeInstance()

// Enhanced test function for the main instance
export const testMainConnection = async () => {
  const isSupabase = process.env.DB_HOST?.includes('supabase.co')
  const connectionName = isSupabase ? 'Supabase' : 'Local PostgreSQL'
  
  const success = await testConnection(sequelize, connectionName)
  
  if (!success && isSupabase) {
    console.log('🔄 Supabase connection failed, you may need to:')
    console.log('   1. Check if your Supabase project is active')
    console.log('   2. Verify the connection string in Supabase dashboard')
    console.log('   3. Try using a local PostgreSQL database')
    console.log('   4. Check your internet connection')
  }
  
  return success
}

export default sequelize
