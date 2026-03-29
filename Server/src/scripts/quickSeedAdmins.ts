import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import sequelize from '../config/database.js'

async function quickSeedAdmins() {
  try {
    console.log('🌱 Creating sample admin requests...')

    // Connect to database
    await sequelize.authenticate()
    console.log('✅ Database connected')

    const sampleAdmins = [
      {
        name: 'Dr. Ahmed Hassan',
        email: 'ahmed.hassan@jimma.edu.et',
        password: await bcrypt.hash('password123', 10),
        university: 'Jimma University',
        department: 'Computer Science',
        documents: ['CV.pdf', 'Degree_Certificate.pdf', 'ID_Card.pdf']
      },
      {
        name: 'Prof. Sarah Bekele',
        email: 'sarah.bekele@aau.edu.et',
        password: await bcrypt.hash('password123', 10),
        university: 'Addis Ababa University',
        department: 'Mathematics',
        documents: ['CV.pdf', 'PhD_Certificate.pdf']
      },
      {
        name: 'Dr. Mulugeta Tadesse',
        email: 'mulugeta.t@bdu.edu.et',
        password: await bcrypt.hash('password123', 10),
        university: 'Bahir Dar University',
        department: 'Physics',
        documents: ['CV.pdf', 'Masters_Certificate.pdf', 'Recommendation.pdf']
      }
    ]

    // Create each admin
    for (const adminData of sampleAdmins) {
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
          approvalStatus: 'pending'
        } as any)
        
        console.log(`✅ Created: ${adminData.name}`)
      } else {
        console.log(`⚠️  Already exists: ${adminData.name}`)
      }
    }

    console.log('🎉 Sample admin requests created!')
    console.log('👉 Now login as super admin and check the Approvals tab!')
    
    await sequelize.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

quickSeedAdmins()