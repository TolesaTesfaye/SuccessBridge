// Grade 11 Geography Subject Configuration

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
  grade: 'Grade 11',
  color: {
    primary: 'cyan',
    secondary: 'sky',
    gradient: 'from-cyan-600 to-sky-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Physical Geography',
      subtopics: [
        '1.1. Earth\'s Structure',
        '1.2. Landforms',
        '1.3. Climate and Weather',
        '1.4. Natural Resources'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Human Geography',
      subtopics: [
        '2.1. Population Distribution',
        '2.2. Migration',
        '2.3. Settlements',
        '2.4. Urbanization'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Economic Geography',
      subtopics: [
        '3.1. Agriculture',
        '3.2. Industries',
        '3.3. Trade and Commerce',
        '3.4. Transportation'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Environmental Geography',
      subtopics: [
        '4.1. Ecosystems',
        '4.2. Environmental Issues',
        '4.3. Conservation',
        '4.4. Sustainable Development'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Map Skills',
      subtopics: [
        '5.1. Map Reading',
        '5.2. Scale and Distance',
        '5.3. Topographic Maps',
        '5.4. GIS and Remote Sensing'
      ]
    }
  ]
};
