// History Subject Configuration
// This file contains all chapters and subtopics for History

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

export const historyConfig: SubjectConfig = {
  name: 'History',
  color: {
    primary: 'amber',
    secondary: 'orange',
    gradient: 'from-amber-600 to-orange-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Introduction to History',
      subtopics: [
        '1.1. What is History?',
        '1.2. Sources of History',
        '1.3. Historiography',
        '1.4. Periodization of History',
        '1.5. Importance of Studying History'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Ancient Civilizations',
      subtopics: [
        '2.1. Mesopotamian Civilization',
        '2.2. Egyptian Civilization',
        '2.3. Indus Valley Civilization',
        '2.4. Chinese Civilization',
        '2.5. Greek and Roman Civilizations'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Medieval Period',
      subtopics: [
        '3.1. Rise of Islam',
        '3.2. Medieval Europe',
        '3.3. Feudalism',
        '3.4. The Crusades',
        '3.5. Medieval Africa and Asia'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Renaissance and Reformation',
      subtopics: [
        '4.1. The Renaissance',
        '4.2. Humanism',
        '4.3. Protestant Reformation',
        '4.4. Counter-Reformation',
        '4.5. Scientific Revolution'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Age of Exploration',
      subtopics: [
        '5.1. Causes of Exploration',
        '5.2. Major Explorers',
        '5.3. Columbian Exchange',
        '5.4. Colonial Empires',
        '5.5. Impact on Indigenous Peoples'
      ]
    },
    {
      id: 'chapter6',
      title: 'Chapter 6: Revolutions and Independence',
      subtopics: [
        '6.1. American Revolution',
        '6.2. French Revolution',
        '6.3. Industrial Revolution',
        '6.4. Latin American Independence',
        '6.5. Nationalism in Europe'
      ]
    },
    {
      id: 'chapter7',
      title: 'Chapter 7: Imperialism and Colonialism',
      subtopics: [
        '7.1. New Imperialism',
        '7.2. Scramble for Africa',
        '7.3. Colonialism in Asia',
        '7.4. Resistance Movements',
        '7.5. Impact of Colonialism'
      ]
    },
    {
      id: 'chapter8',
      title: 'Chapter 8: World Wars',
      subtopics: [
        '8.1. Causes of World War I',
        '8.2. World War I Events',
        '8.3. Interwar Period',
        '8.4. World War II',
        '8.5. Consequences of World Wars'
      ]
    },
    {
      id: 'chapter9',
      title: 'Chapter 9: Contemporary World',
      subtopics: [
        '9.1. Cold War',
        '9.2. Decolonization',
        '9.3. Civil Rights Movements',
        '9.4. Globalization',
        '9.5. Modern Challenges'
      ]
    }
  ]
};
