// High School Subject Registry Utility
// This file provides a unified interface to get available subjects for any grade

import { getGrade11AvailableSubjects } from '@learningCenter/highschool/grade 11/subjectRegistry';
import { getGrade12AvailableSubjects } from '@learningCenter/highschool/grade 12/subjectRegistry';
import { HIGH_SCHOOL } from './constants';

type Grade = 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12';
type Stream = 'natural' | 'social' | null;

/**
 * Get available subjects for a specific grade and stream
 * This function combines:
 * 1. Component-based subjects (from grade-specific registries)
 * 2. Data-driven subjects (from constants)
 */
export const getAvailableSubjects = (grade: Grade, stream: Stream): string[] => {
  // For Grade 9 and 10 (no streams)
  if (grade === 'grade_9' || grade === 'grade_10') {
    return HIGH_SCHOOL.GRADES_9_10.subjects;
  }

  // For Grade 11 and 12 (with streams)
  if (grade === 'grade_11') {
    // Get component-based subjects ONLY (subjects that exist in folder structure)
    const componentSubjects = getGrade11AvailableSubjects();
    
    // Return only component-based subjects for scalability
    // Subjects will appear automatically when added to the grade 11 folder
    return componentSubjects;
  }

  if (grade === 'grade_12') {
    // Get component-based subjects ONLY (subjects that exist in folder structure)
    const componentSubjects = getGrade12AvailableSubjects();
    
    // Return only component-based subjects for scalability
    // Subjects will appear automatically when added to the grade 12 folder
    return componentSubjects;
  }

  return [];
};

/**
 * Check if a subject has component-based rendering for a specific grade
 */
export const hasComponentBasedSubject = (grade: Grade, subject: string): boolean => {
  if (grade === 'grade_11') {
    const availableSubjects = getGrade11AvailableSubjects();
    return availableSubjects.includes(subject);
  }
  
  if (grade === 'grade_12') {
    const availableSubjects = getGrade12AvailableSubjects();
    return availableSubjects.includes(subject);
  }

  return false;
};
