import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

// Multiple connection options for better reliability
const connectionOptions = [
  // Option 1: Individual components (recommended for Supabase)
  {
    name: 'Individual Components',
    config: {
      dialect: 'postgres' as const,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      dialectOptions: {
        ssl: process.env.DB_HOST?.includes('supabase.co') ? {
          require: true,
          rejectUnauthorized: false
        } : false,
        connectTimeout: 60000,
        requestTimeout: 60000,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 60000,
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
        max: 5
      }
    }
  },
  // Option 2: DATABASE_URL (fallback)
  {
    name: 'DATABASE_URL',
    config: process.env.DATABASE_URL ? {
      dialect: 'postgres' as const,
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        },
        connectTimeout: 60000,
        requestTimeout: 60000,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 60000,
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
        max: 5
      }
    } : null
  }
]

// Test connection function
export const testConnection = async (sequelize: Sequelize, optionName: string) => {
  try {
    console.log(`🔍 Testing ${optionName} connection...`)
    console.log(`📍 Host: ${process.env.DB_HOST}`)
    console.log(`🔌 Port: ${process.env.DB_PORT}`)
    console.log(`🗄️  Database: ${process.env.DB_NAME}`)
    console.log(`👤 User: ${process.env.DB_USER}`)
    console.log(`🔐 Password: ${process.env.DB_PASSWORD ? '[SET]' : '[NOT SET]'}`)
    
    await sequelize.authenticate()
    console.log(`✅ ${optionName} connection successful!`)
    return true
  } catch (error: any) {
    console.error(`❌ ${optionName} connection failed:`, error.message)
    console.error('🔍 Error details:', {
      code: error.code,
      errno: error.errno,
      syscall: error.syscall,
      hostname: error.hostname
    })
    return false
  }
}

// Create sequelize instance with fallback options
const createSequelizeInstance = async () => {
  for (const option of connectionOptions) {
    if (!option.config) continue
    
    try {
      console.log(`🔄 Trying ${option.name}...`)
      
      const sequelize = typeof option.config === 'string' 
        ? new Sequelize(option.config, option.config as any)
        : new Sequelize(option.config)
      
      const success = await testConnection(sequelize, option.name)
      if (success) {
        console.log(`✅ Using ${option.name} for database connection`)
        return sequelize
      }
      
      await sequelize.close()
    } catch (error: any) {
      console.error(`❌ ${option.name} failed:`, error.message)
    }
  }
  
  throw new Error('All database connection options failed')
}

// Export the sequelize instance
let sequelize: Sequelize

try {
  sequelize = await createSequelizeInstance()
} catch (error) {
  console.error('❌ Failed to establish database connection:', error)
  // Create a fallback instance for development
  sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'successbridge',
    username: 'postgres',
    password: 'password',
    logging: false
  })
  console.warn('⚠️  Using fallback local database configuration')
}

export default sequelize
export { createSequelizeInstance }