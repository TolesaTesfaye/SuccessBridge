import sequelize from '../config/database.js'
import { QueryInterface, DataTypes } from 'sequelize'

/**
 * Migration script to add email verification fields to users table
 * Run with: npm run migrate:email-verification
 */
async function migrateEmailVerification() {
  try {
    console.log('🔄 Starting email verification migration...')
    
    // Connect to database
    await sequelize.authenticate()
    console.log('✅ Database connected')

    const queryInterface: QueryInterface = sequelize.getQueryInterface()
    const tableName = 'users'

    // Check if columns already exist
    const tableDescription = await queryInterface.describeTable(tableName)
    
    // Add isEmailVerified column if it doesn't exist
    if (!tableDescription.isEmailVerified) {
      console.log('📝 Adding isEmailVerified column...')
      await queryInterface.addColumn(tableName, 'isEmailVerified', {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      })
      console.log('✅ isEmailVerified column added')
    } else {
      console.log('⏭️  isEmailVerified column already exists')
    }

    // Add emailVerificationToken column if it doesn't exist
    if (!tableDescription.emailVerificationToken) {
      console.log('📝 Adding emailVerificationToken column...')
      await queryInterface.addColumn(tableName, 'emailVerificationToken', {
        type: DataTypes.STRING(255),
        allowNull: true,
      })
      console.log('✅ emailVerificationToken column added')
    } else {
      console.log('⏭️  emailVerificationToken column already exists')
    }

    // Add emailVerificationExpires column if it doesn't exist
    if (!tableDescription.emailVerificationExpires) {
      console.log('📝 Adding emailVerificationExpires column...')
      await queryInterface.addColumn(tableName, 'emailVerificationExpires', {
        type: DataTypes.DATE,
        allowNull: true,
      })
      console.log('✅ emailVerificationExpires column added')
    } else {
      console.log('⏭️  emailVerificationExpires column already exists')
    }

    // Add index for faster token lookups
    try {
      console.log('📝 Adding index on emailVerificationToken...')
      await queryInterface.addIndex(tableName, ['emailVerificationToken'], {
        name: 'idx_users_email_verification_token',
      })
      console.log('✅ Index added')
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        console.log('⏭️  Index already exists')
      } else {
        console.warn('⚠️  Could not add index:', error.message)
      }
    }

    console.log('\n✅ Email verification migration completed successfully!')
    console.log('\n📋 Summary:')
    console.log('   - isEmailVerified: Boolean field to track verification status')
    console.log('   - emailVerificationToken: Token for email verification')
    console.log('   - emailVerificationExpires: Token expiration timestamp')
    console.log('\n💡 Next steps:')
    console.log('   1. Restart your server to use the new fields')
    console.log('   2. Test registration to see verification emails in console')
    console.log('   3. Configure SMTP settings to send real emails (optional)')

    await sequelize.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    await sequelize.close()
    process.exit(1)
  }
}

// Run migration
migrateEmailVerification()
