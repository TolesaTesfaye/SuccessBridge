import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { Pagination } from "@components/common/Pagination";
import { Loading } from "@components/common/Loading";
import { quizService } from "@services/quizService";
import { subjectService } from "@services/subjectService";
import type { Quiz } from "@types";
import {
  Brain,
  Filter,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DashboardHeroSkeleton,
  DashboardListSkeleton,
} from "@components/dashboards/DashboardSkeleton";

type QuizTabProps = {
  onNavigateToTab: (tab: string) => void;
};

const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const AdminDashboardQuizzes: React.FC<QuizTabProps> = ({
  onNavigateToTab,
}) => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({
    educationLevel: "all",
    subjectId: "all",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [quizzesRes, subjectsRes] = await Promise.all([
        quizService.getAll({
          page: currentPage,
          limit: 8,
          ...(filter.educationLevel !== "all"
            ? { educationLevel: filter.educationLevel }
            : {}),
          ...(filter.subjectId !== "all"
            ? { subjectId: filter.subjectId }
            : {}),
        }),
        subjectService.getAll(),
      ]);

      setQuizzes(quizzesRes);
      // In a real app, the API would return pagination metadata.
      // For now, we simulate total pages based on the returned count.
      setTotalPages(quizzesRes.length === 8 ? currentPage + 1 : currentPage);

      const subjectData = Array.isArray(subjectsRes)
        ? subjectsRes
        : (subjectsRes as any)?.data || [];
      setSubjects(subjectData);
    } catch (err: any) {
      setQuizzes([]);
      setError(err?.message || "Failed to load quizzes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [currentPage, filter]);

  const handleDeleteQuiz = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this quiz? This action cannot be undone.",
      )
    )
      return;
    try {
      await quizService.delete(id);
      loadData();
    } catch (err: any) {
      alert(err.message || "Failed to delete quiz.");
    }
  };

  const stats = useMemo(() => {
    const total = quizzes.length;
    const university = quizzes.filter(
      (q) => q.educationLevel === "university",
    ).length;
    const highSchool = quizzes.filter(
      (q) => q.educationLevel === "high_school",
    ).length;
    const avgQuestions =
      total > 0
        ? Math.round(
            quizzes.reduce((acc, q) => acc + (q.questions?.length || 0), 0) /
              total,
          )
        : 0;

    return [
      {
        label: "Total Quizzes",
        value: total,
        icon: Brain,
        accent: "from-blue-500 to-indigo-500",
      },
      {
        label: "University",
        value: university,
        icon: GraduationCap,
        accent: "from-violet-500 to-purple-500",
      },
      {
        label: "High School",
        value: highSchool,
        icon: BookOpen,
        accent: "from-amber-500 to-orange-500",
      },
      {
        label: "Avg. Questions",
        value: avgQuestions,
        icon: CheckCircle2,
        accent: "from-emerald-500 to-teal-500",
      },
    ];
  }, [quizzes]);

  if (loading && quizzes.length === 0) {
    return (
      <div className="space-y-6">
        <DashboardHeroSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="h-[400px] rounded-3xl bg-slate-100 dark:bg-white/5 animate-pulse" />
          </div>
          <div className="lg:col-span-2">
            <DashboardListSkeleton rows={8} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden border border-slate-200 bg-[#1e1b4b] px-6 py-8 text-white shadow-2xl dark:border-white/10 sm:px-8 -mx-4 md:-mx-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.3),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.25),transparent_35%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-indigo-200 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              Assessment Command Center
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tight leading-none sm:text-5xl">
                Precision Assessment Management.
              </h2>
              <p className="max-w-xl text-sm font-medium leading-relaxed text-indigo-100/70 sm:text-base">
                Create, monitor, and optimize academic quizzes across all
                education levels. Evaluate student performance with real-time
                analytics and detailed item analysis.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => navigate("/admin/quizzes/new")}
                className="bg-indigo-500 hover:bg-indigo-400 text-white border-none shadow-[0_10px_20px_rgba(99,102,241,0.3)] rounded-2xl h-12 px-6"
              >
                <span className="inline-flex items-center gap-2 font-bold">
                  <Plus className="h-5 w-5" />
                  Create New Quiz
                </span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => onNavigateToTab("reports")}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-2xl h-12 px-6 backdrop-blur-md"
              >
                Assessment Analytics
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="group relative rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all hover:bg-white/10"
              >
                <div
                  className={`inline-flex rounded-2xl bg-gradient-to-br ${item.accent} p-3 text-white shadow-xl group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-3xl font-black text-white tracking-tighter">
                  {item.value}
                </div>
                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-indigo-200/50">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters Panel */}
        <Card className="border-none shadow-xl bg-white dark:bg-[#1a1b23] h-fit sticky top-6">
          <CardHeader className="border-b border-slate-100 dark:border-white/5 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10">
                <Filter className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Intelligence Filters
              </h3>
            </div>
          </CardHeader>
          <CardBody className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Education Track
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: "All Tracks", value: "all" },
                  { label: "High School", value: "high_school" },
                  { label: "University", value: "university" },
                ].map((option) => (
                  <button
                    key={option.value}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl border text-xs font-bold transition-all ${
                      filter.educationLevel === option.value
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500/50 dark:bg-indigo-500/10 dark:text-indigo-200"
                        : "border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-200 dark:border-white/5 dark:bg-white/5 dark:text-slate-400"
                    }`}
                    onClick={() => {
                      setCurrentPage(1);
                      setFilter((prev) => ({
                        ...prev,
                        educationLevel: option.value,
                      }));
                    }}
                  >
                    {option.label}
                    {filter.educationLevel === option.value && (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Department / Subject
              </label>
              <select
                value={filter.subjectId}
                onChange={(e) => {
                  setCurrentPage(1);
                  setFilter((prev) => ({ ...prev, subjectId: e.target.value }));
                }}
                className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-xs font-bold text-slate-700 focus:border-indigo-500 focus:ring-0 dark:border-white/5 dark:bg-white/5 dark:text-slate-300"
              >
                <option value="all">Global (All Subjects)</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 dark:bg-amber-500/5 dark:border-amber-500/10">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                <p className="text-[11px] font-medium text-amber-800 dark:text-amber-200 leading-relaxed">
                  Quizzes listed here are live in the production environment.
                  Deleting a quiz will permanently remove all associated student
                  results.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Quizzes Table */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-xl bg-white dark:bg-[#1a1b23] overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-white/5 p-6 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10">
                  <Brain className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Quiz Registry
                </h3>
              </div>
              <span className="text-[10px] font-black bg-slate-100 dark:bg-white/5 text-slate-500 px-3 py-1.5 rounded-lg uppercase tracking-widest">
                {quizzes.length} Entries Loaded
              </span>
            </CardHeader>
            <CardBody className="p-0">
              {loading ? (
                <div className="p-12">
                  <Loading message="Fetching assessments..." />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-separate border-spacing-0">
                    <thead className="bg-slate-50/50 dark:bg-white/[0.02] text-[10px] uppercase font-black tracking-widest text-slate-400 border-b border-slate-100 dark:border-white/5">
                      <tr>
                        <th className="px-6 py-4">Assessment Information</th>
                        <th className="px-6 py-4">Configuration</th>
                        <th className="px-6 py-4">Timeline</th>
                        <th className="px-6 py-4 text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {quizzes.map((quiz) => (
                        <tr
                          key={quiz.id}
                          className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-white/[0.02]"
                        >
                          <td className="px-6 py-5">
                            <div className="font-black text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 transition-colors">
                              {quiz.title}
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                  quiz.educationLevel === "university"
                                    ? "bg-violet-50 text-violet-600 dark:bg-violet-500/10"
                                    : "bg-amber-50 text-amber-600 dark:bg-amber-500/10"
                                }`}
                              >
                                {quiz.educationLevel.replace("_", " ")}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 truncate max-w-[150px]">
                                {quiz.description}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <Clock className="h-3 w-3" />
                                {quiz.timeLimit} Minutes
                              </div>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                                <Brain className="h-3 w-3" />
                                {quiz.questions?.length || 0} Questions
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="text-[10px] font-black text-slate-900 dark:text-white uppercase mb-1">
                              Published
                            </div>
                            <div className="text-[10px] font-bold text-slate-400">
                              {formatDate(quiz.createdAt)}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() =>
                                  navigate(`/admin/quizzes/edit/${quiz.id}`)
                                }
                                className="p-2 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all dark:bg-white/5 dark:border-white/10"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteQuiz(quiz.id!)}
                                className="p-2 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all dark:bg-white/5 dark:border-white/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {quizzes.length === 0 && !loading && (
                    <div className="p-12 text-center">
                      <div className="mx-auto w-16 h-16 rounded-3xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-3xl mb-4">
                        🧩
                      </div>
                      <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                        No Assessments Identified
                      </h4>
                      <p className="text-xs text-slate-500 mt-2">
                        Adjust your intelligence parameters or generate a new
                        assessment.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardBody>
          </Card>

          {totalPages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
