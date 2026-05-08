import sequelize from '../config/database.js'

/**
 * Fix the subjectId column to allow NULL values
 * This is needed for the "one payment unlocks all" model
 */
async function fixSubjectIdConstraint() {
  try {
    console.log('🔧 Starting subjectId constraint fix...')

    // Drop the NOT NULL constraint
    await sequelize.query(`
      ALTER TABLE payments 
      ALTER COLUMN "subjectId" DROP NOT NULL;
    `)

    console.log('✅ Successfully removed NOT NULL constraint from subjectId')

    // Verify the change
    const [results] = await sequelize.query(`
      SELECT column_name, is_nullable, data_type
      FROM information_schema.columns
      WHERE table_name = 'payments' AND column_name = 'subjectId';
    `)

    console.log('📊 Column info:', results)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error fixing subjectId constraint:', error)
    process.exit(1)
  }
}

fixSubjectIdConstraint()
