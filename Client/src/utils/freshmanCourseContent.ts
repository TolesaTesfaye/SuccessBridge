import { PSYCHOLOGY_CONTENT } from '../dashboards/student/learning center/University/Freshman/Psychology/psychologyContent'
import { LOGIC_CONTENT } from '../dashboards/student/learning center/University/Freshman/Logic/logicContent'
import { PHYSICS_CONTENT } from '../dashboards/student/learning center/University/Freshman/physics/physicsContent'
import { MATH_CONTENT } from '../dashboards/student/learning center/University/Freshman/math/mathContent'
import { GEOGRAPHY_CONTENT } from '../dashboards/student/learning center/University/Freshman/geography/geographyContent'
import { HISTORY_CONTENT } from '../dashboards/student/learning center/University/Freshman/history/historyContent'
import { ENGLISH_CONTENT } from '../dashboards/student/learning center/University/Freshman/english/englishContent'

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
  Physics: PHYSICS_CONTENT,
  Math: MATH_CONTENT,
  Geography: GEOGRAPHY_CONTENT,
  History: HISTORY_CONTENT,
  English: ENGLISH_CONTENT,
}
