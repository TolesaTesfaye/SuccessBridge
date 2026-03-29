import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import sequelize from '../config/database.js'

const sampleAdmins = [
  {
    name: 'SuccessBridge Admin',
    email: 'successbirdge27@gmail.com',
    password: 'sb123409987',
    university: 'Addis Ababa University',
    department: 'Computer Science',
    documents: ['CV.pdf', 'Degree_Certificate.pdf', 'ID_Card.pdf', 'Teaching_License.pdf']
  },
  {
    name: 'Dr. Ahmed Hassan',
    email: 'ahmed.hassan@jimma.edu.et',
    password: '702512@Tol',
    university: 'Jimma University',
    department: 'Computer Science',
    documents: ['CV.pdf', 'Degree_Certificate.pdf', 'ID_Card.pdf']
  },
  {
    name: 'Prof. Sarah Bekele',
    email: 'sarah.bekele@aau.edu.et',
    password: '702512@Tol',
    university: 'Addis Ababa University',
    department: 'Mathematics',
    documents: ['CV.pdf', 'PhD_Certificate.pdf']
  },
  {
    name: 'Dr. Mulugeta Tadesse',
    email: 'mulugeta.t@bdu.edu.et',
    password: '702512@Tol',
    university: 'Bahir Dar University',
    department: 'Physics',
    documents: ['CV.pdf', 'Masters_Certificate.pdf', 'Recommendation.pdf']
  }
]

async function seedPendingAdmins() {
  try {
    console.log('🌱 Seeding pending admin requests...')

    // Connect to database
    await sequelize.authenticate()
    console.log('✅ Database connected')

    // Create pending admin accounts
    for (const adminData of sampleAdmins) {
      const existingUser = await User.findOne({ where: { email: adminData.email } })
      
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(adminData.password, 10)
        
        await User.create({
          name: adminData.name,
          email: adminData.email,
          password: hashedPassword,
          role: 'admin',
          university: adminData.university,
          department: adminData.department,
          documents: adminData.documents,
          isApproved: false,
          approvalStatus: 'pending'
        } as any)
        
        console.log(`✅ Created pending admin: ${adminData.name}`)
      } else {
        console.log(`⚠️  Admin already exists: ${adminData.name}`)
      }
    }

    console.log('🎉 Pending admin seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding pending admins:', error)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedPendingAdmins()
}

export default seedPendingAdmins