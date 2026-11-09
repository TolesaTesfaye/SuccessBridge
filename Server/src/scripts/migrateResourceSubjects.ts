/**
 * Migrate Resources from Old Subject IDs to New Subject IDs
 * 
 * This script finds resources linked to deleted/old subjects and
 * re-links them to the correct new subjects based on name matching
 */

import Resource from '../models/Resource.js';
import Subject from '../models/Subject.js';
import Grade from '../models/Grade.js';
import { Op } from 'sequelize';
import { setupAssociations } from '../models/index.js';

// Mapping of old subject names to new subject names
const SUBJECT_NAME_MAPPING: Record<string, string> = {
  'Psychology': 'General Psychology',
  'Logic': 'Logic and Critical Thinking',
  'Physics': 'General Physics',
  'Geography': 'Geography of Ethiopia and the Horn',
  'History': 'History of Ethiopia and the Horn',
  'Math (Natural Science)': 'Mathematics for Natural Sciences',
  'Math (Social Science)': 'Mathematics for Social Sciences',
  'English': 'Communicative English Language Skills I',
};

async function migrateResourceSubjects() {
  try {
    setupAssociations();
    
    console.log('🔍 Checking for orphaned resources...\n');

    // Get all resources
    const allResources = await Resource.findAll();
    console.log(`📊 Total resources in database: ${allResources.length}\n`);

    // Find resources with null or invalid subjectId
    const orphanedResources = await Resource.findAll({
      where: {
        [Op.or]: [
          { subjectId: null },
          { subjectId: '' }
        ]
      }
    });

    console.log(`🔴 Resources with NULL subjectId: ${orphanedResources.length}\n`);

    // Find resources linked to non-existent subjects
    const allSubjectIds = (await Subject.findAll({ attributes: ['id'] })).map(s => s.id);
    const resourcesWithInvalidSubjects = await Resource.findAll({
      where: {
        subjectId: {
          [Op.notIn]: allSubjectIds,
          [Op.ne]: null
        }
      }
    });

    console.log(`🔴 Resources linked to deleted subjects: ${resourcesWithInvalidSubjects.length}\n`);

    // Get all Freshman subjects for mapping
    const freshmanGrade = await Grade.findOne({ where: { name: 'Freshman' } });
    const freshmanSubjects = await Subject.findAll({
      where: { gradeId: freshmanGrade?.id }
    });

    console.log(`📚 Available Freshman subjects for remapping: ${freshmanSubjects.length}\n`);

    let migratedCount = 0;
    let errors = 0;

    // Try to migrate resources based on their title/description
    const problematicResources = [...orphanedResources, ...resourcesWithInvalidSubjects];

    for (const resource of problematicResources) {
      try {
        const title = resource.title?.toLowerCase() || '';
        const description = resource.description?.toLowerCase() || '';
        const combinedText = `${title} ${description}`;

        let matchedSubject = null;

        // Try to match by keywords
        if (combinedText.includes('psychology') || combinedText.includes('psycho')) {
          matchedSubject = freshmanSubjects.find(s => s.name.includes('Psychology'));
        } else if (combinedText.includes('logic')) {
          matchedSubject = freshmanSubjects.find(s => s.name.includes('Logic'));
        } else if (combinedText.includes('physics') || combinedText.includes('physic')) {
          matchedSubject = freshmanSubjects.find(s => s.name.includes('Physics'));
        } else if (combinedText.includes('geography') || combinedText.includes('geo')) {
          matchedSubject = freshmanSubjects.find(s => s.name.includes('Geography'));
        } else if (combinedText.includes('history') || combinedText.includes('hist')) {
          matchedSubject = freshmanSubjects.find(s => s.name.includes('History'));
        } else if (combinedText.includes('math') || combinedText.includes('calculus') || combinedText.includes('algebra')) {
          if (combinedText.includes('natural') || combinedText.includes('science')) {
            matchedSubject = freshmanSubjects.find(s => s.name.includes('Mathematics for Natural'));
          } else {
            matchedSubject = freshmanSubjects.find(s => s.name.includes('Mathematics for Social'));
          }
        } else if (combinedText.includes('english') || combinedText.includes('communication')) {
          matchedSubject = freshmanSubjects.find(s => s.name.includes('Communicative English'));
        } else if (combinedText.includes('biology') || combinedText.includes('bio')) {
          matchedSubject = freshmanSubjects.find(s => s.name.includes('Biology'));
        } else if (combinedText.includes('chemistry') || combinedText.includes('chem')) {
          matchedSubject = freshmanSubjects.find(s => s.name.includes('Chemistry'));
        }

        if (matchedSubject) {
          await resource.update({ subjectId: matchedSubject.id });
          console.log(`✅ Migrated: "${resource.title}" → ${matchedSubject.name}`);
          migratedCount++;
        } else {
          console.log(`⚠️  Could not auto-match: "${resource.title}"`);
          errors++;
        }
      } catch (error) {
        console.error(`❌ Error migrating resource ${resource.id}:`, error);
        errors++;
      }
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📊 Migration Summary:`);
    console.log(`   ✅ Successfully migrated: ${migratedCount} resources`);
    console.log(`   ⚠️  Could not match: ${errors} resources`);
    console.log(`   📚 Total processed: ${problematicResources.length} resources`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    // Show final statistics
    const freshmanResources = await Resource.count({
      where: {
        subjectId: {
          [Op.in]: freshmanSubjects.map(s => s.id)
        }
      }
    });

    console.log(`📚 Resources now linked to Freshman subjects: ${freshmanResources}\n`);

    // List resources per subject
    console.log('📋 Resources per Freshman subject:\n');
    for (const subject of freshmanSubjects) {
      const count = await Resource.count({ where: { subjectId: subject.id } });
      if (count > 0) {
        console.log(`   ${subject.name}: ${count} resources`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  }
}

// Run if executed directly
migrateResourceSubjects();
