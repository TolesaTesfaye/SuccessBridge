import { sequelize } from '../config/database.js';
import User from '../models/User.js';

const telegramId = process.argv[2];

if (!telegramId) {
  console.error('❌ Error: Please provide a Telegram ID');
  console.log('\nUsage: npm run make-admin <telegram-id>');
  console.log('Example: npm run make-admin 123456789');
  console.log('\nTo get your Telegram ID, send /getid to the bot');
  process.exit(1);
}

async function makeAdmin() {
  try {
    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected');

    console.log(`\n🔍 Looking for user with Telegram ID: ${telegramId}`);

    // Find user by telegram ID
    const user = await User.findOne({
      where: { telegramId }
    });

    if (!user) {
      console.error('❌ User not found with that Telegram ID');
      console.log('\n💡 Make sure you have:');
      console.log('   1. Started the bot with /start');
      console.log('   2. Used /getid to get your correct Telegram ID');
      process.exit(1);
    }

    console.log(`\n✅ User found:`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Current Role: ${user.role}`);

    if (user.role === 'super_admin') {
      console.log('\n✅ User is already a super admin!');
      process.exit(0);
    }

    console.log('\n🔄 Updating role to super_admin...');

    user.role = 'super_admin';
    await user.save();

    console.log('✅ Role updated successfully!');
    console.log('\n🎉 You can now use /admin in the Telegram bot');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

makeAdmin();
