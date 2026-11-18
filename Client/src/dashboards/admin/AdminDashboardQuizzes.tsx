import React from "react";
import { AdminQuizCreator } from "@components/quizzes/AdminQuizCreator";

type QuizTabProps = {
  onNavigateToTab: (tab: string) => void;
};

export const AdminDashboardQuizzes: React.FC<QuizTabProps> = () => {
  return (
    <AdminQuizCreator
      onClose={() => {}}
      onSuccess={() => {}}
    />
  );
};
