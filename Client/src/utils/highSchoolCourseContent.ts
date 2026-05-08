// Grade 11 Content
import { GRADE_11_MATH_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/math/mathContent';
import { GRADE_11_PHYSICS_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/physics/physicsContent';
import { GRADE_11_CHEMISTRY_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/chemistry/chemistryContent';
import { GRADE_11_BIOLOGY_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/biology/biologyContent';
import { GRADE_11_ENGLISH_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/english/englishContent';
import { GRADE_11_HISTORY_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/history/historyContent';
import { GRADE_11_GEOGRAPHY_CONTENT } from '../dashboards/student/learning center/highschool/grade 11/geography/geographyContent';

// NOTE: Grade 12 now uses component-based approach (see grade 12/subjectRegistry.ts)
// No content imports needed here

// Placeholder content for other subjects
const createPlaceholderContent = (subject: string, grade: string) => ({
  title: subject,
  grade: grade,
  introduction: `Welcome to ${grade} ${subject}! Content is being prepared and will be available soon.`,
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Introduction',
      topics: [
        {
          id: 'intro',
          title: 'Getting Started',
          content: 'Content coming soon...'
        }
      ]
    }
  ]
});

// Grade 11 Courses
export const GRADE_11_CONTENT = {
  Mathematics: GRADE_11_MATH_CONTENT,
  Physics: GRADE_11_PHYSICS_CONTENT,
  Chemistry: GRADE_11_CHEMISTRY_CONTENT,
  Biology: GRADE_11_BIOLOGY_CONTENT,
  English: GRADE_11_ENGLISH_CONTENT,
  History: GRADE_11_HISTORY_CONTENT,
  Geography: GRADE_11_GEOGRAPHY_CONTENT,
};

// NOTE: Grade 12 uses component-based rendering (see grade 12/subjectRegistry.ts)
// No content export needed here

// Grade 9 & 10 Courses
export const GRADE_9_CONTENT = {
  Mathematics: createPlaceholderContent('Mathematics', 'Grade 9'),
  Science: createPlaceholderContent('Science', 'Grade 9'),
  English: createPlaceholderContent('English', 'Grade 9'),
  'Social Studies': createPlaceholderContent('Social Studies', 'Grade 9'),
  'Civics and Ethical Education': createPlaceholderContent('Civics and Ethical Education', 'Grade 9'),
};

export const GRADE_10_CONTENT = {
  Mathematics: createPlaceholderContent('Mathematics', 'Grade 10'),
  Science: createPlaceholderContent('Science', 'Grade 10'),
  English: createPlaceholderContent('English', 'Grade 10'),
  'Social Studies': createPlaceholderContent('Social Studies', 'Grade 10'),
  'Civics and Ethical Education': createPlaceholderContent('Civics and Ethical Education', 'Grade 10'),
};

// Helper function to get content by grade
export const getHighSchoolContent = (grade: string) => {
  switch (grade) {
    case 'grade_9':
      return GRADE_9_CONTENT;
    case 'grade_10':
      return GRADE_10_CONTENT;
    case 'grade_11':
      return GRADE_11_CONTENT;
    case 'grade_12':
      // Grade 12 uses component-based rendering
      return {};
    default:
      return GRADE_9_CONTENT;
  }
};
