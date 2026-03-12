import sequelize from '../config/database.js'
import { University, Department, Subject, Resource, User } from '../models/index.js'

const seedFreshmanResources = async () => {
  try {
    await sequelize.authenticate()
    console.log('🗄️  Database connected for seeding')

    // Create or find universities
    const universities = await Promise.all([
      University.findOrCreate({
        where: { name: 'Addis Ababa University' },
        defaults: { 
          name: 'Addis Ababa University', 
          location: 'Addis Ababa', 
          email: 'info@aau.edu.et' 
        } as any
      }),
      University.findOrCreate({
        where: { name: 'Jimma University' },
        defaults: { 
          name: 'Jimma University', 
          location: 'Jimma', 
          email: 'info@ju.edu.et' 
        } as any
      }),
      University.findOrCreate({
        where: { name: 'Bahir Dar University' },
        defaults: { 
          name: 'Bahir Dar University', 
          location: 'Bahir Dar', 
          email: 'info@bdu.edu.et' 
        } as any
      }),
      University.findOrCreate({
        where: { name: 'Hawassa University' },
        defaults: { 
          name: 'Hawassa University', 
          location: 'Hawassa', 
          email: 'info@hu.edu.et' 
        } as any
      })
    ])

    console.log('✅ Universities created/found')

    // Create departments for each university
    const departments = []
    for (const [university] of universities) {
      const depts = await Promise.all([
        Department.findOrCreate({
          where: { name: 'Computer Science', universityId: university.id },
          defaults: { 
            name: 'Computer Science', 
            code: 'CS', 
            universityId: university.id 
          } as any
        }),
        Department.findOrCreate({
          where: { name: 'Mathematics', universityId: university.id },
          defaults: { 
            name: 'Mathematics', 
            code: 'MATH', 
            universityId: university.id 
          } as any
        }),
        Department.findOrCreate({
          where: { name: 'Physics', universityId: university.id },
          defaults: { 
            name: 'Physics', 
            code: 'PHYS', 
            universityId: university.id 
          } as any
        }),
        Department.findOrCreate({
          where: { name: 'Chemistry', universityId: university.id },
          defaults: { 
            name: 'Chemistry', 
            code: 'CHEM', 
            universityId: university.id 
          } as any
        })
      ])
      departments.push(...depts.map(([dept]) => dept))
    }

    console.log('✅ Departments created/found')

    // Create subjects for each department
    const subjects = []
    for (const department of departments) {
      let subjectNames: string[] = []
      
      switch (department.name) {
        case 'Computer Science':
          subjectNames = ['Introduction to Programming', 'Data Structures', 'Computer Networks', 'Database Systems']
          break
        case 'Mathematics':
          subjectNames = ['Calculus I', 'Linear Algebra', 'Statistics', 'Discrete Mathematics']
          break
        case 'Physics':
          subjectNames = ['General Physics I', 'General Physics II', 'Mechanics', 'Thermodynamics']
          break
        case 'Chemistry':
          subjectNames = ['General Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry']
          break
      }

      for (const subjectName of subjectNames) {
        const [subject] = await Subject.findOrCreate({
          where: { name: subjectName, departmentId: department.id },
          defaults: {
            name: subjectName,
            code: subjectName.replace(/\s+/g, '').toUpperCase().substring(0, 6),
            departmentId: department.id
          } as any
        })
        subjects.push(subject)
      }
    }

    console.log('✅ Subjects created/found')

    // Find or create an admin user for uploading resources
    const [adminUser] = await User.findOrCreate({
      where: { email: 'admin@successbridge.com' },
      defaults: {
        email: 'admin@successbridge.com',
        name: 'System Admin',
        password: 'hashedpassword', // This should be properly hashed
        role: 'admin'
      } as any
    })

    console.log('✅ Admin user created/found')

    // Create freshman resources for each university
    const resourceTypes = ['module', 'textbook', 'video', 'worksheet', 'quiz', 'reference_book'] as const
    type ResourceType = typeof resourceTypes[number]
    
    const resourceTitles: Record<ResourceType, string[]> = {
      module: ['Introduction Module', 'Basic Concepts', 'Fundamentals', 'Getting Started'],
      textbook: ['Essential Textbook', 'Complete Guide', 'Student Handbook', 'Reference Manual'],
      video: ['Lecture Video', 'Tutorial Series', 'Demonstration', 'Explanation Video'],
      worksheet: ['Practice Worksheet', 'Exercise Set', 'Problem Collection', 'Study Guide'],
      quiz: ['Assessment Quiz', 'Practice Test', 'Review Questions', 'Self-Check'],
      reference_book: ['Reference Guide', 'Quick Reference', 'Study Reference', 'Handbook']
    }

    let resourceCount = 0

    for (const [university] of universities) {
      // Get departments for this university
      const universityDepartments = departments.filter(d => d.universityId === university.id)
      
      for (const department of universityDepartments) {
        // Get subjects for this department
        const departmentSubjects = subjects.filter(s => s.departmentId === department.id)
        
        for (const subject of departmentSubjects) {
          // Create 2-3 resources per subject
          const numResources = Math.floor(Math.random() * 2) + 2 // 2-3 resources
          
          for (let i = 0; i < numResources; i++) {
            const resourceType = resourceTypes[Math.floor(Math.random() * resourceTypes.length)]
            const titleOptions = resourceTitles[resourceType]
            const title = `${titleOptions[Math.floor(Math.random() * titleOptions.length)]} - ${subject.name}`
            
            await Resource.create({
              title,
              description: `${resourceType.replace('_', ' ')} for ${subject.name} course at ${university.name}. Designed for freshman students.`,
              type: resourceType,
              fileUrl: `/uploads/sample-${resourceType}-${Date.now()}.pdf`,
              educationLevel: 'university',
              grade: 'freshman',
              subjectId: subject.id,
              universityId: university.id,
              departmentId: department.id,
              tags: [resourceType, 'freshman', subject.name.toLowerCase().replace(/\s+/g, '-')],
              uploadedBy: adminUser.id
            } as any)
            
            resourceCount++
          }
        }
      }
    }

    console.log(`✅ Created ${resourceCount} freshman resources`)
    console.log('🎉 Freshman resources seeding completed successfully!')

    // Show summary
    const summary = await Promise.all(
      universities.map(async ([university]) => {
        const count = await Resource.count({
          where: {
            educationLevel: 'university',
            grade: 'freshman',
            universityId: university.id
          }
        })
        return { university: university.name, resources: count }
      })
    )

    console.log('\n📊 Resource Summary:')
    summary.forEach(({ university, resources }) => {
      console.log(`   ${university}: ${resources} resources`)
    })

  } catch (error) {
    console.error('❌ Error seeding freshman resources:', error)
  } finally {
    await sequelize.close()
  }
}

// Run the seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedFreshmanResources()
}

export default seedFreshmanResources