// Math (Natural Science) Subject Configuration
// This file contains all chapters and subtopics for Math Natural Science

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

export const mathNaturalConfig: SubjectConfig = {
  name: 'Math (Natural Science)',
  color: {
    primary: 'blue',
    secondary: 'indigo',
    gradient: 'from-blue-600 to-indigo-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Relations and Functions',
      subtopics: [
        '1.1. Relations',
        '1.2. Functions',
        '1.3. Types of Functions',
        '1.4. Composition of Functions',
        '1.5. Inverse Functions'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Polynomial Functions',
      subtopics: [
        '2.1. Polynomial Functions and Their Graphs',
        '2.2. Division of Polynomials',
        '2.3. Zeros of Polynomial Functions',
        '2.4. Rational Root Theorem',
        '2.5. Fundamental Theorem of Algebra'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Exponential and Logarithmic Functions',
      subtopics: [
        '3.1. Exponential Functions',
        '3.2. Logarithmic Functions',
        '3.3. Properties of Logarithms',
        '3.4. Exponential and Logarithmic Equations',
        '3.5. Applications'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Trigonometric Functions',
      subtopics: [
        '4.1. Angles and Their Measures',
        '4.2. Trigonometric Functions of Any Angle',
        '4.3. Graphs of Trigonometric Functions',
        '4.4. Inverse Trigonometric Functions',
        '4.5. Trigonometric Identities'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Vectors in a Plane',
      subtopics: [
        '5.1. Introduction to Vectors',
        '5.2. Vector Operations',
        '5.3. Dot Product',
        '5.4. Applications of Vectors',
        '5.5. Vector Equations'
      ]
    },
    {
      id: 'chapter6',
      title: 'Chapter 6: Limits and Continuity',
      subtopics: [
        '6.1. Introduction to Limits',
        '6.2. Limit Laws',
        '6.3. Limits at Infinity',
        '6.4. Continuity',
        '6.5. Intermediate Value Theorem'
      ]
    },
    {
      id: 'chapter7',
      title: 'Chapter 7: Derivatives',
      subtopics: [
        '7.1. Definition of Derivative',
        '7.2. Differentiation Rules',
        '7.3. Chain Rule',
        '7.4. Implicit Differentiation',
        '7.5. Applications of Derivatives'
      ]
    }
  ]
};
