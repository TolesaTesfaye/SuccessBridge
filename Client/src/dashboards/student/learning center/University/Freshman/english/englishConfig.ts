// English Subject Configuration
// This file contains all chapters and subtopics for English

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

export const englishConfig: SubjectConfig = {
  name: 'English',
  color: {
    primary: 'rose',
    secondary: 'red',
    gradient: 'from-rose-600 to-red-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Grammar Fundamentals',
      subtopics: [
        '1.1. Parts of Speech',
        '1.2. Sentence Structure',
        '1.3. Tenses',
        '1.4. Subject-Verb Agreement',
        '1.5. Active and Passive Voice'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Reading Comprehension',
      subtopics: [
        '2.1. Reading Strategies',
        '2.2. Main Idea and Supporting Details',
        '2.3. Inference and Interpretation',
        '2.4. Critical Reading',
        '2.5. Vocabulary in Context'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Writing Skills',
      subtopics: [
        '3.1. The Writing Process',
        '3.2. Paragraph Development',
        '3.3. Essay Structure',
        '3.4. Thesis Statements',
        '3.5. Transitions and Coherence'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Academic Writing',
      subtopics: [
        '4.1. Research Papers',
        '4.2. Citations and References',
        '4.3. Paraphrasing and Summarizing',
        '4.4. Avoiding Plagiarism',
        '4.5. Formal vs Informal Writing'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Literature Analysis',
      subtopics: [
        '5.1. Literary Devices',
        '5.2. Poetry Analysis',
        '5.3. Prose Analysis',
        '5.4. Drama Analysis',
        '5.5. Themes and Symbolism'
      ]
    },
    {
      id: 'chapter6',
      title: 'Chapter 6: Communication Skills',
      subtopics: [
        '6.1. Effective Communication',
        '6.2. Public Speaking',
        '6.3. Presentation Skills',
        '6.4. Listening Skills',
        '6.5. Non-Verbal Communication'
      ]
    },
    {
      id: 'chapter7',
      title: 'Chapter 7: Critical Thinking',
      subtopics: [
        '7.1. Logical Reasoning',
        '7.2. Argument Analysis',
        '7.3. Fallacies',
        '7.4. Problem Solving',
        '7.5. Decision Making'
      ]
    },
    {
      id: 'chapter8',
      title: 'Chapter 8: Professional Writing',
      subtopics: [
        '8.1. Business Letters',
        '8.2. Email Etiquette',
        '8.3. Reports and Proposals',
        '8.4. Resume and Cover Letter',
        '8.5. Technical Writing'
      ]
    }
  ]
};
