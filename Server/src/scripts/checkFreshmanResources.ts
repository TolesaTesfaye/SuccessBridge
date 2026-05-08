import sequelize from '../config/database.js'
import { Op } from 'sequelize'
import Resource from '../models/Resource.js'

const checkFreshmanResources = async () => {
  try {
    await sequelize.authenticate()
    console.log('🗄️  Database connected')

    // Check freshman resources with their universityId
    const freshmanResources = await Resource.findAll({
      where: {
        educationLevel: 'university',
        grade: 'freshman'
      },
      attributes: ['id', 'title', 'grade', 'universityId', 'subjectId'],
      limit: 10
    })

    console.log('\n📚 Freshman Resources:')
    console.log('Total found:', freshmanResources.length)
    
    if (freshmanResources.length > 0) {
      freshmanResources.forEach((resource: any) => {
        console.log(`\n- ${resource.title}`)
        console.log(`  Grade: "${resource.grade}"`)
        console.log(`  University ID: ${resource.universityId || 'NULL'}`)
        console.log(`  Subject ID: ${resource.subjectId || 'NULL'}`)
      })
    }

    // Count resources with NULL universityId
    const withoutUniversity = await Resource.count({
      where: {
        educationLevel: 'university',
        grade: 'freshman',
        universityId: null
      }
    })

    console.log(`\n⚠️  Resources WITHOUT university: ${withoutUniversity}`)
    
    // Count resources WITH universityId
    const withUniversity = await Resource.count({
      where: {
        educationLevel: 'university',
        grade: 'freshman',
        universityId: { [Op.ne]: null }
      }
    })

    console.log(`✅ Resources WITH university: ${withUniversity}`)
    
    console.log('\n🔍 DIAGNOSIS:')
    if (withoutUniversity === freshmanResources.length) {
      console.log('❌ ALL freshman resources have NULL universityId')
      console.log('💡 SOLUTION: Backend should NOT filter by universityId when fetching freshman resources')
      console.log('   OR assign these resources to universities')
    } else if (withoutUniversity > 0) {
      console.log(`⚠️  ${withoutUniversity} resources have NULL universityId`)
      console.log(`✅ ${withUniversity} resources have universityId`)
    } else {
      console.log('✅ All resources have universityId assigned')
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

checkFreshmanResources()
