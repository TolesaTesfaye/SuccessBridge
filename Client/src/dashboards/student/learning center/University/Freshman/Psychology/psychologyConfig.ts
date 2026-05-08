// Psychology Subject Configuration
// This file contains all chapters and subtopics for Psychology

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

export const psychologyConfig: SubjectConfig = {
  name: 'Psychology',
  color: {
    primary: 'pink',
    secondary: 'purple',
    gradient: 'from-pink-600 to-purple-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Essence of Psychology',
      subtopics: [
        '1.1. Definition of Psychology',
        '1.2. The Four Goals of Psychology',
        '1.3. Historical Evolution',
        '1.4. Modern Perspectives'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Human Development',
      subtopics: [
        '2.1. Basics of Human Development',
        '2.2. Principles of Development',
        '2.3. Aspects of Development',
        '2.4. Theories of Development'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Learning and Theories',
      subtopics: [
        '3.1. Definition of Learning',
        '3.2. Classical Conditioning',
        '3.3. Operant Conditioning',
        '3.4. Observational Learning'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Memory and Forgetting',
      subtopics: [
        '4.1. Nature of Memory',
        '4.2. Types of Memory',
        '4.3. Forgetting and Its Causes',
        '4.4. Improving Memory'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Motivation and Emotions',
      subtopics: [
        '5.1. Nature of Motivation',
        '5.2. Theories of Motivation',
        '5.3. Nature of Emotions',
        '5.4. Theories of Emotions'
      ]
    },
    {
      id: 'chapter6',
      title: 'Chapter 6: Personality',
      subtopics: [
        '6.1. Definition of Personality',
        '6.2. Psychoanalytic Theory',
        '6.3. Humanistic Theory',
        '6.4. Trait Theory'
      ]
    },
    {
      id: 'chapter7',
      title: 'Chapter 7: Psychological Disorders',
      subtopics: [
        '7.1. Understanding Psychological Disorders',
        '7.2. Anxiety Disorders',
        '7.3. Mood Disorders',
        '7.4. Schizophrenia'
      ]
    },
    {
      id: 'chapter8',
      title: 'Chapter 8: Life Skills',
      subtopics: [
        '8.1. Introduction to Life Skills',
        '8.2. Types of Life Skills',
        '8.3. Importance of Life Skills',
        '8.4. Developing Life Skills'
      ]
    },
    {
      id: 'chapter9',
      title: 'Chapter 9: Intra-Personal Skills',
      subtopics: [
        '9.1. Self-Awareness',
        '9.2. Self-Esteem',
        '9.3. Self-Management',
        '9.4. Emotional Intelligence'
      ]
    },
    {
      id: 'chapter10',
      title: 'Chapter 10: Academic Skills',
      subtopics: [
        '10.1. Study Skills',
        '10.2. Time Management',
        '10.3. Note-Taking',
        '10.4. Test-Taking Strategies'
      ]
    },
    {
      id: 'chapter11',
      title: 'Chapter 11: Social Skills',
      subtopics: [
        '11.1. Communication Skills',
        '11.2. Interpersonal Relationships',
        '11.3. Conflict Resolution',
        '11.4. Leadership Skills'
      ]
    }
  ]
};
