// Grade 11 History Subject Configuration

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
  grade: 'Grade 11',
  color: {
    primary: 'rose',
    secondary: 'red',
    gradient: 'from-rose-600 to-red-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Ancient Civilizations',
      subtopics: [
        '1.1. Mesopotamian Civilization',
        '1.2. Egyptian Civilization',
        '1.3. Indus Valley Civilization',
        '1.4. Chinese Civilization'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Medieval Period',
      subtopics: [
        '2.1. Feudalism',
        '2.2. Crusades',
        '2.3. Renaissance',
        '2.4. Reformation'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Modern History',
      subtopics: [
        '3.1. Industrial Revolution',
        '3.2. French Revolution',
        '3.3. World War I',
        '3.4. World War II'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Contemporary History',
      subtopics: [
        '4.1. Cold War',
        '4.2. Decolonization',
        '4.3. Globalization',
        '4.4. Modern Conflicts'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Cultural History',
      subtopics: [
        '5.1. Art and Architecture',
        '5.2. Literature and Philosophy',
        '5.3. Science and Technology',
        '5.4. Social Movements'
      ]
    }
  ]
};
