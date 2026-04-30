import sequelize from '../config/database.js'
import PendingUser from '../models/PendingUser.js'
import { QueryTypes } from 'sequelize'

/**
 * Ensure PendingUser table exists with correct schema
 * Run this script on production to create/update the table
 */
const ensurePendingUsersTable = async () => {
  try {
    console.log('🔄 Checking PendingUser table...')
    
    // Force sync this specific table (will create if not exists, update if schema changed)
    await PendingUser.sync({ alter: true })
    
    console.log('✅ PendingUser table is ready')
    
    // Test the table by checking its structure
    const tableInfo = await sequelize.query(
      `SELECT column_name, data_type, is_nullable 
       FROM information_schema.columns 
       WHERE table_name = 'pending_users' 
       ORDER BY ordinal_position;`,
      { type: QueryTypes.SELECT }
    )
    
    console.log('📋 Table structure:')
    console.table(tableInfo)
    
    // Check if there are any pending users
    const count = await PendingUser.count()
    console.log(`📊 Current pending users: ${count}`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error ensuring PendingUser table:', error)
    process.exit(1)
  }
}

ensurePendingUsersTable()
