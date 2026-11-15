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
      title: 'Chapter 1: Acid-Base Equilibria',
      subtopics: [
        '1.1. Acid-Base Concepts',
        '1.2. Ionic Equilibria of Weak Acids and Bases',
        '1.3. Common Ion Effect and Buffer Solution',
        '1.4. Hydrolysis of Salts',
        '1.5. Acid-Base Indicators and Titrations'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Electrochemistry',
      subtopics: [
        '2.1. Oxidation-Reduction Reactions',
        '2.2. Electrolysis of Aqueous Solutions',
        '2.3. Quantitative Aspects of Electrolysis',
        '2.4. Industrial Application of Electrolysis',
        '2.5. Voltaic Cells'
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
