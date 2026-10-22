import apiClient from './client';
import { Quiz, QuizResult, PaginatedResponse } from '../types';

export const quizzesApi = {
  getAll: async (params?: {
    subjectId?: string;
    difficulty?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Quiz>> => {
    const res = await apiClient.get('/quizzes', { params });
    return res.data;
  },

  getById: async (id: string): Promise<Quiz> => {
    const res = await apiClient.get(`/quizzes/${id}`);
    return res.data.quiz || res.data;
  },

  submitResult: async (quizId: string, payload: {
    score: number;
    totalQuestions: number;
    timeTaken?: number;
    answers?: Record<string, number>;
  }): Promise<QuizResult> => {
    const res = await apiClient.post(`/quizzes/${quizId}/submit`, payload);
    return res.data;
  },

  getMyResults: async (): Promise<QuizResult[]> => {
    const res = await apiClient.get('/quizzes/my-results');
    return res.data.results || res.data;
  },
};
