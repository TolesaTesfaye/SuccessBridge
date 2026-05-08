// Subject Registry - Automatically loads all subject configurations
// To add a new subject, just import its config here

import { psychologyConfig } from './Psychology/psychologyConfig';
import { logicConfig } from './Logic/logicConfig';
import { physicsConfig } from './physics/physicsConfig';
import { mathNaturalConfig } from './mathnatural/mathNaturalConfig';
import { mathSocialConfig } from './mathsocial/mathSocialConfig';
import { geographyConfig } from './geography/geographyConfig';
import { historyConfig } from './history/historyConfig';
import { englishConfig } from './english/englishConfig';

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

// Registry of all available subjects
// Add new subjects here by importing their config and adding to this object
export const SUBJECT_REGISTRY: Record<string, SubjectConfig> = {
  'Psychology': psychologyConfig,
  'Logic': logicConfig,
  'Physics': physicsConfig,
  'Math (Natural Science)': mathNaturalConfig,
  'Math (Social Science)': mathSocialConfig,
  'Geography': geographyConfig,
  'History': historyConfig,
  'English': englishConfig,
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
