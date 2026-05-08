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

// Geography now uses chapter-based structure
// See chapters/Chapter1 through Chapter8 for actual content
export const GEOGRAPHY_CONTENT: CourseContent = {
  subject: 'Geography',
  chapters: []
};
