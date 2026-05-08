// Grade 11 Subject Registry
// This file automatically registers all available subjects for Grade 11
// Currently using data-driven approach, but can be migrated to component-based

export interface SubjectConfig {
  name: string;
  grade: string;
  color?: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  chapters: any[];
}

// Registry of all Grade 11 subjects
// Currently empty - subjects use the old data-driven approach from gradeSpecificContent
export const GRADE_11_SUBJECTS: Record<string, SubjectConfig> = {
  // Add component-based subjects here as they are developed:
  // 'Biology': biologyConfig,
  // 'Chemistry': chemistryConfig,
  // etc.
};

// Get list of available subject names for Grade 11
export const getGrade11AvailableSubjects = (): string[] => {
  return Object.keys(GRADE_11_SUBJECTS);
};

// Get subject configuration by name
export const getGrade11SubjectConfig = (subjectName: string): SubjectConfig | null => {
  return GRADE_11_SUBJECTS[subjectName] || null;
};

// Check if a subject has component-based rendering available
export const hasComponentBasedRendering = (subjectName: string): boolean => {
  return subjectName in GRADE_11_SUBJECTS;
};
