import User from '../models/User.js'
import sequelize from '../config/database.js'

const removeExistingAdmin = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connected')

    const adminEmail = 'tolesatesfaye327@gmail.com'
    
    // Find and delete the existing admin user
    const existingAdmin = await User.findOne({ where: { email: adminEmail } })
    
    if (existingAdmin) {
      await existingAdmin.destroy()
      console.log(`🗑️  Removed existing admin user: ${adminEmail}`)
      console.log('   This admin will now need to go through the approval process')
    } else {
      console.log(`ℹ️  No existing admin found with email: ${adminEmail}`)
    }

    await sequelize.close()
    console.log('✅ Database connection closed')
    
  } catch (error) {
    console.error('❌ Error removing admin:', error)
    process.exit(1)
  }
}

removeExistingAdmin()