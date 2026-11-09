/**
 * Remove Duplicate Subjects Script
 * 
 * This script removes duplicate subjects from the database,
 * keeping only the first occurrence of each subject.
 */

import sequelize from '../config/database.js';
import Subject from '../models/Subject.js';
import Grade from '../models/Grade.js';
import { setupAssociations } from '../models/index.js';
import { Op } from 'sequelize';

async function removeDuplicateSubjects() {
  try {
    console.log('🔍 Checking for duplicate subjects...\n');

    // Setup associations first
    setupAssociations();

    // Get all subjects with their grades
    const subjects = await Subject.findAll({
      include: [{
        model: Grade,
        as: 'grade',
        attributes: ['name']
      }],
      order: [['createdAt', 'ASC']]
    });

    console.log(`📊 Total subjects found: ${subjects.length}\n`);

    // Track seen subjects: code -> first subject ID
    const seenSubjects = new Map<string, string>();
    const duplicatesToDelete: string[] = [];

    for (const subject of subjects) {
      const key = subject.code;

      if (seenSubjects.has(key)) {
        // This is a duplicate, mark for deletion
        duplicatesToDelete.push(subject.id);
        console.log(`❌ Duplicate found: ${subject.name} (${subject.code}) in ${(subject as any).grade?.name || 'Unknown'}`);
      } else {
        // First occurrence, keep it
        seenSubjects.set(key, subject.id);
        console.log(`✅ Keeping: ${subject.name} (${subject.code}) in ${(subject as any).grade?.name || 'Unknown'}`);
      }
    }

    console.log(`\n📋 Summary:`);
    console.log(`   Unique subjects: ${seenSubjects.size}`);
    console.log(`   Duplicates to remove: ${duplicatesToDelete.length}\n`);

    if (duplicatesToDelete.length > 0) {
      console.log('🗑️  Removing duplicates...');
      
      const deleted = await Subject.destroy({
        where: {
          id: {
            [Op.in]: duplicatesToDelete
          }
        }
      });

      console.log(`✅ Removed ${deleted} duplicate subjects\n`);
    } else {
      console.log('✅ No duplicates found!\n');
    }

    // Show final count by grade
    console.log('📊 Final subject count by grade:');
    const grades = await Grade.findAll();
    for (const grade of grades) {
      const count = await Subject.count({
        where: { gradeId: grade.id }
      });
      console.log(`   ${grade.name}: ${count} subjects`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error removing duplicates:', error);
    process.exit(1);
  }
}

// Run if executed directly
removeDuplicateSubjects();
