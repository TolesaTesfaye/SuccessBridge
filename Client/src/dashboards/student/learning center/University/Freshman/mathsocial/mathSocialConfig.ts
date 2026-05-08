// Math (Social Science) Subject Configuration
// This file contains all chapters and subtopics for Math Social Science

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

export const mathSocialConfig: SubjectConfig = {
  name: 'Math (Social Science)',
  color: {
    primary: 'cyan',
    secondary: 'blue',
    gradient: 'from-cyan-600 to-blue-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Sets and Set Operations',
      subtopics: [
        '1.1. Basic Concepts of Sets',
        '1.2. Set Operations',
        '1.3. Venn Diagrams',
        '1.4. Cardinality of Sets',
        '1.5. Applications of Sets'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Relations and Functions',
      subtopics: [
        '2.1. Cartesian Product',
        '2.2. Relations',
        '2.3. Functions',
        '2.4. Types of Functions',
        '2.5. Inverse Functions'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Linear Functions',
      subtopics: [
        '3.1. Linear Equations',
        '3.2. Slope and Intercept',
        '3.3. Graphing Linear Functions',
        '3.4. Systems of Linear Equations',
        '3.5. Applications'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Quadratic Functions',
      subtopics: [
        '4.1. Quadratic Equations',
        '4.2. Completing the Square',
        '4.3. Quadratic Formula',
        '4.4. Graphs of Quadratic Functions',
        '4.5. Applications'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Sequences and Series',
      subtopics: [
        '5.1. Arithmetic Sequences',
        '5.2. Geometric Sequences',
        '5.3. Arithmetic Series',
        '5.4. Geometric Series',
        '5.5. Applications'
      ]
    },
    {
      id: 'chapter6',
      title: 'Chapter 6: Mathematics of Finance',
      subtopics: [
        '6.1. Simple Interest',
        '6.2. Compound Interest',
        '6.3. Annuities',
        '6.4. Loans and Mortgages',
        '6.5. Investment Analysis'
      ]
    },
    {
      id: 'chapter7',
      title: 'Chapter 7: Statistics and Probability',
      subtopics: [
        '7.1. Descriptive Statistics',
        '7.2. Measures of Central Tendency',
        '7.3. Measures of Dispersion',
        '7.4. Basic Probability',
        '7.5. Probability Distributions'
      ]
    }
  ]
};
