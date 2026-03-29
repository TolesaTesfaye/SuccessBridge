import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import AdminRequest from '../models/AdminRequest.js'

export const seedSuperAdmin = async () => {
  try {
    // Super Admin Credentials
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'tolesatesfaye273@gmail.com'
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || '702512@Tol'
    const superAdminName = process.env.SUPER_ADMIN_NAME || 'Tolesa Tesfaye'

    // Check if super admin already exists
    const existingAdmin = await User.findOne({ where: { email: superAdminEmail } })
    
    if (existingAdmin) {
      console.log('✅ Super admin already exists:', superAdminEmail)
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
      console.log(`   Password: ${superAdminPassword}`)
    }

    // Standard Admin Request Credentials (all admins use these to request access)
    const adminEmail = 'successbridge27@gmail.com'
    const adminPassword = 'sb12340987'
    const adminName = 'Admin Candidate' // This will be updated when they submit their request

    // Check if admin request already exists
    const existingAdminRequest = await AdminRequest.findOne({ where: { email: adminEmail } })
    
    if (existingAdminRequest) {
      console.log('✅ Standard admin request already exists:', adminEmail, `(Status: ${existingAdminRequest.status})`)
      if (existingAdminRequest.status === 'pending') {
        console.log('   📋 Waiting for super admin approval')
        console.log('   👤 Candidate:', existingAdminRequest.name)
        console.log('   🏫 University:', existingAdminRequest.university)
        console.log('   📚 Department:', existingAdminRequest.department)
      }
    } else {
      // Hash password for the admin request
      const hashedAdminPassword = await bcrypt.hash(adminPassword, 10)

      // Create standard admin request (pending approval)
      await AdminRequest.create({
        email: adminEmail,
        name: adminName,
        password: hashedAdminPassword,
        university: 'Pending - To be filled by candidate',
        department: 'Pending - To be filled by candidate',
        status: 'pending'
      } as any)

      console.log(`📝 Standard admin request created: ${adminEmail}`)
      console.log(`   Status: Pending - Waiting for candidate to submit details`)
      console.log(`   Password: ${adminPassword}`)
    }

    console.log('\n🎯 LOGIN CREDENTIALS:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🔑 SUPER ADMIN:')
    console.log(`   Email: ${superAdminEmail}`)
    console.log(`   Password: ${superAdminPassword}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📝 STANDARD ADMIN REQUEST CREDENTIALS:')
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Password: ${adminPassword}`)
    console.log(`   Note: All admin candidates use these credentials`)
    console.log(`   Process: Submit request → Super admin reviews → Approval`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
  } catch (error) {
    console.error('❌ Error seeding admins:', error)
  }
}
