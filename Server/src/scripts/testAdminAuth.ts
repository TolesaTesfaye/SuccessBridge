/**
 * Test script to verify admin authorization
 * Run with: npm run test:admin-auth
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

import { isAuthorizedAdmin, getAllAdminTelegramIds } from '../bot/utils/adminAuth.js';
import sequelize from '../config/database.js';
import User from '../models/User.js';

async function testAdminAuth() {
  console.log('\n🔐 ADMIN AUTHORIZATION TEST\n');
  console.log('═'.repeat(50));

  try {
    // Test database connection
    console.log('\n📊 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Show environment variables
    console.log('🌍 Environment Variables:');
    console.log('   SUPERADMIN_TELEGRAM_ID:', process.env.SUPERADMIN_TELEGRAM_ID || '❌ NOT SET');
    console.log('   ADMIN_TELEGRAM_ID:', process.env.ADMIN_TELEGRAM_ID || '(not set)');
    console.log('   NODE_ENV:', process.env.NODE_ENV);
    console.log('   ENABLE_TELEGRAM_BOT:', process.env.ENABLE_TELEGRAM_BOT);
    console.log('');

    // Get all admin IDs
    console.log('📋 All Admin Telegram IDs:');
    const allAdminIds = await getAllAdminTelegramIds();
    if (allAdminIds.length === 0) {
      console.log('   ❌ No admin IDs found!');
    } else {
      allAdminIds.forEach(id => console.log(`   ✅ ${id}`));
    }
    console.log('');

    // Test specific ID
    const testId = process.env.SUPERADMIN_TELEGRAM_ID || '2123391764';
    console.log(`🧪 Testing authorization for ID: ${testId}`);
    const isAuthorized = await isAuthorizedAdmin(testId);
    console.log(`   Result: ${isAuthorized ? '✅ AUTHORIZED' : '❌ NOT AUTHORIZED'}`);
    console.log('');

    // Check database for admin users
    console.log('👥 Admin Users in Database:');
    const adminUsers = await User.findAll({
      where: {
        role: ['admin', 'super_admin']
      },
      attributes: ['id', 'email', 'name', 'role', 'telegramId', 'isActive', 'isApproved']
    });

    if (adminUsers.length === 0) {
      console.log('   ❌ No admin users found in database');
    } else {
      adminUsers.forEach(user => {
        console.log(`   • ${user.email}`);
        console.log(`     Role: ${user.role}`);
        console.log(`     Telegram ID: ${user.telegramId || '❌ NOT LINKED'}`);
        console.log(`     Active: ${user.isActive ? '✅' : '❌'}`);
        console.log(`     Approved: ${user.isApproved ? '✅' : '❌'}`);
        console.log('');
      });
    }

    console.log('═'.repeat(50));
    console.log('✅ Test completed\n');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await sequelize.close();
  }
}

// Run test
testAdminAuth();
