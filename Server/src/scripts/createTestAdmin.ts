import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import sequelize from '../config/database.js'

const testAdminData = {
  name: 'SuccessBridge Admin',
  email: 'successbirdge27@gmail.com',
  password: 'sb123409987',
  university: 'Addis Ababa University',
  department: 'Computer Science',
  documents: ['CV.pdf', 'Degree_Certificate.pdf', 'ID_Card.pdf', 'Teaching_License.pdf']
}

async function createTestAdmin() {
  try {
    console.log('🔧 Creating test admin request...')

    // Connect to database
    await sequelize.authenticate()
    console.log('✅ Database connected')

    // Check if admin already exists
    const existingUser = await User.findOne({ where: { email: testAdminData.email } })
    
    if (existingUser) {
      console.log('⚠️  Admin already exists with this email')
      
      // If exists but not pending, update to pending
      if (existingUser.approvalStatus !== 'pending') {
        await existingUser.update({
          approvalStatus: 'pending',
          isApproved: false,
          university: testAdminData.university,
          department: testAdminData.department,
          documents: testAdminData.documents
        })
        console.log('✅ Updated existing admin to pending status')
      } else {
        console.log('ℹ️  Admin is already in pending status')
      }
    } else {
      // Create new admin request
      const hashedPassword = await bcrypt.hash(testAdminData.password, 10)
      
      await User.create({
        name: testAdminData.name,
        email: testAdminData.email,
        password: hashedPassword,
        role: 'admin',
        university: testAdminData.university,
        department: testAdminData.department,
        documents: testAdminData.documents,
        isApproved: false,
        approvalStatus: 'pending'
      } as any)
      
      console.log('✅ Created new pending admin request')
    }

    console.log('🎉 Test admin setup completed!')
    console.log('📧 Email:', testAdminData.email)
    console.log('🔑 Password:', testAdminData.password)
    console.log('🏛️  University:', testAdminData.university)
    console.log('🎓 Department:', testAdminData.department)
    console.log('📄 Documents:', testAdminData.documents.join(', '))
    console.log('')
    console.log('👉 Now login as super admin and check the Approvals tab!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating test admin:', error)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createTestAdmin()
}

export default createTestAdmin