// Senior Subject Registry - Programming and Advanced Courses
// To add a new subject, just import its config here

import { cppConfig } from './CPlusPlus/cppConfig';
import { pythonConfig } from './Python/pythonConfig';
import { javaConfig } from './Java/javaConfig';
import { dataStructuresConfig } from './DataStructures/dataStructuresConfig';
import { algorithmsConfig } from './Algorithms/algorithmsConfig';

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

// Registry of all available senior subjects
export const SUBJECT_REGISTRY: Record<string, SubjectConfig> = {
  'C++': cppConfig,
  'Python': pythonConfig,
  'Java': javaConfig,
  'Data Structures': dataStructuresConfig,
  'Algorithms': algorithmsConfig,
  // Add more subjects here as you create them
};

// Helper function to get subject configuration
export const getSubjectConfig = (subjectName: string): SubjectConfig | undefined => {
  return SUBJECT_REGISTRY[subjectName];
};

// Helper function to check if a subject has configuration
export const hasSubjectConfig = (subjectName: string): boolean => {
  return subjectName in SUBJECT_REGISTRY;
};

// Helper function to get all registered subject names
export const getRegisteredSubjects = (): string[] => {
  return Object.keys(SUBJECT_REGISTRY);
};
