import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { QuizTaker } from "@components/quizzes/QuizTaker";
import { StudentQuizDiscovery } from "@components/quizzes/StudentQuizDiscovery";
import { quizService } from "@services/quizService";
import { Quiz } from "@types";
import { Loading } from "@components/common/Loading";
import { useAuthStore } from "@store/authStore";

export const StudentQuizzes: React.FC = () => {
  const { user } = useAuthStore();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [userScores, setUserScores] = useState<Record<string, number>>({});
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};

      if (user?.studentType === "university") {
        params.educationLevel = "university";
        if (user.universityLevel) {
          params.universityLevel = user.universityLevel;
        }
        if (user.university) {
          params.university = user.university;
        }
        if (user.department) {
          params.department = user.department;
        }
      } else if (user?.studentType === "high_school") {
        params.educationLevel = "high_school";
        if (user.highSchoolGrade) {
          params.grade = user.highSchoolGrade;
        }
        if (user.highSchoolStream) {
          params.stream = user.highSchoolStream;
        }
      }

      const data = await quizService.getAll(params);
      setQuizzes(data);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
  };

  const handleSubmitQuiz = async (results: {
    score: number;
    totalPoints: number;
    timeSpent: number;
    answers: Record<string, string>;
  }) => {
    try {
      if (!activeQuiz) return;

      const isAiLocal = activeQuiz.id.startsWith("ai-quiz-");
      if (!isAiLocal) {
        await quizService.submitResult(activeQuiz.id, {
          score: results.score,
          totalPoints: results.totalPoints,
          timeSpent: results.timeSpent,
          answers: results.answers,
        });
      }

      setUserScores((prev) => ({ ...prev, [activeQuiz.id]: results.score }));
      setCompletedQuizzes((prev) =>
        prev.includes(activeQuiz.id) ? prev : [...prev, activeQuiz.id],
      );
      setActiveQuiz(null);
      if (!isAiLocal) fetchQuizzes();
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      alert("Failed to save your results. Please try again.");
    }
  };

  const officialQuizzes = quizzes.filter((q) => !q.isAiGenerated);
  const aiQuizzes = quizzes.filter((q) => q.isAiGenerated);

  if (loading) {
    return (
      <DashboardLayout
        title="Academic Assessments"
        subtitle="Challenge yourself and track your mastery"
      >
        <Loading message="Preparing your assessments..." />
      </DashboardLayout>
    );
  }

  if (activeQuiz) {
    return (
      <DashboardLayout noPadding showFooter={false} disableTopPadding>
        <QuizTaker
          embedded
          quiz={activeQuiz}
          onSubmit={handleSubmitQuiz}
          onCancel={() => setActiveQuiz(null)}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Academic Assessments"
      subtitle="Challenge yourself, track progress, and master every subject"
    >
      <StudentQuizDiscovery
        userName={user?.name || "Scholar"}
        officialQuizzes={officialQuizzes}
        aiQuizzes={aiQuizzes}
        userScores={userScores}
        completedQuizzes={completedQuizzes}
        onStartQuiz={handleStartQuiz}
      />
    </DashboardLayout>
  );
};
