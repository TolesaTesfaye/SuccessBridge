// Grade 12 Chemistry Subject Configuration

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

export const chemistryConfig: SubjectConfig = {
  name: 'Chemistry',
  grade: 'Grade 12',
  color: {
    primary: 'purple',
    secondary: 'violet',
    gradient: 'from-purple-600 to-violet-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Chemical Kinetics',
      subtopics: [
        '1.1. Reaction Rates',
        '1.2. Rate Laws and Reaction Order',
        '1.3. Factors Affecting Reaction Rates',
        '1.4. Catalysis'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Chemical Equilibrium',
      subtopics: [
        '2.1. Equilibrium Concept',
        '2.2. Equilibrium Constant',
        '2.3. Le Chatelier\'s Principle',
        '2.4. Acid-Base Equilibrium'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Electrochemistry',
      subtopics: [
        '3.1. Oxidation-Reduction Reactions',
        '3.2. Electrochemical Cells',
        '3.3. Standard Electrode Potentials',
        '3.4. Applications of Electrochemistry'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Organic Chemistry',
      subtopics: [
        '4.1. Hydrocarbons',
        '4.2. Functional Groups',
        '4.3. Isomerism',
        '4.4. Organic Reactions'
      ]
    }
  ]
};
