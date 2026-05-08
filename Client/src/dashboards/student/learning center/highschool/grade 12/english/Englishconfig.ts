// Grade 12 English Subject Configuration
// This file contains all chapters and subtopics for Grade 12 English

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

export const englishConfig: SubjectConfig = {
  name: 'English',
  grade: 'Grade 12',
  color: {
    primary: 'indigo',
    secondary: 'purple',
    gradient: 'from-indigo-600 to-purple-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Advanced Grammar',
      subtopics: [
        '1.1. Complex Sentence Structures',
        '1.2. Advanced Tenses',
        '1.3. Conditional Sentences',
        '1.4. Reported Speech'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Literature Analysis',
      subtopics: [
        '2.1. Poetry Analysis',
        '2.2. Drama and Theater',
        '2.3. Novel Study',
        '2.4. Short Stories'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Writing Skills',
      subtopics: [
        '3.1. Essay Writing',
        '3.2. Argumentative Writing',
        '3.3. Creative Writing',
        '3.4. Research Papers'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Reading Comprehension',
      subtopics: [
        '4.1. Critical Reading',
        '4.2. Inference and Analysis',
        '4.3. Vocabulary in Context',
        '4.4. Main Ideas and Details'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Speaking and Listening',
      subtopics: [
        '5.1. Public Speaking',
        '5.2. Debate Skills',
        '5.3. Active Listening',
        '5.4. Presentation Skills'
      ]
    },
    {
      id: 'chapter6',
      title: 'Chapter 6: Language and Society',
      subtopics: [
        '6.1. Language Variation',
        '6.2. Language Change',
        '6.3. Sociolinguistics',
        '6.4. Language and Identity'
      ]
    },
    {
      id: 'chapter7',
      title: 'Chapter 7: Media Literacy',
      subtopics: [
        '7.1. Analyzing Media Texts',
        '7.2. Advertising and Persuasion',
        '7.3. Digital Communication',
        '7.4. Critical Media Consumption'
      ]
    },
    {
      id: 'chapter8',
      title: 'Chapter 8: Exam Preparation',
      subtopics: [
        '8.1. Test-Taking Strategies',
        '8.2. Time Management',
        '8.3. Practice Questions',
        '8.4. Review and Revision'
      ]
    }
  ]
};
