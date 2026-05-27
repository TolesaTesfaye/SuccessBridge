import React, { useEffect, useMemo, useState } from "react";
import { quizService } from "@services/quizService";
import { subjectService } from "@services/subjectService";
import type { Quiz } from "@types";
import { Button } from "@components/common/Button";
import { Loading } from "@components/common/Loading";
import { Pagination } from "@components/common/Pagination";
import {
  Brain,
  Edit,
  Plus,
  Sparkles,
  Trash2,
  Clock,
  Filter,
} from "lucide-react";

type QuizKindFilter = "all" | "official" | "ai";

export interface QuizAdminRegistryProps {
  onCreate: () => void;
  onEdit: (quizId: string) => void;
  createLabel?: string;
}

const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const QuizAdminRegistry: React.FC<QuizAdminRegistryProps> = ({
  onCreate,
  onEdit,
  createLabel = "Create Quiz",
}) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kindFilter, setKindFilter] = useState<QuizKindFilter>("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const params: Record<string, string | boolean> = {};
      if (kindFilter === "official") params.isAiGenerated = false;
      if (kindFilter === "ai") params.isAiGenerated = true;
      if (subjectFilter !== "all") params.subjectId = subjectFilter;

      const [quizData, subjectData] = await Promise.all([
        quizService.getAll(params),
        subjectService.getSubjects(),
      ]);
      setQuizzes(quizData);
      const list = Array.isArray(subjectData)
        ? subjectData
        : (subjectData as { data?: { id: string; name: string }[] })?.data || [];
      setSubjects(list);
    } catch (err: unknown) {
      setQuizzes([]);
      const message = err instanceof Error ? err.message : "Failed to load quizzes.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [kindFilter, subjectFilter]);

  const totalPages = Math.max(1, Math.ceil(quizzes.length / pageSize));
  const pagedQuizzes = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return quizzes.slice(start, start + pageSize);
  }, [quizzes, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [kindFilter, subjectFilter]);

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Delete this quiz permanently? All associated student results will be removed.",
      )
    ) {
      return;
    }
    try {
      await quizService.delete(id);
      await loadData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete quiz.";
      alert(message);
    }
  };

  const stats = useMemo(() => {
    const ai = quizzes.filter((q) => q.isAiGenerated).length;
    return {
      total: quizzes.length,
      official: quizzes.length - ai,
      ai,
    };
  }, [quizzes]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Quiz management
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Create, edit, delete, and publish official and AI-generated quizzes.
          </p>
        </div>
        <Button variant="primary" onClick={onCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          {createLabel}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:max-w-lg">
        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-slate-900">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Total
          </p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.total}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-slate-900">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Official
          </p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {stats.official}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-slate-900">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            AI
          </p>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {stats.ai}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Filter className="h-4 w-4" />
          Filters
        </div>
        <select
          value={kindFilter}
          onChange={(e) => setKindFilter(e.target.value as QuizKindFilter)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-800"
        >
          <option value="all">All quizzes</option>
          <option value="official">Official only</option>
          <option value="ai">AI-generated only</option>
        </select>
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-white/10 dark:bg-slate-800 sm:min-w-[200px]"
        >
          <option value="all">All subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
          {error}
        </p>
      )}

      {loading ? (
        <Loading message="Loading quizzes…" />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:border-white/5 dark:bg-white/[0.02]">
              <tr>
                <th className="px-4 py-3">Quiz</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Config</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {pagedQuizzes.map((quiz) => (
                <tr
                  key={quiz.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {quiz.title}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                      {quiz.description}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    {quiz.isAiGenerated ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                        <Sparkles className="h-3 w-3" /> AI
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600 dark:bg-white/10 dark:text-slate-300">
                        <Brain className="h-3 w-3" /> Official
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {quiz.timeLimit} min
                    </div>
                    <div>{quiz.questions?.length ?? 0} questions</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-500">
                    {quiz.createdAt ? formatDate(quiz.createdAt) : "—"}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(quiz.id)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(quiz.id)}
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:border-rose-300 hover:text-rose-600 dark:border-white/10"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pagedQuizzes.length === 0 && (
            <p className="p-8 text-center text-sm text-slate-500">
              No quizzes match your filters. Create one to get started.
            </p>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
