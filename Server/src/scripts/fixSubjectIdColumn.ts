/**
 * Script to fix the subjectId column in payments table
 * Makes it nullable for the "one payment unlocks all" model
 * 
 * Usage: npx tsx src/scripts/fixSubjectIdColumn.ts
 */

import dotenv from 'dotenv'
import sequelize from '../config/database.js'
import { logger } from '../utils/logger.js'

dotenv.config()

async function fixSubjectIdColumn() {
  try {
    logger.info('🔄 Fixing subjectId column in payments table...')

    // Test database connection
    await sequelize.authenticate()
    logger.success('✅ Database connection established')

    // Make subjectId nullable
    await sequelize.query(`
      ALTER TABLE payments 
      ALTER COLUMN "subjectId" DROP NOT NULL;
    `)

    logger.success('✅ subjectId column is now nullable')

    // Verify the change
    const [result] = await sequelize.query(`
      SELECT column_name, is_nullable, data_type
      FROM information_schema.columns
      WHERE table_name = 'payments' AND column_name = 'subjectId';
    `)

    logger.info('📊 Column info:', result)

    logger.success('🎉 Fix completed successfully!')
    process.exit(0)
  } catch (error) {
    logger.error('❌ Fix failed:', error)
    process.exit(1)
  }
}

fixSubjectIdColumn()
