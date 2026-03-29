import { REMEDIAL_MATH_CONTENT } from '../dashboards/student/learning center/University/Remedial/math/mathContent'
import { REMEDIAL_ENGLISH_CONTENT } from '../dashboards/student/learning center/University/Remedial/english/englishContent'
import { REMEDIAL_PHYSICS_CONTENT } from '../dashboards/student/learning center/University/Remedial/physics/physicsContent'
import { REMEDIAL_CHEMISTRY_CONTENT } from '../dashboards/student/learning center/University/Remedial/chemistry/chemistryContent'
import { REMEDIAL_GEOGRAPHY_CONTENT } from '../dashboards/student/learning center/University/Remedial/geography/geographyContent'
import { REMEDIAL_HISTORY_CONTENT } from '../dashboards/student/learning center/University/Remedial/history/historyContent'

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

export const REMEDIAL_COURSE_CONTENT: Record<string, CourseContent> = {
  Math: REMEDIAL_MATH_CONTENT,
  English: REMEDIAL_ENGLISH_CONTENT,
  Physics: REMEDIAL_PHYSICS_CONTENT,
  Chemistry: REMEDIAL_CHEMISTRY_CONTENT,
  Geography: REMEDIAL_GEOGRAPHY_CONTENT,
  History: REMEDIAL_HISTORY_CONTENT,
}