import React, { useState } from 'react';
import { QuizTaker } from '@components/quizzes/QuizTaker';
import { Quiz, Question } from '@types';
import { Loading } from '@components/common/Loading';
import { Sparkles, BrainCircuit } from 'lucide-react';
import api from '@services/api';

export const AIQuizGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [topic, setTopic] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [error, setError] = useState('');

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !subjectName) {
      setError("Topic and Subject Name are required.");
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/ai/quiz', {
        topic,
        subjectName,
        difficulty,
        questionCount: Number(questionCount)
      });

      if (response.data.success) {
        const questions: Question[] = response.data.data;
        
        const mockQuiz: Quiz = {
          id: `ai-quiz-${Date.now()}`,
          title: `AI Quiz: ${topic}`,
          description: `An AI-generated practice quiz for ${subjectName}`,
          subjectId: 'ai-generated',
          educationLevel: 'high_school',
          timeLimit: questionCount * 2, // 2 mins per question
          passingScore: 50,
          questions: questions,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setActiveQuiz(mockQuiz);
      } else {
        setError("Failed to generate quiz. Please try again.");
      }
    } catch (err: any) {
      console.error("AI Quiz Error:", err);
      setError(err.response?.data?.error || "An error occurred while communicating with BridgeBot.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuiz = async (results: any) => {
    alert(`Practice Quiz Completed! Score: ${results.score}/${results.totalPoints}`);
    setActiveQuiz(null);
  };

  if (loading) {
    return (
      <div className="py-12">
        <Loading message="BridgeBot is creating your custom quiz. This might take a few seconds..." />
      </div>
    );
  }

  if (activeQuiz) {
    return (
      <div className="max-w-7xl mx-auto">
        <QuizTaker
          quiz={activeQuiz}
          onSubmit={handleSubmitQuiz}
          onCancel={() => setActiveQuiz(null)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pt-4">
      <div className="bg-white dark:bg-[#151d32] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-lg text-white">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Custom Practice Quiz</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Fill out the details below and AI will generate a unique quiz for you.</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleGenerateQuiz} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Subject Name
              </label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="e.g. Biology, History"
                required
                className="w-full bg-slate-50 dark:bg-[#0B1121] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Specific Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Cell Division, World War II"
                required
                className="w-full bg-slate-50 dark:bg-[#0B1121] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0B1121] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Number of Questions
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#0B1121] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              >
                <option value={3}>3 Questions (Quick Test)</option>
                <option value={5}>5 Questions (Standard)</option>
                <option value={10}>10 Questions (Comprehensive)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Sparkles className="w-5 h-5" />
              Generate My Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
