import { PSYCHOLOGY_CONTENT } from '../dashboards/student/learning center/University/Freshman/Psychology/psychologyContent'
import { LOGIC_CONTENT } from '../dashboards/student/learning center/University/Freshman/Logic/logicContent'

export interface Topic {
  id: string
  title: string
  content: string[]
}

export interface Chapter {
  id: string
  title: string
  topics: Topic[]
}

export interface CourseContent {
  subject: string
  chapters: Chapter[]
}

export const FRESHMAN_COURSE_CONTENT: Record<string, CourseContent> = {
  Psychology: PSYCHOLOGY_CONTENT,
  Logic: LOGIC_CONTENT,
  // Physics uses new chapter structure - no content file needed
  // Math (Natural Science) uses new chapter structure - no content file needed
  // Math (Social Science) uses new chapter structure - no content file needed
  // Geography: Content not yet created
  // History: Content not yet created
  // English: Content not yet created
}
