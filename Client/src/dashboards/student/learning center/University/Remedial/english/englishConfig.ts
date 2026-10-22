// English Subject Configuration
// This file contains all chapters and subtopics for Remedial English

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
    primary: 'purple',
    secondary: 'pink',
    gradient: 'from-purple-600 to-pink-600'
  },
  chapters: [
    {
      id: 'remedial-english-ch1',
      title: 'Unit 1: Hobbies and Crafts',
      subtopics: [
        '1.1. Listening Skills - My favourite free-time activity',
        '1.2. Grammar',
        '1.3. Reading Comprehension',
        '1.4. Speaking - What I like doing in my free time?',
        '1.5. Writing - Descriptive writing and Keeping a diary'
      ]
    },
    {
      id: 'remedial-english-ch2',
      title: 'Unit 2: Moral Education and Personal Responsibility',
      subtopics: [
        '2.1. Listening Skills - The Story of an Orphan',
        '2.2. Grammar',
        '2.3. Speaking - Using so and neither, Apologizing',
        '2.4. Reading Comprehension - A Difficult situation',
        '2.5. Writing - Warnings'
      ]
    },
    {
      id: 'remedial-english-ch3',
      title: 'Unit 3: Education',
      subtopics: [
        '3.1. Listening Skills - The Education System in Ethiopia',
        '3.2. Grammar',
        '3.3. Speaking - The Education system: Present, past and future',
        '3.4. Reading Comprehension - Barriers to Learning',
        '3.5. Writing - Letter Writing'
      ]
    },
    {
      id: 'remedial-english-ch4',
      title: 'Unit 4: Water',
      subtopics: [
        '4.1. Listening Skills - The Water Cycle',
        '4.2. Reading Comprehension - The Tale of a Tap',
        '4.3. Speaking - Water shortage: Describing cause and effect',
        '4.4. Grammar',
        '4.5. Writing - Saving Water in Ethiopia (Paragraph writing)'
      ]
    },
    {
      id: 'remedial-english-ch5',
      title: 'Unit 5: Family Life',
      subtopics: [
        '5.1. Listening Skills - A Father\'s Voice',
        '5.2. Grammar',
        '5.3. Reading Comprehension - My Family, A Childhood Memory',
        '5.4. Speaking - Expressing Opinion, Agreeing and Disagreeing',
        '5.5. Writing - Memories, A Formal Letter'
      ]
    },
    {
      id: 'remedial-english-ch6',
      title: 'Unit 6: United Nations',
      subtopics: [
        '6.1. Listening Skills - A Lecture on the UN',
        '6.2. Speaking - Pronunciation: contractions',
        '6.3. Reading Comprehension - The UN Convention on the Rights of the Child',
        '6.4. Grammar',
        '6.5. Writing - Writing a report'
      ]
    }
  ]
};
