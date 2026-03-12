import * as bcrypt from 'bcryptjs'
import User from '../models/User'
import sequelize from '../config/database'

const createAdminUser = async () => {
  try {
    await sequelize.sync()

    const adminEmail = 'admin@successbridge.com'
    const adminPassword = 'Admin123!'
    const adminName = 'Test Admin'

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: adminEmail } })

    if (existingAdmin) {
      console.log('❌ Admin user already exists with this email')
      process.exit(0)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    // Create admin user
    await User.create({
      email: adminEmail,
      name: adminName,
      password: hashedPassword,
      role: 'admin',
      // Add university/department if needed
      // universityId: 1,
      // departmentId: 1,
    } as any)

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', adminEmail)
    console.log('🔑 Password:', adminPassword)
    console.log('\nYou can now log in with these credentials.')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

createAdminUser()
