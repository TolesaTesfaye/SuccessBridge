import bcrypt from 'bcryptjs'
import AdminRequest from '../models/AdminRequest.js'
import sequelize from '../config/database.js'

async function addDemoAdminRequest() {
  try {
    console.log('🔧 Adding demo admin request...')

    await sequelize.authenticate()
    console.log('✅ Database connected')

    const demoData = {
      name: 'Tolesa Tesfaye',
      email: 'successbirdge27@gmail.com',
      password: await bcrypt.hash('sb123409987', 10),
      university: 'Addis Ababa University',
      department: 'Computer Science',
      documents: ['CV.pdf', 'Degree_Certificate.pdf', 'Teaching_License.pdf'],
      status: 'pending' as const
    }

    const existingRequest = await AdminRequest.findOne({ where: { email: demoData.email } })
    
    if (!existingRequest) {
      await AdminRequest.create(demoData)
      console.log('✅ Demo admin request created!')
      console.log('📧 Email: successbirdge27@gmail.com')
      console.log('🔑 Password: sb123409987')
    } else {
      console.log('⚠️  Admin request already exists')
    }

    console.log('👉 Now login as super admin and check Approvals tab!')
    await sequelize.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

addDemoAdminRequest()