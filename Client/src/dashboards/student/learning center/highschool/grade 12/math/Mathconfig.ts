// Grade 12 Math Subject Configuration

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
  grade: 'Grade 12',
  color: {
    primary: 'blue',
    secondary: 'indigo',
    gradient: 'from-blue-600 to-indigo-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Functions and Graphs',
      subtopics: [
        '1.1. Types of Functions',
        '1.2. Composite and Inverse Functions',
        '1.3. Exponential and Logarithmic Functions',
        '1.4. Graphing Techniques'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Calculus',
      subtopics: [
        '2.1. Limits and Continuity',
        '2.2. Derivatives',
        '2.3. Applications of Derivatives',
        '2.4. Integration'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Sequences and Series',
      subtopics: [
        '3.1. Arithmetic Sequences',
        '3.2. Geometric Sequences',
        '3.3. Series and Summation',
        '3.4. Convergence and Divergence'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Vectors and Matrices',
      subtopics: [
        '4.1. Vector Operations',
        '4.2. Matrix Operations',
        '4.3. Determinants',
        '4.4. Systems of Linear Equations'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Probability and Statistics',
      subtopics: [
        '5.1. Probability Theory',
        '5.2. Probability Distributions',
        '5.3. Statistical Measures',
        '5.4. Hypothesis Testing'
      ]
    }
  ]
};
