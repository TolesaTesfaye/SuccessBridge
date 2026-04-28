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

// Psychology now uses chapter-based structure
// See chapters/Chapter1 through Chapter9 for actual content
export const PSYCHOLOGY_CONTENT: CourseContent = {
  subject: 'Psychology',
  chapters: []
};
