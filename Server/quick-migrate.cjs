// Quick migration - Simple SQL execution
const { Client } = require('pg');
require('dotenv').config();

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected!\n');

    console.log('⚡ Running migration SQL...\n');
    
    // Add columns
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS free_downloads_used INTEGER DEFAULT 0 NOT NULL,
      ADD COLUMN IF NOT EXISTS free_downloads_limit INTEGER DEFAULT 15 NOT NULL,
      ADD COLUMN IF NOT EXISTS has_premium BOOLEAN DEFAULT false NOT NULL;
    `);
    console.log('✅ Added freemium columns to users table');

    // Create download_history table
    await client.query(`
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
      );
    `);
    console.log('✅ Created download_history table');

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_download_history_user_id ON download_history(user_id);
      CREATE INDEX IF NOT EXISTS idx_download_history_resource_id ON download_history(resource_id);
      CREATE INDEX IF NOT EXISTS idx_download_history_downloaded_at ON download_history(downloaded_at DESC);
      CREATE INDEX IF NOT EXISTS idx_users_has_premium ON users(has_premium);
      CREATE INDEX IF NOT EXISTS idx_users_free_downloads ON users(free_downloads_used, free_downloads_limit);
    `);
    console.log('✅ Created indexes');

    // Update existing paid users
    const result = await client.query(`
      UPDATE users 
      SET has_premium = true
      WHERE id IN (
        SELECT DISTINCT user_id 
        FROM student_category_access 
        WHERE status = 'active'
      )
      AND has_premium = false
      RETURNING id;
    `);
    console.log(`✅ Updated ${result.rowCount} existing paid users to premium`);

    console.log('\n' + '='.repeat(50));
    console.log('✅ MIGRATION COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(50));
    console.log('\n🎉 Freemium model is now active!');
    console.log('   → Users get 15 free downloads');
    console.log('   → Premium users have unlimited access\n');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
