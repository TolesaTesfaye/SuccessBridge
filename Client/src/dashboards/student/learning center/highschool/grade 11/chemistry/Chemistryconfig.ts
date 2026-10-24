// Grade 11 Chemistry Subject Configuration

export interface ChapterConfig {
  id: string;
  title: string;
  subtopics?: string[];
  component?: () => Promise<any>;
}

export interface SubjectConfig {
  name: string;
  grade: string;
  isFree?: boolean;
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
  isFree: true, // Chemistry is free for all users
  color: {
    primary: 'green',
    secondary: 'teal',
    gradient: 'from-green-600 to-teal-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Atomic Structure and Periodic Properties of the Elements',
      subtopics: [
        '1.1. Introduction',
        '1.2. Dalton’s Atomic Theory and the Modern Atomic Theory',
        '1.3. Early Experiments to Characterize the Atom',
        '1.4. Make-up of the Nucleus',
        '1.5. Electromagnetic Radiation and Atomic Spectra',
        '1.6. The Quantum Mechanical Model of the Atom',
        '1.7. Electronic Configurations and Orbital Diagrams',
        '1.8. Electronic Configurations and the Periodic Table of the Elements'
      ],
      component: () => import('./chapters/Chapter1')
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Chemical Bonding and Structure',
      subtopics: [
        '2.1. Introduction',
        '2.2. Ionic Bonds',
        '2.3. Covalent Bonds and Molecular Geometry',
        '2.4. Metallic Bonding',
        '2.5. Chemical Bonding Theories',
        '2.6. Types of Crystals'
      ],
      component: () => import('./chapters/Chapter 2')
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
