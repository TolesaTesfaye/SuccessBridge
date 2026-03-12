import * as bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const seedSuperAdmin = async () => {
  try {
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'tolesatesfaye273@gmail.com'
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || '702512@Tol'
    const superAdminName = process.env.SUPER_ADMIN_NAME || 'Super Admin'

    // Check if super admin already exists
    const existingAdmin = await User.findOne({ where: { email: superAdminEmail } })
    
    if (existingAdmin) {
      console.log('Super admin already exists')
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(superAdminPassword, 10)

      // Create super admin
      await User.create({
        email: superAdminEmail,
        name: superAdminName,
        password: hashedPassword,
        role: 'super_admin',
      } as any)

      console.log(`✅ Super admin created: ${superAdminEmail}`)
    }

    // Also seed a test admin user
    const adminEmail = 'admin@successbridge.com'
    const adminPassword = 'Admin123!'
    const adminName = 'Test Admin'

    const existingTestAdmin = await User.findOne({ where: { email: adminEmail } })
    
    if (existingTestAdmin) {
      console.log('Test admin already exists')
    } else {
      const hashedAdminPassword = await bcrypt.hash(adminPassword, 10)

      await User.create({
        email: adminEmail,
        name: adminName,
        password: hashedAdminPassword,
        role: 'admin',
      } as any)

      console.log(`✅ Test admin created: ${adminEmail}`)
      console.log(`   Password: ${adminPassword}`)
    }
  } catch (error) {
    console.error('Error seeding admins:', error)
  }
}
