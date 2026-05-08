// Grade 12 Economics Subject Configuration
// This file contains all chapters and subtopics for Grade 12 Economics

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

export const economicsConfig: SubjectConfig = {
  name: 'Economics',
  grade: 'Grade 12',
  color: {
    primary: 'amber',
    secondary: 'yellow',
    gradient: 'from-amber-600 to-yellow-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Introduction to Economics',
      subtopics: [
        '1.1. Basic Economic Concepts',
        '1.2. Economic Systems',
        '1.3. Scarcity and Choice',
        '1.4. Production Possibilities'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Microeconomics',
      subtopics: [
        '2.1. Demand and Supply',
        '2.2. Market Equilibrium',
        '2.3. Elasticity',
        '2.4. Consumer Behavior'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Market Structures',
      subtopics: [
        '3.1. Perfect Competition',
        '3.2. Monopoly',
        '3.3. Oligopoly',
        '3.4. Monopolistic Competition'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Macroeconomics',
      subtopics: [
        '4.1. National Income',
        '4.2. Economic Growth',
        '4.3. Unemployment',
        '4.4. Inflation'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Money and Banking',
      subtopics: [
        '5.1. Functions of Money',
        '5.2. Banking System',
        '5.3. Central Bank',
        '5.4. Monetary Policy'
      ]
    },
    {
      id: 'chapter6',
      title: 'Chapter 6: International Trade',
      subtopics: [
        '6.1. Comparative Advantage',
        '6.2. Trade Barriers',
        '6.3. Balance of Payments',
        '6.4. Exchange Rates'
      ]
    },
    {
      id: 'chapter7',
      title: 'Chapter 7: Economic Development',
      subtopics: [
        '7.1. Development Indicators',
        '7.2. Poverty and Inequality',
        '7.3. Sustainable Development',
        '7.4. Economic Planning'
      ]
    },
    {
      id: 'chapter8',
      title: 'Chapter 8: Ethiopian Economy',
      subtopics: [
        '8.1. Economic Structure',
        '8.2. Agriculture Sector',
        '8.3. Industrial Development',
        '8.4. Economic Challenges'
      ]
    }
  ]
};
