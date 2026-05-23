import api from './api';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple_choice';
  options: string[];
  correctAnswer: string;
  points: number;
}

export class AIService {
  /**
   * Chat with BridgeBot (the academic tutor)
   */
  static async chat(messages: ChatMessage[]): Promise<string> {
    const response = await api.post('/ai/chat', { messages });
    return response.data.data;
  }

  /**
   * Request explanation for a concept
   */
  static async explainConcept(concept: string, subject?: string, style: 'simple' | 'analogy' | 'deep_dive' = 'simple'): Promise<string> {
    const response = await api.post('/ai/explain', { concept, subject, style });
    return response.data.data;
  }

  /**
   * Generate an academic quiz
   */
  static async generateQuiz(topic: string, subjectName: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium', questionCount: number = 5): Promise<QuizQuestion[]> {
    const response = await api.post('/ai/quiz', { topic, subjectName, difficulty, questionCount });
    return response.data.data;
  }

  /**
   * Summarize notes or lesson text
   */
  static async summarizeText(text: string, maxLength?: number): Promise<string> {
    const response = await api.post('/ai/summarize', { text, maxLength });
    return response.data.data;
  }

  /**
   * Generate a custom week-by-week study plan
   */
  static async generateStudyPlan(topic: string, durationWeeks: number = 4, hoursPerDay: number = 2, currentLevel: string = 'beginner'): Promise<string> {
    const response = await api.post('/ai/study-plan', { topic, durationWeeks, hoursPerDay, currentLevel });
    return response.data.data;
  }
}
