import AdminRequest from '../models/AdminRequest.js'
import User from '../models/User.js'
import sequelize from '../config/database.js'

const resetAdminRequest = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connected')

    const standardEmail = 'successbridge27@gmail.com'
    
    // Remove any existing admin user with this email
    const existingUser = await User.findOne({ where: { email: standardEmail } })
    if (existingUser) {
      await existingUser.destroy()
      console.log(`🗑️  Removed existing user: ${standardEmail}`)
    }

    // Remove any existing admin request
    const existingRequest = await AdminRequest.findOne({ where: { email: standardEmail } })
    if (existingRequest) {
      await existingRequest.destroy()
      console.log(`🗑️  Removed existing admin request: ${standardEmail}`)
    }

    // Also clean up the old test admin
    const oldTestAdmin = await User.findOne({ where: { email: 'tolesatesfaye327@gmail.com' } })
    if (oldTestAdmin) {
      await oldTestAdmin.destroy()
      console.log(`🗑️  Removed old test admin: tolesatesfaye327@gmail.com`)
    }

    const oldTestRequest = await AdminRequest.findOne({ where: { email: 'tolesatesfaye327@gmail.com' } })
    if (oldTestRequest) {
      await oldTestRequest.destroy()
      console.log(`🗑️  Removed old test admin request: tolesatesfaye327@gmail.com`)
    }

    await sequelize.close()
    console.log('✅ Database connection closed')
    console.log('🔄 Ready for new admin request workflow')
    
  } catch (error) {
    console.error('❌ Error resetting admin request:', error)
    process.exit(1)
  }
}

resetAdminRequest()