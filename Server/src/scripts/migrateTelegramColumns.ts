import sequelize from '../config/database.js';

export async function ensureUserTelegramColumns() {
  console.log('🔄 Checking users table for Telegram Bot columns...');
  try {
    await sequelize.query(`
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "telegramId" VARCHAR(255);
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "username" VARCHAR(255);
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "firstName" VARCHAR(255);
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "lastName" VARCHAR(255);
    `);

    // Create unique index on telegramId if it doesn't exist
    await sequelize.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "users_telegram_id_unique" ON "users" ("telegramId") WHERE "telegramId" IS NOT NULL;
    `);

    console.log('✅ Users table Telegram Bot columns verified/added successfully.');
  } catch (error) {
    console.error('❌ Failed to ensure Telegram columns on users table:', error);
    throw error;
  }
}

// If run directly via CLI
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('migrateTelegramColumns')) {
  (async () => {
    try {
      await sequelize.authenticate();
      await ensureUserTelegramColumns();
      await sequelize.close();
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}
