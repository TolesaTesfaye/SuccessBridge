// Grade 11 English Subject Configuration

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
  grade: 'Grade 11',
  color: {
    primary: 'amber',
    secondary: 'orange',
    gradient: 'from-amber-600 to-orange-600'
  },
  chapters: [
    {
      id: 'chapter1',
      title: 'Chapter 1: Reading Comprehension',
      subtopics: [
        '1.1. Understanding Main Ideas',
        '1.2. Inference and Interpretation',
        '1.3. Vocabulary in Context',
        '1.4. Critical Analysis'
      ]
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Writing Skills',
      subtopics: [
        '2.1. Essay Writing',
        '2.2. Letter Writing',
        '2.3. Report Writing',
        '2.4. Creative Writing'
      ]
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Grammar',
      subtopics: [
        '3.1. Parts of Speech',
        '3.2. Tenses',
        '3.3. Voice and Narration',
        '3.4. Sentence Structure'
      ]
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: Literature',
      subtopics: [
        '4.1. Poetry Analysis',
        '4.2. Prose Analysis',
        '4.3. Drama',
        '4.4. Literary Devices'
      ]
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Communication Skills',
      subtopics: [
        '5.1. Listening Skills',
        '5.2. Speaking Skills',
        '5.3. Presentation Skills',
        '5.4. Group Discussion'
      ]
    }
  ]
};
