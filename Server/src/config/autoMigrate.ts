/**
 * Auto-run migration on server startup
 * Adds freemium columns if they don't exist
 */

import sequelize from './database.js';

export async function autoMigrate() {
  console.log('\n🔄 Running freemium database migration...\n');

  try {
    console.log('⚡ Adding freemium columns to users table...\n');

    // Add columns if they don't exist (use IF NOT EXISTS to be safe)
    await sequelize.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS free_downloads_used INTEGER DEFAULT 0 NOT NULL
    `);
    console.log('✅ Added/verified free_downloads_used column');

    await sequelize.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS free_downloads_limit INTEGER DEFAULT 15 NOT NULL
    `);
    console.log('✅ Added/verified free_downloads_limit column');

    await sequelize.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS has_premium BOOLEAN DEFAULT false NOT NULL
    `);
    console.log('✅ Added/verified has_premium column');

    // Optional admin-provided preview image for resources
    await sequelize.query(`
      ALTER TABLE resources
      ADD COLUMN IF NOT EXISTS preview_image_url VARCHAR(1024)
    `);
    console.log('✅ Added/verified preview_image_url column');

    // Create download_history table
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS download_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        resource_id VARCHAR(255) NOT NULL,
        resource_name VARCHAR(500) NOT NULL,
        resource_type VARCHAR(100),
        downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        was_free BOOLEAN NOT NULL DEFAULT true,
        user_download_count INTEGER NOT NULL DEFAULT 0,
        category VARCHAR(255),
        ip_address VARCHAR(50),
        user_agent TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    console.log('✅ Created/verified download_history table');

    // Create indexes
    await sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_download_history_user_id ON download_history(user_id);
      CREATE INDEX IF NOT EXISTS idx_download_history_resource_id ON download_history(resource_id);
      CREATE INDEX IF NOT EXISTS idx_download_history_downloaded_at ON download_history(downloaded_at DESC);
      CREATE INDEX IF NOT EXISTS idx_users_has_premium ON users(has_premium);
      CREATE INDEX IF NOT EXISTS idx_users_free_downloads ON users(free_downloads_used, free_downloads_limit);
    `);
    console.log('✅ Created indexes');

    // Update existing paid users to premium
    const [updateResult]: any = await sequelize.query(`
      UPDATE users 
      SET has_premium = true
      WHERE id IN (
        SELECT DISTINCT user_id 
        FROM student_category_access 
        WHERE status = 'active'
      )
      AND has_premium = false
    `);
    console.log(`✅ Updated ${updateResult?.rowCount || 0} existing paid users to premium`);

    console.log('\n🎉 Freemium migration completed successfully!\n');
    console.log('📊 Features activated:');
    console.log('   → 15 free downloads per user');
    console.log('   → Premium users get unlimited access');
    console.log('   → Download tracking and analytics\n');

  } catch (error: any) {
    console.error('❌ Auto-migration failed:', error.message);
    console.error('⚠️  Server will continue but freemium features may not work\n');
    // Don't throw - let server start anyway
  }
}
