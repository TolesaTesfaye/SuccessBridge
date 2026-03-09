import express from 'express'
import { StudentProgress, Subject, QuizResult } from '../models/index'
import { authMiddleware } from '../middleware/auth'
import { Op } from 'sequelize'

const router = express.Router()

// Get student progress
router.get('/progress', authMiddleware, async (req, res) => {
    try {
        const studentId = (req as any).user.id
        const progress = await StudentProgress.findAll({
            where: { studentId },
            include: [{ model: Subject }]
        })
        res.json(progress)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch student progress' })
    }
})

// Get student stats
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const studentId = (req as any).user.id

        // Aggregate quizzes completed and average score
        const results = await StudentProgress.findAll({
            where: { studentId }
        })

        const quizzesCompleted = results.reduce((acc, curr) => acc + curr.quizzesCompleted, 0)
        const averageScore = results.length > 0
            ? Math.round(results.reduce((acc, curr) => acc + curr.averageScore, 0) / results.length)
            : 0

        // For now, simplify stats. In a real app, these would come from specialized tables
        res.json({
            resourcesAccessed: 24, // Placeholder for now
            quizzesCompleted,
            averageScore,
            studyStreak: 7, // Placeholder for now
            subjectProgress: results.map(r => ({
                subject: (r as any).Subject?.name || 'Unknown',
                progress: Math.round(r.averageScore),
                quizzes: r.quizzesCompleted
            }))
        })
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch student stats' })
    }
})

export default router
