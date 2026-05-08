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

// Physics now uses chapter-based structure
// See chapters/Chapter1 through Chapter7 for actual content
export const PHYSICS_CONTENT: CourseContent = {
  subject: 'Physics',
  chapters: []
};
