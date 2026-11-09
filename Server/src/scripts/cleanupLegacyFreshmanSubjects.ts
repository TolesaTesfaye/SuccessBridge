/**
 * Cleanup Legacy Freshman Subjects
 * 
 * Removes old Freshman subjects (PSYCHFR, LOGICFR, etc.) that have been
 * replaced by the proper stream-based subjects (FRN and FRS codes)
 */

import Subject from '../models/Subject.js';
import { Op } from 'sequelize';

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
    console.log('🔍 Checking for legacy Freshman subjects...\n');

    // Find legacy subjects
    const legacySubjects = await Subject.findAll({
      where: {
        code: {
          [Op.in]: LEGACY_CODES
        }
      }
    });

    console.log(`📊 Found ${legacySubjects.length} legacy subjects:\n`);
    
    for (const subject of legacySubjects) {
      console.log(`   ❌ ${subject.name} (${subject.code})`);
    }

    if (legacySubjects.length === 0) {
      console.log('✅ No legacy subjects found!\n');
      process.exit(0);
    }

    console.log(`\n🗑️  Removing ${legacySubjects.length} legacy subjects...\n`);

    const deleted = await Subject.destroy({
      where: {
        code: {
          [Op.in]: LEGACY_CODES
        }
      }
    });

    console.log(`✅ Successfully removed ${deleted} legacy Freshman subjects!\n`);
    
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

    console.log(`📊 Remaining Freshman subjects: ${remainingCount}`);
    console.log(`   • Natural Science stream (FRN): ~17 subjects`);
    console.log(`   • Social Science stream (FRS): ~15 subjects\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error cleaning up legacy subjects:', error);
    process.exit(1);
  }
}

// Run if executed directly
cleanupLegacyFreshmanSubjects();
