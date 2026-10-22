// Chemistry Subject Configuration
// This file contains all chapters and subtopics for Remedial Chemistry

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

export const chemistryConfig: SubjectConfig = {
  name: 'Chemistry',
  color: {
    primary: 'green',
    secondary: 'teal',
    gradient: 'from-green-600 to-teal-600'
  },
  chapters: [
    {
      id: 'remedial-chemistry-ch1',
      title: 'Chapter 1: Atomic Structure and Periodicity (8 hours)',
      subtopics: [
        '1.1. The concept of the atom',
        '1.2. Discoveries of subatomic particles',
        '1.3. The Bohr Theory of the hydrogen atom',
        '1.4. The quantum mechanical model of the atom',
        '1.4.1. The electromagnetic radiation and atomic spectra',
        '1.4.2. Electronic Configuration and Periodic Table'
      ]
    },
    {
      id: 'remedial-chemistry-ch2',
      title: 'Chapter 2: Chemical Bonding and Structure (6 hours)',
      subtopics: [
        '2.1. Introduction',
        '2.2. Types of Chemical Bonding',
        '2.2.1. Ionic Bonding',
        '2.2.2. Covalent Bonding',
        '2.2.3. Metallic Bonding',
        '2.3. Valence Shell Electron Pair Repulsion Theory and Molecular Geometry',
        '2.4. Bonding Theories'
      ]
    },
    {
      id: 'remedial-chemistry-ch3',
      title: 'Chapter 3: Physical States of Matter (6 hours)',
      subtopics: [
        '3.1. Introduction',
        '3.2. The Kinetic Theory of Matter',
        '3.3. Properties of Matter',
        '3.4. The Gaseous State',
        '3.4.1. The Kinetic Molecular Theory of Gases',
        '3.4.2. The Gas Laws',
        '3.5. The Liquid State',
        '3.5.1. Properties of liquids: Surface Tension and Viscosity',
        '3.5.2. Intermolecular Forces; Explaining Liquid Properties',
        '3.6. The Solid State',
        '3.6.1. Classification of solids',
        '3.7. Phase transitions'
      ]
    },
    {
      id: 'remedial-chemistry-ch4',
      title: 'Chapter 4: Solutions (12 hours)',
      subtopics: [
        '4.1. Introduction',
        '4.2. Types of Solutions',
        '4.3. The Solution Process',
        '4.4. Solubility',
        '4.5. Solubility as Equilibrium Process',
        '4.6. Ways of Expressing Concentrations of Solutions',
        '4.7. Preparation of solutions'
      ]
    },
    {
      id: 'remedial-chemistry-ch5',
      title: 'Chapter 5: Chemical Reactions and Stoichiometry (8 hours)',
      subtopics: [
        '5.1. Introduction',
        '5.2. Laws of chemical Reactions',
        '5.3. Energy changes in chemical reactions',
        '5.4. Types of Chemical Reactions',
        '5.5. Balancing Chemical Reactions',
        '5.6. Calculations with Chemical Formulas and Equations',
        '5.7. Rates of Chemical Reactions'
      ]
    },
    {
      id: 'remedial-chemistry-ch6',
      title: 'Chapter 6: Chemical Equilibrium (6 hours)',
      subtopics: [
        '6.1. Introduction (The equilibrium expressions and equilibrium constant)',
        '6.2. Characteristics of Chemical Equilibrium',
        '6.3. The Le Chatelier\'s Principle',
        '6.4. Ionic Equilibrium'
      ]
    },
    {
      id: 'remedial-chemistry-ch7',
      title: 'Chapter 7: Electrochemistry (6 hours)',
      subtopics: [
        '7.1. Introduction',
        '7.2. Electrical conductivity',
        '7.3. Electrochemical Cells',
        '7.3.1. Galvanic cells',
        '7.3.2. Electrolytic cells',
        '7.4. Quantitative aspects of electrolysis',
        '7.5. Applications of Electrochemistry'
      ]
    },
    {
      id: 'remedial-chemistry-ch8',
      title: 'Chapter 8: Introduction to Organic Chemistry (12 hours)',
      subtopics: [
        '8.1. Introduction',
        '8.2. Classification of organic compounds',
        '8.3. Hydrocarbons (classification, Naming, uses, and general Properties)',
        '8.4. Alcohols, Carboxylic Acids, and Esters',
        '8.5. Uses of organic compounds'
      ]
    }
  ]
};
