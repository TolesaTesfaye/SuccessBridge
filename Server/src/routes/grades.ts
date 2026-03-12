import { Router } from 'express'
import { GradeService } from '../services/gradeService'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: Academic grades and levels
 */

router.get('/', async (req, res) => {
  try {
    const { educationLevel } = req.query
    let grades
    if (educationLevel === 'high_school' || educationLevel === 'university') {
      grades = await GradeService.getByEducationLevel(educationLevel)
    } else {
      grades = await GradeService.getAll()
    }
    res.json({ success: true, data: grades })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch grades' })
  }
})

export default router
