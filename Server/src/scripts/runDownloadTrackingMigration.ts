/**
 * Run Download Tracking Migration
 * Executes migration 007 - Adds freemium model support
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

import sequelize from '../config/database.js';

async function runMigration() {
  console.log('\n🚀 STARTING DOWNLOAD TRACKING MIGRATION\n');
  console.log('='.repeat(50));

  try {
    // Test database connection
    console.log('📊 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully\n');

    // Read migration file
    const migrationPath = resolve(__dirname, '../migrations/007_add_download_tracking.sql');
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
    console.error('Error details:', error);
    console.error('\nPlease fix the error and try again.\n');
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Run migration
runMigration();
