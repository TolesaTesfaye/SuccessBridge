import Subject from '../models/Subject.js';
import Grade from '../models/Grade.js';
import { setupAssociations } from '../models/index.js';

async function listFreshmanSubjects() {
  try {
    setupAssociations();
    
    const grade = await Grade.findOne({ where: { name: 'Freshman' } });
    
    if (!grade) {
      console.log('❌ Freshman grade not found');
      process.exit(1);
    }
    
    const subjects = await Subject.findAll({
      where: { gradeId: grade.id },
      order: [['name', 'ASC']]
    });
    
    console.log(`\n📚 Freshman Subjects (${subjects.length}):\n`);
    
    subjects.forEach((s, i) => {
      console.log(`${i + 1}. ${s.name} (${s.code})`);
    });
    
    console.log(`\n📊 Total: ${subjects.length} subjects\n`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

listFreshmanSubjects();
