/**
 * Merge Freshman Stream Subjects
 * 
 * Removes duplicate common subjects between Natural and Social Science streams.
 * Keeps only one copy of common subjects and preserves stream-specific ones.
 */

import Subject from '../models/Subject.js';
import { Op } from 'sequelize';

// Subjects that are COMMON to both streams (keep FRN version, delete FRS version)
const COMMON_SUBJECTS = [
  'Communicative English Language Skills I',
  'Communicative English Language Skills II',
  'Logic and Critical Thinking',
  'General Psychology',
  'Geography of Ethiopia and the Horn',
  'History of Ethiopia and the Horn',
  'Introduction to Emerging Technologies',
  'Social Anthropology',
  'Moral and Civic Education',
  'Inclusiveness',
  'Global Trends',
  'Physical Fitness',
  'Entrepreneurship'
];

// Stream-specific subjects to KEEP
const NATURAL_SCIENCE_SPECIFIC = [
  'Mathematics for Natural Sciences',
  'General Physics',
  'General Biology',
  'General Chemistry'
];

const SOCIAL_SCIENCE_SPECIFIC = [
  'Mathematics for Social Sciences',
  'Economics'
];

async function mergeFreshmanStreams() {
  try {
    console.log('🔍 Finding duplicate Freshman subjects between streams...\n');

    // Find all FRS (Social Science) versions of common subjects
    const frsCommonSubjects = await Subject.findAll({
      where: {
        name: {
          [Op.in]: COMMON_SUBJECTS
        },
        code: {
          [Op.like]: '%FRS'
        }
      }
    });

    console.log(`📊 Found ${frsCommonSubjects.length} duplicate common subjects in Social Science stream:\n`);
    
    for (const subject of frsCommonSubjects) {
      console.log(`   ❌ ${subject.name} (${subject.code}) - DUPLICATE`);
    }

    if (frsCommonSubjects.length === 0) {
      console.log('✅ No duplicates found!\n');
      process.exit(0);
    }

    console.log(`\n🗑️  Removing ${frsCommonSubjects.length} duplicate subjects...\n`);

    const deleted = await Subject.destroy({
      where: {
        name: {
          [Op.in]: COMMON_SUBJECTS
        },
        code: {
          [Op.like]: '%FRS'
        }
      }
    });

    console.log(`✅ Successfully removed ${deleted} duplicate subjects!\n`);
    
    // Count remaining subjects
    const naturalCount = await Subject.count({
      where: {
        code: {
          [Op.like]: '%FRN'
        }
      }
    });

    const socialCount = await Subject.count({
      where: {
        code: {
          [Op.like]: '%FRS'
        }
      }
    });

    console.log(`📊 Final Freshman subject count:\n`);
    console.log(`   ✅ Common subjects: ${COMMON_SUBJECTS.length} (shared by both streams)`);
    console.log(`   ✅ Natural Science specific: ${NATURAL_SCIENCE_SPECIFIC.length} subjects`);
    console.log(`   ✅ Social Science specific: ${SOCIAL_SCIENCE_SPECIFIC.length} subjects`);
    console.log(`   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`   📚 Total unique subjects: ${COMMON_SUBJECTS.length + NATURAL_SCIENCE_SPECIFIC.length + SOCIAL_SCIENCE_SPECIFIC.length}\n`);

    console.log(`📋 Breakdown:`);
    console.log(`   • Subjects with FRN codes: ${naturalCount}`);
    console.log(`   • Subjects with FRS codes: ${socialCount}`);
    console.log(`   • Total: ${naturalCount + socialCount}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error merging streams:', error);
    process.exit(1);
  }
}

// Run if executed directly
mergeFreshmanStreams();
