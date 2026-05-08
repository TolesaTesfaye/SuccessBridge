export interface Topic {
  id: string;
  title: string;
  content: string[];
}

export interface Chapter {
  id: string;
  title: string;
  topics: Topic[];
}

export interface CourseContent {
  subject: string;
  chapters: Chapter[];
}

// English now uses chapter-based structure
// See chapters/Chapter1 through Chapter8 for actual content
export const ENGLISH_CONTENT: CourseContent = {
  subject: 'English',
  chapters: []
};
