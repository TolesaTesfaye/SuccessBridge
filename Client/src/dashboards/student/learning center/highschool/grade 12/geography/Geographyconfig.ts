// Grade 12 Geography Subject Configuration

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

export const geographyConfig: SubjectConfig = {
  name: 'Geography',
  grade: 'Grade 12',
  color: {
    primary: 'teal',
    secondary: 'cyan',
    gradient: 'from-teal-600 to-cyan-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Population Geography',
      subtopics: [
        '1.1. Population Distribution and Density',
        '1.2. Population Growth and Change',
        '1.3. Migration',
        '1.4. Population Policies'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Settlement Geography',
      subtopics: [
        '2.1. Rural Settlements',
        '2.2. Urban Settlements',
        '2.3. Urbanization',
        '2.4. Urban Problems and Solutions'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Economic Geography',
      subtopics: [
        '3.1. Agriculture',
        '3.2. Industry',
        '3.3. Trade and Transportation',
        '3.4. Tourism'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Regional Geography of Ethiopia',
      subtopics: [
        '4.1. Physical Regions',
        '4.2. Economic Regions',
        '4.3. Cultural Regions',
        '4.4. Development Challenges'
      ]
    }
  ]
};
