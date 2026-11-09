/**
 * Cleanup Legacy Freshman Subjects
 * 
 * Removes old/short-named Freshman subjects and keeps the detailed ones
 */

import Subject from '../models/Subject.js';
import { Op } from 'sequelize';

// Short names to REMOVE (keep the detailed versions)
const SUBJECTS_TO_REMOVE = [
  'Psychology',              // Keep: General Psychology
  'Logic',                   // Keep: Logic and Critical Thinking
  'Physics',                 // Keep: General Physics
  'Geography',               // Keep: Geography of Ethiopia and the Horn
  'History',                 // Keep: History of Ethiopia and the Horn
  'Math (Natural Science)',  // Keep: Mathematics for Natural Sciences
  'Math (Social Science)',   // Keep: Mathematics for Social Sciences
  'English',                 // Keep: Communicative English Language Skills I & II
];

// Also remove by codes
const LEGACY_CODES = [
  'PSYCHFR',
  'LOGICFR',
  'PHYSFR',
  'MATHNFR',
  'MATHSFR',
  'GEOGFR',
  'HISTFR',
  'ENGFR'
];

async function cleanupLegacyFreshmanSubjects() {
  try {
    console.log('🔍 Checking for short-named Freshman subjects...\n');

    // Find subjects by name OR code
    const legacySubjects = await Subject.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.in]: SUBJECTS_TO_REMOVE } },
          { code: { [Op.in]: LEGACY_CODES } }
        ]
      }
    });

    console.log(`📊 Found ${legacySubjects.length} short-named subjects:\n`);
    
    for (const subject of legacySubjects) {
      console.log(`   ❌ ${subject.name} (${subject.code})`);
    }

    if (legacySubjects.length === 0) {
      console.log('✅ No short-named subjects found!\n');
      process.exit(0);
    }

    console.log(`\n🗑️  Removing ${legacySubjects.length} short-named subjects...\n`);

    const deleted = await Subject.destroy({
      where: {
        [Op.or]: [
          { name: { [Op.in]: SUBJECTS_TO_REMOVE } },
          { code: { [Op.in]: LEGACY_CODES } }
        ]
      }
    });

    console.log(`✅ Successfully removed ${deleted} short-named Freshman subjects!\n`);
    
    // Count remaining Freshman subjects
    const remainingCount = await Subject.count({
      where: {
        code: {
          [Op.or]: [
            { [Op.like]: '%FRN' },
            { [Op.like]: '%FRS' }
          ]
        }
      }
    });

    console.log(`📊 Remaining Freshman subjects with detailed names: ${remainingCount}\n`);
    console.log(`✅ Kept subjects like:`);
    console.log(`   • General Psychology (not just "Psychology")`);
    console.log(`   • Geography of Ethiopia and the Horn (not just "Geography")`);
    console.log(`   • Logic and Critical Thinking (not just "Logic")`);
    console.log(`   • Mathematics for Natural/Social Sciences (not just "Math")\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error cleaning up legacy subjects:', error);
    process.exit(1);
  }
}

// Run if executed directly
cleanupLegacyFreshmanSubjects();
