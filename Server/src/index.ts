import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { Op } from 'sequelize'
import sequelize, { testMainConnection } from './config/database.js'
import { connectRedis } from './config/redis.js'
import { seedSuperAdmin } from './config/seedAdmin.js'
import { setupSwagger } from './config/swagger.js'
import { errorHandler } from './middleware/errorHandler.js'
import { logger } from './utils/logger.js'
import passport from './config/passport.js'
import authRoutes from './routes/auth.js'
import resourceRoutes from './routes/resources.js'
import userRoutes from './routes/users.js'
import subjectsRoutes from './routes/subjects.js'
import quizzesRoutes from './routes/quizzes.js'
import universitiesRoutes from './routes/universities.js'
import departmentsRoutes from './routes/departments.js'
import studentRoutes from './routes/student.js'
import settingsRoutes from './routes/settings.js'
import gradesRoutes from './routes/grades.js'
import systemRoutes from './routes/system.js'

// Import all models to ensure they are registered with Sequelize
import User from './models/User.js'
import AdminRequest from './models/AdminRequest.js'
import PendingUser from './models/PendingUser.js'
import Resource from './models/Resource.js'
import Subject from './models/Subject.js'
import Quiz from './models/Quiz.js'
import QuizResult from './models/QuizResult.js'
import University from './models/University.js'
import Grade from './models/Grade.js'
import Stream from './models/Stream.js'
import Department from './models/Department.js'
import StudentProgress from './models/StudentProgress.js'
import ResourceAccess from './models/ResourceAccess.js'
import { setupAssociations } from './models/index.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(passport.initialize())

// Setup Swagger documentation (only in development)
if (process.env.NODE_ENV === 'development') {
  setupSwagger(app)
}

// Static files - ensure upload directory exists
const setupUploads = () => {
  const uploadDir = process.env.UPLOAD_DIR || './uploads'
  const resolvedUploadDir = path.resolve(uploadDir)
  
  console.log('🗂️ Setting up uploads directory:', resolvedUploadDir)
  
  try {
    if (!fs.existsSync(resolvedUploadDir)) {
      fs.mkdirSync(resolvedUploadDir, { recursive: true })
      console.log('✅ Created uploads directory:', resolvedUploadDir)
    } else {
      console.log('✅ Uploads directory exists:', resolvedUploadDir)
    }
    
    // Serve static files from uploads directory
    app.use('/uploads', express.static(resolvedUploadDir))
    console.log('✅ Static file serving configured for /uploads ->', resolvedUploadDir)
    
  } catch (error) {
    console.error('❌ Upload directory setup failed:', error)
  }
}

setupUploads()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/users', userRoutes)
app.use('/api/subjects', subjectsRoutes)
app.use('/api/quizzes', quizzesRoutes)
app.use('/api/universities', universitiesRoutes)
app.use('/api/departments', departmentsRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/grades', gradesRoutes)
app.use('/api/system', systemRoutes)

// Health check
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    await sequelize.authenticate()
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV || 'development'
    })
  } catch (error) {
    res.status(503).json({ 
      status: 'ERROR', 
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: 'Database connection failed'
    })
  }
})

// Error handling
app.use(errorHandler)

// Database connection and server start
const startServer = async () => {
  try {
    logger.info('Starting SuccessBridge server...')
    
    // Setup model associations
    setupAssociations()

    // Test database connection with enhanced handling
    const connectionSuccess = await testMainConnection()
    
    if (!connectionSuccess) {
      logger.warn('⚠️  Database connection failed, starting server in limited mode')
      logger.warn('   - Health check will show database as disconnected')
      logger.warn('   - Some features may not work properly')
      logger.warn('   - Fix database connection and restart server')
    } else {
      // Only sync and seed if database connection is successful
      try {
        // Sync models (use alter only in development)
        await sequelize.sync({ 
          alter: process.env.NODE_ENV === 'development',
          logging: console.log // Enable logging to see what's happening
        })
        logger.database('Models synced')

        // Seed super admin (only if not exists)
        await seedSuperAdmin()
        logger.info('Super admin checked/seeded')
      } catch (syncError) {
        logger.error('Database sync/seed failed:', syncError)
        logger.warn('Server will start but database operations may fail')
      }
    }

    // Connect to Redis (optional, don't fail if Redis is unavailable)
    try {
      await connectRedis()
    } catch (redisError) {
      logger.warn('Redis connection failed, continuing without Redis')
    }

    // Start the server regardless of database status
    app.listen(PORT, () => {
      logger.server(`Server running on port ${PORT}`)
      if (process.env.NODE_ENV === 'development') {
        logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`)
      }
      logger.info(`🔍 Health check: http://localhost:${PORT}/health`)
      
      if (connectionSuccess) {
        logger.success('SuccessBridge server started successfully with database!')
        
        // Start periodic cleanup of expired pending users (every hour)
        setInterval(async () => {
          try {
            const result = await PendingUser.destroy({
              where: {
                verificationExpires: {
                  [Op.lt]: new Date(),
                },
              },
            });
            if (result > 0) {
              logger.info(`🧹 Cleaned up ${result} expired pending user(s)`);
            }
          } catch (error) {
            logger.error('Error cleaning up pending users:', error);
          }
        }, 60 * 60 * 1000); // Run every hour
      } else {
        logger.warn('SuccessBridge server started in limited mode (no database)')
        logger.info('Fix database connection and restart for full functionality')
      }
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    
    // Try to start server without database as last resort
    try {
      logger.warn('Attempting to start server without database...')
      app.listen(PORT, () => {
        logger.server(`Server running on port ${PORT} (NO DATABASE)`)
        logger.warn('Fix database connection and restart for full functionality')
      })
    } catch (finalError) {
      logger.error('Complete server startup failure:', finalError)
      process.exit(1)
    }
  }
}

startServer()

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully')
  try {
    await sequelize.close()
    logger.info('Database connection closed')
    process.exit(0)
  } catch (error) {
    logger.error('Error during shutdown:', error)
    process.exit(1)
  }
})

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully')
  try {
    await sequelize.close()
    logger.info('Database connection closed')
    process.exit(0)
  } catch (error) {
    logger.error('Error during shutdown:', error)
    process.exit(1)
  }
})

export default app
