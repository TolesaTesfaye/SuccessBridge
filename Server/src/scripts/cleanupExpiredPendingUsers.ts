import { Op } from 'sequelize';
import PendingUser from '../models/PendingUser.js';
import sequelize from '../config/database.js';

/**
 * Cleanup script to remove expired pending user registrations
 * This should be run periodically (e.g., via cron job)
 */
async function cleanupExpiredPendingUsers() {
  try {
    await sequelize.authenticate();
    console.log('🔄 Cleaning up expired pending users...');

    const result = await PendingUser.destroy({
      where: {
        verificationExpires: {
          [Op.lt]: new Date(),
        },
      },
    });

    console.log(`✅ Cleaned up ${result} expired pending user(s)`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error cleaning up pending users:', error);
    process.exit(1);
  }
}

// Run cleanup
cleanupExpiredPendingUsers();
