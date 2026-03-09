import bcrypt from 'bcryptjs'
import User from '../models/User'

export const seedSuperAdmin = async () => {
  try {
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'tolesatesfaye273@gmail.com'
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || '702512@Tol'
    const superAdminName = process.env.SUPER_ADMIN_NAME || 'Super Admin'

    // Check if super admin already exists
    const existingAdmin = await User.findOne({ where: { email: superAdminEmail } })
    
    if (existingAdmin) {
      console.log('Super admin already exists')
      return
    }

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
  } catch (error) {
    console.error('Error seeding super admin:', error)
  }
}
