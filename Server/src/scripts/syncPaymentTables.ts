/**
 * Script to manually sync Payment and SubjectAccess tables
 * Run this if the tables are not being created automatically
 * 
 * Usage: npx tsx src/scripts/syncPaymentTables.ts
 */

import dotenv from 'dotenv'
import sequelize from '../config/database.js'
import Payment from '../models/Payment.js'
import SubjectAccess from '../models/SubjectAccess.js'
import { logger } from '../utils/logger.js'

dotenv.config()

async function syncPaymentTables() {
  try {
    logger.info('🔄 Starting payment tables sync...')

    // Test database connection
    await sequelize.authenticate()
    logger.success('✅ Database connection established')

    // Sync Payment table
    logger.info('📦 Syncing Payment table...')
    await Payment.sync({ alter: true })
    logger.success('✅ Payment table synced')

    // Sync SubjectAccess table
    logger.info('📦 Syncing SubjectAccess table...')
    await SubjectAccess.sync({ alter: true })
    logger.success('✅ SubjectAccess table synced')

    // Verify tables exist
    const [paymentCount] = await sequelize.query(
      "SELECT COUNT(*) as count FROM information_schema.tables WHERE table_name = 'payments'"
    )
    const [subjectAccessCount] = await sequelize.query(
      "SELECT COUNT(*) as count FROM information_schema.tables WHERE table_name = 'subject_access'"
    )

    logger.info('📊 Verification:')
    logger.info(`   - payments table: ${(paymentCount as any)[0].count > 0 ? '✅ EXISTS' : '❌ NOT FOUND'}`)
    logger.info(`   - subject_access table: ${(subjectAccessCount as any)[0].count > 0 ? '✅ EXISTS' : '❌ NOT FOUND'}`)

    logger.success('🎉 Payment tables sync completed successfully!')
    process.exit(0)
  } catch (error) {
    logger.error('❌ Payment tables sync failed:', error)
    process.exit(1)
  }
}

syncPaymentTables()
