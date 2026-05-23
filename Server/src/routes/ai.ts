import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  chatTutor,
  explainConcept,
  generateQuiz,
  summarizeText,
  generateStudyPlan,
} from '../controllers/aiController.js';

const router = express.Router();

// Apply authMiddleware to all AI routes
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: AI Companion
 *   description: AI-assisted tutoring and content generation endpoints
 */

/**
 * POST /api/ai/chat
 * Chat with BridgeBot, the academic companion
 */
router.post('/chat', chatTutor);

/**
 * POST /api/ai/explain
 * Explain an academic concept
 */
router.post('/explain', explainConcept);

/**
 * POST /api/ai/quiz
 * Generate a multiple-choice quiz
 */
router.post('/quiz', generateQuiz);

/**
 * POST /api/ai/summarize
 * Summarize lesson text or study notes
 */
router.post('/summarize', summarizeText);

/**
 * POST /api/ai/study-plan
 * Generate a week-by-week study plan
 */
router.post('/study-plan', generateStudyPlan);

export default router;
