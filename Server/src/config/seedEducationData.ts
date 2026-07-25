import Grade from '../models/Grade.js'
import Stream from '../models/Stream.js'
import Subject from '../models/Subject.js'
import University from '../models/University.js'
import Department from '../models/Department.js'
import { logger } from '../utils/logger.js'

const GRADES = [
  { name: 'Grade 9', level: 9, educationLevel: 'high_school' as const },
  { name: 'Grade 10', level: 10, educationLevel: 'high_school' as const },
  { name: 'Grade 11', level: 11, educationLevel: 'high_school' as const },
  { name: 'Grade 12', level: 12, educationLevel: 'high_school' as const },
  { name: 'Remedial', level: 0, educationLevel: 'university' as const },
  { name: 'Freshman', level: 1, educationLevel: 'university' as const },
  { name: 'Senior', level: 4, educationLevel: 'university' as const },
  { name: 'GC', level: 5, educationLevel: 'university' as const },
]

const STREAMS = [
  { name: 'Natural Science', code: 'g11_natural', gradeName: 'Grade 11' },
  { name: 'Social Science', code: 'g11_social', gradeName: 'Grade 11' },
  { name: 'Natural Science', code: 'g12_natural', gradeName: 'Grade 12' },
  { name: 'Social Science', code: 'g12_social', gradeName: 'Grade 12' },
]

interface SubjectSeed {
  name: string
  code: string
  gradeName: string
  streamCode?: string
}

const SUBJECTS: SubjectSeed[] = [
  // Grade 9 (common subjects, no streams)
  { name: 'Mathematics', code: 'MATH9', gradeName: 'Grade 9' },
  { name: 'Physics', code: 'PHYS9', gradeName: 'Grade 9' },
  { name: 'Chemistry', code: 'CHEM9', gradeName: 'Grade 9' },
  { name: 'Biology', code: 'BIO9', gradeName: 'Grade 9' },
  { name: 'English', code: 'ENG9', gradeName: 'Grade 9' },
  { name: 'History', code: 'HIST9', gradeName: 'Grade 9' },
  { name: 'Geography', code: 'GEOG9', gradeName: 'Grade 9' },
  { name: 'Civics', code: 'CIV9', gradeName: 'Grade 9' },
  { name: 'ICT', code: 'ICT9', gradeName: 'Grade 9' },
  // Grade 10 (common subjects, no streams)
  { name: 'Mathematics', code: 'MATH10', gradeName: 'Grade 10' },
  { name: 'Physics', code: 'PHYS10', gradeName: 'Grade 10' },
  { name: 'Chemistry', code: 'CHEM10', gradeName: 'Grade 10' },
  { name: 'Biology', code: 'BIO10', gradeName: 'Grade 10' },
  { name: 'English', code: 'ENG10', gradeName: 'Grade 10' },
  { name: 'History', code: 'HIST10', gradeName: 'Grade 10' },
  { name: 'Geography', code: 'GEOG10', gradeName: 'Grade 10' },
  { name: 'Civics', code: 'CIV10', gradeName: 'Grade 10' },
  { name: 'ICT', code: 'ICT10', gradeName: 'Grade 10' },
  // Grade 11 Natural
  { name: 'Mathematics', code: 'MATH11N', gradeName: 'Grade 11', streamCode: 'natural' },
  { name: 'Physics', code: 'PHYS11N', gradeName: 'Grade 11', streamCode: 'natural' },
  { name: 'Chemistry', code: 'CHEM11N', gradeName: 'Grade 11', streamCode: 'natural' },
  { name: 'Biology', code: 'BIO11N', gradeName: 'Grade 11', streamCode: 'natural' },
  { name: 'English', code: 'ENG11N', gradeName: 'Grade 11', streamCode: 'natural' },
  { name: 'ICT', code: 'ICT11N', gradeName: 'Grade 11', streamCode: 'natural' },
  // Grade 11 Social
  { name: 'History', code: 'HIST11S', gradeName: 'Grade 11', streamCode: 'social' },
  { name: 'Geography', code: 'GEOG11S', gradeName: 'Grade 11', streamCode: 'social' },
  { name: 'Economics', code: 'ECON11S', gradeName: 'Grade 11', streamCode: 'social' },
  { name: 'English', code: 'ENG11S', gradeName: 'Grade 11', streamCode: 'social' },
  { name: 'ICT', code: 'ICT11S', gradeName: 'Grade 11', streamCode: 'social' },
  { name: 'Biology', code: 'BIO11S', gradeName: 'Grade 11', streamCode: 'social' },
  // Grade 12 Natural
  { name: 'Mathematics', code: 'MATH12N', gradeName: 'Grade 12', streamCode: 'natural' },
  { name: 'Physics', code: 'PHYS12N', gradeName: 'Grade 12', streamCode: 'natural' },
  { name: 'Chemistry', code: 'CHEM12N', gradeName: 'Grade 12', streamCode: 'natural' },
  { name: 'Biology', code: 'BIO12N', gradeName: 'Grade 12', streamCode: 'natural' },
  { name: 'English', code: 'ENG12N', gradeName: 'Grade 12', streamCode: 'natural' },
  { name: 'ICT', code: 'ICT12N', gradeName: 'Grade 12', streamCode: 'natural' },
  // Grade 12 Social
  { name: 'History', code: 'HIST12S', gradeName: 'Grade 12', streamCode: 'social' },
  { name: 'Geography', code: 'GEOG12S', gradeName: 'Grade 12', streamCode: 'social' },
  { name: 'Economics', code: 'ECON12S', gradeName: 'Grade 12', streamCode: 'social' },
  { name: 'English', code: 'ENG12S', gradeName: 'Grade 12', streamCode: 'social' },
  { name: 'ICT', code: 'ICT12S', gradeName: 'Grade 12', streamCode: 'social' },
  { name: 'Biology', code: 'BIO12S', gradeName: 'Grade 12', streamCode: 'social' },
  // Remedial
  { name: 'Mathematics', code: 'MATHREM', gradeName: 'Remedial' },
  { name: 'English', code: 'ENGREM', gradeName: 'Remedial' },
  { name: 'Physics', code: 'PHYSREM', gradeName: 'Remedial' },
  { name: 'Chemistry', code: 'CHEMREM', gradeName: 'Remedial' },
  { name: 'Geography', code: 'GEOGREM', gradeName: 'Remedial' },
  { name: 'History', code: 'HISTREM', gradeName: 'Remedial' },
  // Freshman
  { name: 'Psychology', code: 'PSYCHFR', gradeName: 'Freshman' },
  { name: 'Logic', code: 'LOGICFR', gradeName: 'Freshman' },
  { name: 'Physics', code: 'PHYSFR', gradeName: 'Freshman' },
  { name: 'Math (Natural Science)', code: 'MATHNFR', gradeName: 'Freshman' },
  { name: 'Math (Social Science)', code: 'MATHSFR', gradeName: 'Freshman' },
  { name: 'Geography', code: 'GEOGFR', gradeName: 'Freshman' },
  { name: 'History', code: 'HISTFR', gradeName: 'Freshman' },
  { name: 'English', code: 'ENGFR', gradeName: 'Freshman' },
]

const UNIVERSITIES = [
  "Addis Ababa University", "Jimma University", "Bahir Dar University",
  "Haramaya University", "Hawassa University", "Madda Walabu University",
  "Dire Dawa University", "Arba Minch University", "Arsi University",
  "Addis Ababa Science and Technology University", "Adama Science and Technology University",
  "Aksum University", "Ambo University", "Bule Hora University",
  "Debre Berhan University", "Debre Markos University", "Debre Tabor University",
  "Dilla University", "Ethiopian Civil Service University", "Gambella University",
  "Gondar University", "Injibara University", "Jijiga University",
  "Kotebe Metropolitan University", "Mekelle University", "Mettu University",
  "Mizan-Tepi University", "Oda Bultum University", "Raya University",
  "Samara University", "Semera University", "Sodo University",
  "Unity University", "Wachemo University", "Wallaga University",
  "Wollega University", "Woldia University", "Wolkite University",
  "Wollo University", "Wondo Genet College of Forestry",
]

const DEPARTMENTS_BY_CATEGORY: Record<string, string[]> = {
  Health: ["Medicine", "Nursing", "Pharmacy", "Public Health", "Midwifery", "Medical Laboratory Science", "Anesthesia"],
  Engineering: ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Software Engineering", "Computer Science", "Information Technology", "Chemical Engineering", "Industrial Engineering"],
  Agriculture: ["Agricultural Economics", "Plant Science", "Animal Science", "Natural Resource Management", "Forestry", "Agricultural Engineering"],
  Business: ["Accounting", "Management", "Marketing", "Economics", "Finance", "Business Administration"],
  Social_Sciences: ["Law", "Political Science", "Sociology", "International Relations", "Psychology", "Social Work"],
  Education: ["Education Planning & Management", "Curriculum Studies", "Educational Psychology", "Special Needs Education"],
  Natural_Science: ["Mathematics", "Physics", "Chemistry", "Biology", "Statistics"],
  Architecture: ["Architecture", "Urban & Regional Planning", "Construction Technology & Management"],
}

function generateCode(name: string, prefix: string): string {
  return name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8) + prefix
}

export const seedEducationData = async (): Promise<void> => {
  try {
    // Seed Grades
    let gradesCreated = 0
    for (const g of GRADES) {
      const existing = await Grade.findOne({ where: { name: g.name } })
      if (!existing) {
        await Grade.create(g)
        gradesCreated++
      }
    }
    if (gradesCreated > 0) logger.info(`Seeded ${gradesCreated} grades`)
    else logger.info('Grades already seeded')

    // Get grade map for lookups
    const allGrades = await Grade.findAll()
    const gradeMap = new Map(allGrades.map(g => [g.name, g]))

    // Seed Streams
    let streamsCreated = 0
    for (const s of STREAMS) {
      const grade = gradeMap.get(s.gradeName)
      if (!grade) continue
      const existing = await Stream.findOne({ where: { code: s.code, gradeId: grade.id } })
      if (!existing) {
        await Stream.create({ name: s.name, code: s.code, gradeId: grade.id })
        streamsCreated++
      }
    }
    if (streamsCreated > 0) logger.info(`Seeded ${streamsCreated} streams`)
    else logger.info('Streams already seeded')

    // Build stream lookup map: gradeName+streamCode -> streamId
    const allStreams = await Stream.findAll()
    const streamMap = new Map<string, string>()
    for (const st of allStreams) {
      const grade = allGrades.find(g => g.id === st.gradeId)
      if (grade) {
        streamMap.set(`${grade.name}:${st.code}`, st.id)
      }
    }

    // Seed Subjects
    let subjectsCreated = 0
    for (const sub of SUBJECTS) {
      const grade = gradeMap.get(sub.gradeName)
      if (!grade) continue
      const where: any = { code: sub.code }
      if (sub.streamCode) {
        const streamId = streamMap.get(`${sub.gradeName}:${sub.streamCode}`)
        if (!streamId) continue
        where.streamId = streamId
      }
      const existing = await Subject.findOne({ where })
      if (!existing) {
        const data: any = { name: sub.name, code: sub.code, gradeId: grade.id }
        if (sub.streamCode) {
          data.streamId = streamMap.get(`${sub.gradeName}:${sub.streamCode}`)
        }
        await Subject.create(data)
        subjectsCreated++
      }
    }
    if (subjectsCreated > 0) logger.info(`Seeded ${subjectsCreated} subjects`)
    else logger.info('Subjects already seeded')

    // Seed Universities
    let unisCreated = 0
    for (const name of UNIVERSITIES) {
      const existing = await University.findOne({ where: { name } })
      if (!existing) {
        await University.create({ name, location: 'Ethiopia' })
        unisCreated++
      }
    }
    if (unisCreated > 0) logger.info(`Seeded ${unisCreated} universities`)
    else logger.info('Universities already seeded')

    // Seed Departments
    let deptsCreated = 0
    const allUnis = await University.findAll()
    // Assign departments to the first few universities
    const targetUnis = allUnis.slice(0, Math.min(allUnis.length, 8))
    if (targetUnis.length > 0) {
      let deptIdx = 0
      const allDeptNames = Object.values(DEPARTMENTS_BY_CATEGORY).flat()
      for (const uni of targetUnis) {
        const deptsForUni = allDeptNames.slice(deptIdx, deptIdx + 5)
        deptIdx = (deptIdx + 5) % allDeptNames.length
        for (const deptName of deptsForUni) {
          const deptCode = generateCode(deptName, uni.id.slice(0, 4))
          const existing = await Department.findOne({ where: { name: deptName, universityId: uni.id } })
          if (!existing) {
            await Department.create({ name: deptName, code: deptCode, universityId: uni.id })
            deptsCreated++
          }
        }
      }
    }
    if (deptsCreated > 0) logger.info(`Seeded ${deptsCreated} departments`)
    else logger.info('Departments already seeded')

    logger.success('Education data seeding complete')
  } catch (error) {
    logger.error('Failed to seed education data:', error)
  }
}
