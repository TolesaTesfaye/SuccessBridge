import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import sequelize from '../config/database.js'

async function addRealAdminRequests() {
  try {
    console.log('🔧 Adding real admin requests to database...')

    // Connect to database
    await sequelize.authenticate()
    console.log('✅ Database connected')

    const adminRequests = [
      {
        name: 'Dr. Ahmed Hassan',
        email: 'ahmed.hassan@jimma.edu.et',
        password: await bcrypt.hash('admin123', 10),
        university: 'Jimma University',
        department: 'Computer Science',
        documents: ['CV.pdf', 'Degree_Certificate.pdf', 'ID_Card.pdf'],
        createdAt: new Date('2026-03-08')
      },
      {
        name: 'Prof. Sarah Bekele',
        email: 'sarah.bekele@aau.edu.et',
        password: await bcrypt.hash('admin123', 10),
        university: 'Addis Ababa University',
        department: 'Mathematics',
        documents: ['CV.pdf', 'PhD_Certificate.pdf'],
        createdAt: new Date('2026-03-07')
      },
      {
        name: 'Dr. Mulugeta Tadesse',
        email: 'mulugeta.t@bdu.edu.et',
        password: await bcrypt.hash('admin123', 10),
        university: 'Bahir Dar University',
        department: 'Physics',
        documents: ['CV.pdf', 'Masters_Certificate.pdf', 'Recommendation.pdf'],
        createdAt: new Date('2026-03-06')
      }
    ]

    // Create each admin request
    for (const adminData of adminRequests) {
      const existingUser = await User.findOne({ where: { email: adminData.email } })
      
      if (!existingUser) {
        await User.create({
          name: adminData.name,
          email: adminData.email,
          password: adminData.password,
          role: 'admin',
          university: adminData.university,
          department: adminData.department,
          documents: adminData.documents,
          isApproved: false,
          approvalStatus: 'pending',
          createdAt: adminData.createdAt,
          updatedAt: adminData.createdAt
        } as any)
        
        console.log(`✅ Added real admin request: ${adminData.name}`)
      } else {
        // Update existing user to pending status if needed
        if (existingUser.approvalStatus !== 'pending') {
          await existingUser.update({
            approvalStatus: 'pending',
            isApproved: false,
            university: adminData.university,
            department: adminData.department,
            documents: adminData.documents,
            createdAt: adminData.createdAt
          })
          console.log(`✅ Updated existing user to pending: ${adminData.name}`)
        } else {
          console.log(`ℹ️  Admin request already exists: ${adminData.name}`)
        }
      }
    }

    console.log('🎉 Real admin requests added to database!')
    console.log('👉 Now login as super admin and check the Approvals tab!')
    
    await sequelize.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error adding admin requests:', error)
    process.exit(1)
  }
}

addRealAdminRequests()