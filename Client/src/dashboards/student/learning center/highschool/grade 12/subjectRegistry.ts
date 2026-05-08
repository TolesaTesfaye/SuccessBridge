// Grade 12 Subject Registry
// This file automatically registers all available subjects for Grade 12
// Add new subjects by importing their configurations here

import { biologyConfig } from './biology/Biologyconfig';
import { chemistryConfig } from './chemistry/Chemistryconfig';
import { economicsConfig } from './economics/Economicsconfig';
import { englishConfig } from './english/Englishconfig';
import { geographyConfig } from './geography/Geographyconfig';
import { historyConfig } from './history/Historyconfig';
import { mathConfig } from './math/Mathconfig';
import { physicsConfig } from './physics/Physicsconfig';

export interface SubjectConfig {
  name: string;
  grade: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  chapters: any[];
}

// Registry of all Grade 12 subjects with component-based rendering
export const GRADE_12_SUBJECTS: Record<string, SubjectConfig> = {
  'Biology': biologyConfig,
  'Chemistry': chemistryConfig,
  'Economics': economicsConfig,
  'English': englishConfig,
  'Geography': geographyConfig,
  'History': historyConfig,
  'Math': mathConfig,
  'Physics': physicsConfig,
};

// List of subjects that use the OLD data-driven approach (have *Content.ts files)
// These subjects exist in folders but haven't been migrated to component-based yet
const DATA_DRIVEN_SUBJECTS: string[] = [
  // All subjects have been migrated to component-based approach
];

// Get list of available subject names for Grade 12
// Includes both component-based and data-driven subjects
export const getGrade12AvailableSubjects = (): string[] => {
  const componentSubjects = Object.keys(GRADE_12_SUBJECTS);
  const allSubjects = [...componentSubjects, ...DATA_DRIVEN_SUBJECTS];
  // Remove duplicates and return
  return [...new Set(allSubjects)];
};

// Get subject configuration by name
export const getGrade12SubjectConfig = (subjectName: string): SubjectConfig | null => {
  return GRADE_12_SUBJECTS[subjectName] || null;
};

// Check if a subject has component-based rendering available
export const hasComponentBasedRendering = (subjectName: string): boolean => {
  return subjectName in GRADE_12_SUBJECTS;
};
