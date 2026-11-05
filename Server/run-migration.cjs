/**
 * Simple migration runner - Run with: node run-migration.js
 */

require('dotenv').config();
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { Sequelize } = require('sequelize');

async function runMigration() {
  console.log('\n🚀 STARTING DOWNLOAD TRACKING MIGRATION\n');
  console.log('='.repeat(50));

  // Create sequelize instance
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });

  try {
    // Test database connection
    console.log('📊 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully\n');

    // Read migration file
    const migrationPath = resolve(__dirname, 'src/migrations/007_add_download_tracking.sql');
    console.log('📄 Reading migration file:', migrationPath);
    const migrationSQL = readFileSync(migrationPath, 'utf-8');

    // Execute migration
    console.log('⚡ Executing migration...\n');
    await sequelize.query(migrationSQL);

    console.log('\n' + '='.repeat(50));
    console.log('✅ MIGRATION COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(50));
    console.log('\n📊 Summary:');
    console.log('   ✅ Added download tracking columns to users table');
    console.log('   ✅ Created download_history table');
    console.log('   ✅ Created indexes for performance');
    console.log('   ✅ Updated existing paid users to premium');
    console.log('   ✅ Created helper functions');
    console.log('\n🎉 Your bot now supports the freemium model!');
    console.log('   → 15 free downloads per user');
    console.log('   → Premium unlimited access\n');

  } catch (error) {
    console.error('\n❌ MIGRATION FAILED!');
    console.error('='.repeat(50));
    console.error('Error details:', error.message);
    console.error('\nPlease fix the error and try again.\n');
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Run migration
runMigration();
