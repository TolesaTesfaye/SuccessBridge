import sequelize from '../config/database.js'
import { logger } from '../utils/logger.js'

/**
 * Run migration to create audit_logs table
 */
export const runAuditMigration = async () => {
  try {
    logger.info('Running audit logs migration...')
    
    // Create audit_logs table
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID,
        action VARCHAR(100) NOT NULL,
        resource VARCHAR(100) NOT NULL,
        resource_id VARCHAR(255),
        details JSONB,
        ip_address VARCHAR(45),
        user_agent TEXT,
        timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'failure')),
        error_message TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    // Create indexes
    await sequelize.query(
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id)'
    )
    await sequelize.query(
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action)'
    )
    await sequelize.query(
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp)'
    )
    await sequelize.query(
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id_timestamp ON audit_logs(user_id, timestamp DESC)'
    )
    await sequelize.query(
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_action_timestamp ON audit_logs(action, timestamp DESC)'
    )
    await sequelize.query(
      'CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource)'
    )
    
    logger.info('✅ Audit logs table and indexes created successfully')
    return true
  } catch (error) {
    logger.error('Error running audit migration:', error)
    return false
  }
}
