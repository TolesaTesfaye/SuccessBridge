// Grade 11 Chemistry Subject Configuration

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
  grade: 'Grade 11',
  color: {
    primary: 'green',
    secondary: 'teal',
    gradient: 'from-green-600 to-teal-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Some Basic Concepts of Chemistry',
      subtopics: [
        '1.1. Matter and its Nature',
        '1.2. Laws of Chemical Combination',
        '1.3. Atomic and Molecular Masses',
        '1.4. Mole Concept'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Structure of Atom',
      subtopics: [
        '2.1. Discovery of Subatomic Particles',
        '2.2. Atomic Models',
        '2.3. Quantum Numbers',
        '2.4. Electronic Configuration'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Chemical Bonding',
      subtopics: [
        '3.1. Ionic Bonding',
        '3.2. Covalent Bonding',
        '3.3. Molecular Orbital Theory',
        '3.4. Hydrogen Bonding'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: States of Matter',
      subtopics: [
        '4.1. Gaseous State',
        '4.2. Liquid State',
        '4.3. Solid State',
        '4.4. Phase Transitions'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Thermodynamics',
      subtopics: [
        '5.1. First Law of Thermodynamics',
        '5.2. Enthalpy',
        '5.3. Entropy',
        '5.4. Gibbs Free Energy'
      ]
    }
  ]
};
