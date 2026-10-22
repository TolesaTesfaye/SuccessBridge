// Remedial Subject Registry - Automatically loads all subject configurations
// To add a new subject, just import its config here

import { chemistryConfig } from './chemistry/chemistryConfig';
import { mathConfig } from './math/mathConfig';
import { englishConfig } from './english/englishConfig';
import { physicsConfig } from './physics/physicsConfig';
import { geographyConfig } from './geography/geographyConfig';
import { historyConfig } from './history/historyConfig';

export interface ChapterConfig {
  id: string;
  title: string;
  subtopics?: string[];
}

export interface SubjectConfig {
  name: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  chapters: ChapterConfig[];
}

// Registry of all available remedial subjects
// Add new subjects here by importing their config and adding to this object
export const REMEDIAL_SUBJECT_REGISTRY: Record<string, SubjectConfig> = {
  'Chemistry': chemistryConfig,
  'Math': mathConfig,
  'English': englishConfig,
  'Physics': physicsConfig,
  'Geography': geographyConfig,
  'History': historyConfig,
  // Add more subjects here as you create them
};

// Helper function to get subject configuration
export const getSubjectConfig = (subjectName: string): SubjectConfig | undefined => {
  return REMEDIAL_SUBJECT_REGISTRY[subjectName];
};

// Helper function to check if a subject has configuration
export const hasSubjectConfig = (subjectName: string): boolean => {
  return subjectName in REMEDIAL_SUBJECT_REGISTRY;
};

// Helper function to get all registered subject names
export const getRegisteredSubjects = (): string[] => {
  return Object.keys(REMEDIAL_SUBJECT_REGISTRY);
};
