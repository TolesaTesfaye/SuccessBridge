// Grade 12 Physics Subject Configuration

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

export const physicsConfig: SubjectConfig = {
  name: 'Physics',
  grade: 'Grade 12',
  color: {
    primary: 'red',
    secondary: 'rose',
    gradient: 'from-red-600 to-rose-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Electrostatics',
      subtopics: [
        '1.1. Electric Charge and Force',
        '1.2. Electric Field',
        '1.3. Electric Potential',
        '1.4. Capacitance'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Current Electricity',
      subtopics: [
        '2.1. Electric Current',
        '2.2. Resistance and Ohm\'s Law',
        '2.3. Electrical Circuits',
        '2.4. Electrical Power and Energy'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Magnetism',
      subtopics: [
        '3.1. Magnetic Fields',
        '3.2. Magnetic Force',
        '3.3. Electromagnetic Induction',
        '3.4. Applications of Magnetism'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Waves and Optics',
      subtopics: [
        '4.1. Wave Properties',
        '4.2. Sound Waves',
        '4.3. Light and Reflection',
        '4.4. Refraction and Lenses'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Modern Physics',
      subtopics: [
        '5.1. Atomic Structure',
        '5.2. Quantum Theory',
        '5.3. Nuclear Physics',
        '5.4. Radioactivity'
      ]
    }
  ]
};
