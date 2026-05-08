// Grade 12 History Subject Configuration

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

export const historyConfig: SubjectConfig = {
  name: 'History',
  grade: 'Grade 12',
  color: {
    primary: 'amber',
    secondary: 'orange',
    gradient: 'from-amber-600 to-orange-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: The Cold War',
      subtopics: [
        '1.1. Origins of the Cold War',
        '1.2. Major Events and Conflicts',
        '1.3. The Arms Race',
        '1.4. End of the Cold War'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Decolonization in Africa',
      subtopics: [
        '2.1. Causes of Decolonization',
        '2.2. Independence Movements',
        '2.3. Post-Independence Challenges',
        '2.4. Pan-Africanism'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Contemporary Ethiopia',
      subtopics: [
        '3.1. The Derg Regime',
        '3.2. The EPRDF Era',
        '3.3. Political Reforms',
        '3.4. Economic Development'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Globalization',
      subtopics: [
        '4.1. Economic Globalization',
        '4.2. Cultural Globalization',
        '4.3. Technology and Communication',
        '4.4. Challenges of Globalization'
      ]
    }
  ]
};
