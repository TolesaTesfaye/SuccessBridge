// Grade 11 Math Subject Configuration

export interface ChapterConfig {
  id: string;
  title: string;
  subtopics?: string[];
}

export interface SubjectConfig {
  name: string;
  grade: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  chapters: ChapterConfig[];
}

export const mathConfig: SubjectConfig = {
  name: 'Math',
  grade: 'Grade 11',
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
        '1.4. Inverse Functions'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Trigonometry',
      subtopics: [
        '2.1. Trigonometric Ratios',
        '2.2. Trigonometric Identities',
        '2.3. Trigonometric Equations',
        '2.4. Graphs of Trigonometric Functions'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Sequences and Series',
      subtopics: [
        '3.1. Arithmetic Progressions',
        '3.2. Geometric Progressions',
        '3.3. Sum of Series',
        '3.4. Applications'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Permutations and Combinations',
      subtopics: [
        '4.1. Fundamental Principle of Counting',
        '4.2. Permutations',
        '4.3. Combinations',
        '4.4. Binomial Theorem'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Coordinate Geometry',
      subtopics: [
        '5.1. Straight Lines',
        '5.2. Circles',
        '5.3. Conic Sections',
        '5.4. Distance and Section Formula'
      ]
    }
  ]
};
