import { sequelize } from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration(migrationFile: string): Promise<void> {
  try {
    console.log(`\n🔄 Running migration: ${migrationFile}`);
    
    const migrationPath = path.join(__dirname, '../migrations', migrationFile);
    
    if (!fs.existsSync(migrationPath)) {
      console.error(`❌ Migration file not found: ${migrationPath}`);
      process.exit(1);
    }

    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('📝 Executing SQL...');
    await sequelize.query(sql);
    
    console.log(`✅ Migration completed successfully: ${migrationFile}\n`);
  } catch (error: any) {
    console.error(`❌ Migration failed: ${migrationFile}`);
    console.error('Error:', error.message);
    if (error.original) {
      console.error('Original error:', error.original.message);
    }
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Starting database migration...\n');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful\n');

    // Run the new migration (v2 - more robust)
    await runMigration('006_create_student_category_access_v2.sql');

    console.log('🎉 All migrations completed successfully!');
    console.log('\n📊 Next steps:');
    console.log('1. Restart your server to load new models');
    console.log('2. Test the payment flow with /botpayment command');
    console.log('3. Configure admin Telegram IDs in .env (SUPERADMIN_TELEGRAM_ID)');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed!');
    console.error('Please fix the errors and try again.');
    process.exit(1);
  }
}

main();
