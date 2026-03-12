import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './config/database.js'
import { initializeDatabase } from './config/initDb.js'
import { seedSuperAdmin } from './config/seedAdmin.js'
import { setupSwagger } from './config/swagger.js'
import { errorHandler } from './middleware/errorHandler.js'
import { logger } from './utils/logger.js'
import authRoutes from './routes/auth.js'
import resourceRoutes from './routes/resources.js'
import userRoutes from './routes/users.js'
import subjectsRoutes from './routes/subjects.js'
import quizzesRoutes from './routes/quizzes.js'
import universitiesRoutes from './routes/universities.js'
import departmentsRoutes from './routes/departments.js'
import studentRoutes from './routes/student.js'

// Import all models to ensure they are registered with Sequelize
import User from './models/User.js'
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
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Setup Swagger documentation
setupSwagger(app)

// Static files
app.use('/uploads', express.static(process.env.UPLOAD_DIR || './uploads'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/users', userRoutes)
app.use('/api/subjects', subjectsRoutes)
app.use('/api/quizzes', quizzesRoutes)
app.use('/api/universities', universitiesRoutes)
app.use('/api/departments', departmentsRoutes)
app.use('/api/student', studentRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling
app.use(errorHandler)

// Database connection and server start
const startServer = async () => {
  try {
    logger.info('Starting SuccessBridge server...')
    
    // Initialize database (create if not exists)
    await initializeDatabase()
    logger.database('Database initialized')

    // Setup model associations
    setupAssociations()

    await sequelize.authenticate()
    logger.database('Connected successfully')

    await sequelize.sync({ 
      alter: process.env.NODE_ENV === 'development',
      logging: false // Disable sync logging
    })
    logger.database('Models synced')

    // Seed super admin
    await seedSuperAdmin()
    logger.info('Super admin seeded')

    app.listen(PORT, () => {
      logger.server(`Server running on port ${PORT}`)
      logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`)
      logger.info(`🔍 Health check: http://localhost:${PORT}/health`)
      logger.success('SuccessBridge server started successfully!')
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app
