import { Request, Response, NextFunction } from 'express';
import { AIService } from '../services/aiService.js';

/**
 * Handle errors specifically related to Groq API configuration.
 */
const handleAIError = (error: any, res: Response, next: NextFunction) => {
  console.error('AI Request Error:', error);
  const errorMessage = error instanceof Error ? error.message : String(error);

  if (errorMessage.includes('GROQ_API_KEY') || /API key/i.test(errorMessage)) {
    return res.status(503).json({
      success: false,
      error: 'Groq API key is missing or invalid. Please add a valid GROQ_API_KEY to the Server/.env file to enable AI tutoring features.',
    });
  }

  if (/401|unauthorized/i.test(errorMessage)) {
    return res.status(503).json({
      success: false,
      error:
        'Groq rejected the API key (401 Unauthorized). Please regenerate your key in Groq Cloud and update GROQ_API_KEY in Server/.env.',
    });
  }

  if (/429|quota|rate limit/i.test(errorMessage)) {
    return res.status(503).json({
      success: false,
      error: 'Groq rate limit reached. Please wait a moment and try again.',
    });
  }

  res.status(500).json({
    success: false,
    error: errorMessage || 'An error occurred while communicating with the AI Service.',
  });
};

export const chatTutor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Messages array is required and cannot be empty.',
      });
    }

    const reply = await AIService.generateChatResponse(messages);
    res.json({
      success: true,
      data: reply,
    });
  } catch (error) {
    handleAIError(error, res, next);
  }
};

export const explainConcept = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { concept, subject, style } = req.body;

    if (!concept || typeof concept !== 'string' || concept.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Concept name is required.',
      });
    }

    const explanation = await AIService.explainConcept(concept, subject, style);
    res.json({
      success: true,
      data: explanation,
    });
  } catch (error) {
    handleAIError(error, res, next);
  }
};

export const generateQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topic, subjectName, difficulty, questionCount } = req.body;

    if (!topic || typeof topic !== 'string' || topic.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Quiz topic is required.',
      });
    }

    if (!subjectName || typeof subjectName !== 'string' || subjectName.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Subject name is required.',
      });
    }

    const count = questionCount ? parseInt(questionCount, 10) : 5;
    const diff = difficulty || 'medium';

    const { questions, source, model, fallbackReason } = await AIService.generateQuiz(
      topic,
      subjectName,
      diff,
      count,
    );
    res.json({
      success: true,
      data: questions,
      meta:
        source === 'fallback'
          ? { aiFallback: true, message: fallbackReason }
          : model
            ? { model }
            : undefined,
    });
  } catch (error) {
    handleAIError(error, res, next);
  }
};

export const summarizeText = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text, maxLength } = req.body;

    if (!text || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Text to summarize is required.',
      });
    }

    const limit = maxLength ? parseInt(maxLength, 10) : undefined;
    const summary = await AIService.summarizeText(text, limit);
    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    handleAIError(error, res, next);
  }
};

export const generateStudyPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { topic, durationWeeks, hoursPerDay, currentLevel } = req.body;

    if (!topic || typeof topic !== 'string' || topic.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Study plan topic is required.',
      });
    }

    const weeks = durationWeeks ? parseInt(durationWeeks, 10) : 4;
    const hours = hoursPerDay ? parseInt(hoursPerDay, 10) : 2;
    const level = currentLevel || 'beginner';

    const studyPlan = await AIService.generateStudyPlan(topic, weeks, hours, level);
    res.json({
      success: true,
      data: studyPlan,
    });
  } catch (error) {
    handleAIError(error, res, next);
  }
};
