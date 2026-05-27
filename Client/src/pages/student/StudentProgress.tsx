import { useEffect, useMemo, useState, useCallback } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { useAuthStore } from "@store/authStore";
import api from "@services/api";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Target,
  BookOpen,
  Flame,
  Sparkles,
  Zap,
  Clock,
  Star,
  Brain,
  Rocket,
  TrendingUp,
  ChevronRight,
  ArrowUpRight,
  Award,
  GraduationCap,
  CheckCircle2,
  Circle,
  BarChart3,
  Calendar,
  Crown,
  Activity,
  Cpu,
} from "lucide-react";

// ---------- Interfaces ----------
interface QuizHistoryItem {
  id: string;
  quizTitle: string;
  subject: string;
  score: number;
  totalPoints: number;
  questionsAnswered: number;
  passed: boolean;
  date: string;
}
interface SubjectProgress {
  subject: string;
  progress: number;
  quizzes: number;
}
interface ProgressData {
  resourcesAccessed: number;
  quizzesCompleted: number;
  averageScore: number;
  studyStreak: number;
  totalStudyHours: number;
  weeklyGoals: Array<{ goal: string; done: boolean }>;
  recentQuizHistory: QuizHistoryItem[];
  officialSubjectProgress: SubjectProgress[];
  aiSubjectProgress: SubjectProgress[];
}

// ---------- Helpers ----------
function computeXp(data: ProgressData): number {
  return data.quizzesCompleted * 100 + data.resourcesAccessed * 20;
}
function computeLevel(xp: number): { level: number; nextLevelXp: number } {
  const level = Math.floor(xp / 500) + 1;
  const nextLevelXp = level * 500;
  return { level, nextLevelXp };
}
function formatDate(dateStr: string | Date): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toISOString().split("T")[0];
}

// ---------- Hooks ----------
function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function GlassCard({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`group relative rounded-3xl border border-white/10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(15,23,42,0.15)] dark:shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.35)] ${className}`}
    >
      {glow && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.15), transparent 40%)",
          }}
        />
      )}
      {children}
    </div>
  );
}

function AnimatedBar({
  value,
  delay = 0,
  gradient = "from-violet-500 via-fuchsia-500 to-pink-500",
}: {
  value: number;
  delay?: number;
  gradient?: string;
}) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(value), 200 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/5">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${gradient} relative overflow-hidden`}
        style={{
          width: `${w}%`,
          transition: "width 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2.5s linear infinite",
          }}
        />
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  suffix = "",
  gradient,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  suffix?: string;
  gradient: string;
}) {
  const v = useCountUp(value);
  return (
    <GlassCard glow className="p-2 sm:p-6 overflow-hidden">
      <div
        className={`absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700`}
      />
      <div className="relative flex items-start justify-between">
        <div
          className={`flex h-7 w-7 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}
        >
          <Icon className="h-3.5 w-3.5 sm:h-6 sm:w-6 text-white" />
        </div>
      </div>
      <div className="relative mt-3 sm:mt-5">
        <div className="font-display text-sm sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
          {v}
          {suffix}
        </div>
        <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-tight">
          {label}
        </div>
      </div>
    </GlassCard>
  );
}

// ---------- Skeleton Loader ----------
function ProgressSkeleton() {
  return (
    <div className="relative w-full space-y-8 pb-12 animate-pulse">
      <div className="h-80 bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-3xl bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800 lg:col-span-2" />
        <div className="space-y-6">
          <div className="h-48 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-48 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}

// ---------- Main Component ----------
export function StudentProgress() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/student/stats");
      if (response.data?.success && response.data?.data) {
        const raw = response.data.data;
        const mapped: ProgressData = {
          resourcesAccessed: raw.resourcesAccessed ?? 0,
          quizzesCompleted: raw.quizzesCompleted ?? 0,
          averageScore: raw.averageScore ?? 0,
          studyStreak: raw.studyStreak ?? 0,
          totalStudyHours: raw.totalStudyHours ?? 0,
          weeklyGoals: raw.weeklyGoals ?? [],
          recentQuizHistory: (raw.recentQuizHistory ?? []).map((q: any) => ({
            id: q.id,
            quizTitle: q.quizTitle ?? "Unknown Quiz",
            subject: q.subject ?? "Unknown",
            score: q.score ?? 0,
            totalPoints: q.totalPoints ?? 0,
            questionsAnswered: q.questionsAnswered ?? 0,
            passed: q.passed ?? false,
            date: formatDate(q.date),
          })),
          officialSubjectProgress: raw.officialSubjectProgress ?? [],
          aiSubjectProgress: raw.aiSubjectProgress ?? [],
        };
        setData(mapped);
      } else {
        setError("Failed to load progress data.");
      }
    } catch (err: any) {
      console.error("Error fetching student stats:", err);
      setError(
        err?.response?.data?.error ||
          err?.message ||
          "Failed to load progress data. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Compute XP and level from real data
  const xp = data ? computeXp(data) : 0;
  const { level, nextLevelXp } = computeLevel(xp);
  const xpProgress = nextLevelXp > 0 ? Math.round((xp / nextLevelXp) * 100) : 0;

  const goalsDone = data?.weeklyGoals?.filter((g) => g.done).length ?? 0;
  const goalsTotal = data?.weeklyGoals?.length ?? 0;
  const goalsPct = goalsTotal > 0 ? (goalsDone / goalsTotal) * 100 : 0;

  // Dynamic achievements based on real data
  const achievements = useMemo(() => {
    const s = data?.studyStreak ?? 0;
    const q = data?.quizzesCompleted ?? 0;
    return [
      {
        icon: Flame,
        label: `${s}-Day Streak`,
        color: "from-orange-500 to-red-500",
        unlocked: s >= 3,
      },
      {
        icon: Crown,
        label: "Quiz Champion",
        color: "from-amber-400 to-yellow-500",
        unlocked: q >= 5,
      },
      {
        icon: Brain,
        label: "Quiz Master",
        color: "from-violet-500 to-fuchsia-500",
        unlocked: q >= 10,
      },
      {
        icon: Rocket,
        label: `Level ${level}`,
        color: "from-cyan-400 to-blue-600",
        unlocked: level >= 2,
      },
      {
        icon: Star,
        label: "Perfect Score",
        color: "from-pink-500 to-rose-500",
        unlocked: false,
      },
      {
        icon: Award,
        label: "Marathon Learner",
        color: "from-emerald-400 to-teal-600",
        unlocked: (data?.totalStudyHours ?? 0) >= 20,
      },
    ];
  }, [data, level]);

  // Hero ring
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const [ringOffset, setRingOffset] = useState(circumference);
  useEffect(() => {
    const t = setTimeout(
      () => setRingOffset(circumference - (xpProgress / 100) * circumference),
      300,
    );
    return () => clearTimeout(t);
  }, [xpProgress, circumference]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    target.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  // Merge official and AI subject progress into a single unified list
  const subjects = useMemo(() => {
    const official = data?.officialSubjectProgress ?? [];
    const ai = data?.aiSubjectProgress ?? [];
    const merged = new Map<string, { progress: number; quizzes: number }>();
    official.forEach((s) => {
      merged.set(s.subject, { progress: s.progress, quizzes: s.quizzes });
    });
    ai.forEach((s) => {
      const existing = merged.get(s.subject);
      if (existing) {
        existing.progress = Math.round((existing.progress + s.progress) / 2);
        existing.quizzes += s.quizzes;
      } else {
        merged.set(s.subject, { progress: s.progress, quizzes: s.quizzes });
      }
    });
    return Array.from(merged.entries()).map(([subject, val]) => ({
      subject,
      progress: val.progress,
      quizzes: val.quizzes,
    }));
  }, [data]);

  // Derived counted-up value - must be called before any conditional return
  const studyHoursCounted = useCountUp(data?.totalStudyHours ?? 0);

  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <ProgressSkeleton />
      </DashboardLayout>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="text-rose-500 text-lg font-semibold">
            {error || "No progress data available."}
          </div>
          <button
            onClick={fetchStats}
            className="px-6 py-2.5 rounded-2xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const displayName = user?.name || "Student";

  return (
    <DashboardLayout>
      <div
        onMouseMove={handleMouseMove}
        className="relative w-full space-y-8 pb-12"
      >
        {/* HERO */}
        <section className="relative mb-10 overflow-hidden border border-white/10 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-8 shadow-2xl shadow-slate-500/30 sm:p-12">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,200,255,0.3), transparent 40%)",
            }}
          />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-pink-400/40 blur-3xl animate-pulse-glow" />
          <div className="absolute top-10 right-20 hidden lg:block">
            <Sparkles className="h-6 w-6 text-white/60 animate-float" />
          </div>

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-white/30">
                <Sparkles className="h-3.5 w-3.5" />
                Level {level} · {data.quizzesCompleted} Quizzes
              </div>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Welcome back,
                <br />
                <span className="bg-gradient-to-r from-white via-pink-100 to-amber-100 bg-clip-text text-transparent">
                  {displayName}
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
                You're on a{" "}
                <strong className="text-white">
                  {data.studyStreak}-day streak
                </strong>{" "}
                with an average score of{" "}
                <strong className="text-white">{data.averageScore}%</strong>.
                Keep the momentum going.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/student/quizzes")}
                  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-violet-700 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                >
                  Continue Learning
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* XP Ring */}
            <div className="relative mx-auto">
              <svg width="200" height="200" className="-rotate-90">
                <defs>
                  <linearGradient
                    id="ringGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#fb7185" />
                  </linearGradient>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="url(#ringGrad)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={ringOffset}
                  style={{
                    transition:
                      "stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    filter: "drop-shadow(0 0 12px rgba(251,113,133,0.6))",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  XP
                </div>
                <div className="font-display text-4xl font-bold tabular-nums">
                  {xp}
                </div>
                <div className="text-xs text-white/70">/ {nextLevelXp}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stat tiles */}
        <section className="mb-10 grid grid-cols-4 gap-2 sm:gap-5">
          <StatTile
            icon={BookOpen}
            label="Resources Accessed"
            value={data.resourcesAccessed}
            gradient="from-cyan-500 to-blue-600"
          />
          <StatTile
            icon={Target}
            label="Quizzes Completed"
            value={data.quizzesCompleted}
            gradient="from-violet-500 to-fuchsia-500"
          />
          <StatTile
            icon={TrendingUp}
            label="Average Score"
            value={data.averageScore}
            suffix="%"
            gradient="from-emerald-500 to-teal-600"
          />
          <StatTile
            icon={Flame}
            label="Day Streak"
            value={data.studyStreak}
            gradient="from-orange-500 to-rose-500"
          />
        </section>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* LEFT: Subject Performance */}
          <GlassCard className="lg:col-span-2 p-7" glow>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                  <Activity className="h-3.5 w-3.5" /> Performance
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold">
                  Subject Mastery
                </h2>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              {subjects.length === 0 ? (
                <div className="text-slate-500 dark:text-slate-400 text-center py-8">
                  No quiz data yet. Start taking quizzes to see your subject
                  progress!
                </div>
              ) : (
                subjects.map((s, i) => (
                  <div key={s.subject} className="group/row">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 ring-1 ring-white/10">
                          <BookOpen className="h-4 w-4 text-violet-500" />
                        </div>
                        <div>
                          <div className="font-semibold">{s.subject}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {s.quizzes} quizzes completed
                          </div>
                        </div>
                      </div>
                      <div className="font-display text-lg font-bold tabular-nums">
                        {s.progress}%
                      </div>
                    </div>
                    <AnimatedBar
                      value={s.progress}
                      delay={i * 120}
                      gradient="from-violet-500 via-fuchsia-500 to-pink-500"
                    />
                  </div>
                ))
              )}
            </div>

            {/* Recent Quizzes */}
            <div className="mt-9 border-t border-white/10 pt-6">
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-violet-500" /> Recent Quizzes
              </h3>
              {data.recentQuizHistory.length === 0 ? (
                <div className="text-slate-500 dark:text-slate-400 text-center py-6">
                  No quizzes completed yet. Take your first quiz!
                </div>
              ) : (
                <div className="space-y-3">
                  {data.recentQuizHistory.map((q) => {
                    const pct =
                      q.totalPoints > 0
                        ? Math.round((q.score / q.totalPoints) * 100)
                        : 0;
                    return (
                      <div
                        key={q.id}
                        className="group/quiz flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/40 dark:bg-white/[0.02] p-4 transition-all hover:bg-white/60 dark:hover:bg-white/[0.05] hover:translate-x-1"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                              q.passed
                                ? "bg-emerald-500/15 text-emerald-500"
                                : "bg-rose-500/15 text-rose-500"
                            }`}
                          >
                            {q.passed ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <Zap className="h-5 w-5" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold truncate">
                              {q.quizTitle}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                              <span>{q.subject}</span>
                              <span>·</span>
                              <Calendar className="h-3 w-3" />
                              <span>{q.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div
                            className={`font-display text-lg font-bold tabular-nums ${
                              pct >= 80
                                ? "text-emerald-500"
                                : pct >= 60
                                  ? "text-amber-500"
                                  : "text-rose-500"
                            }`}
                          >
                            {pct}%
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {q.score}/{q.totalPoints}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </GlassCard>

          {/* RIGHT column */}
          <div className="space-y-6">
            {/* Weekly Goals */}
            <GlassCard className="p-7" glow>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                    <Target className="h-3.5 w-3.5" /> This Week
                  </div>
                  <h2 className="mt-2 font-display text-xl font-bold">Goals</h2>
                </div>
                <div className="relative flex h-14 w-14 items-center justify-center">
                  <svg
                    className="absolute inset-0 -rotate-90"
                    viewBox="0 0 56 56"
                  >
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-slate-200 dark:text-white/10"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="url(#goalGrad)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 24}
                      strokeDashoffset={
                        2 * Math.PI * 24 - (goalsPct / 100) * 2 * Math.PI * 24
                      }
                      style={{ transition: "stroke-dashoffset 1.4s ease" }}
                    />
                    <defs>
                      <linearGradient id="goalGrad">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="font-display text-xs font-bold tabular-nums">
                    {goalsDone}/{goalsTotal}
                  </div>
                </div>
              </div>
              {data.weeklyGoals.length === 0 ? (
                <div className="text-slate-500 dark:text-slate-400 text-center py-6 text-sm">
                  Weekly goals will appear as you engage with resources and
                  quizzes.
                </div>
              ) : (
                <ul className="mt-5 space-y-2.5">
                  {data.weeklyGoals.map((g, i) => (
                    <li
                      key={i}
                      className={`group/goal flex items-center gap-3 rounded-2xl border border-white/10 p-3 transition-all ${
                        g.done
                          ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/5"
                          : "bg-white/30 dark:bg-white/[0.02] hover:bg-white/50 dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      {g.done ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 animate-scale-in" />
                      ) : (
                        <Circle className="h-5 w-5 text-slate-400 shrink-0" />
                      )}
                      <span
                        className={`text-sm ${g.done ? "line-through text-slate-500 dark:text-slate-400" : "font-medium"}`}
                      >
                        {g.goal}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </GlassCard>

            {/* Study Hours */}
            <GlassCard className="relative overflow-hidden p-7" glow>
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-20 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  <Clock className="h-3.5 w-3.5" /> Study Time
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold tabular-nums bg-gradient-to-br from-amber-500 to-orange-600 bg-clip-text text-transparent">
                    {studyHoursCounted}
                  </span>
                  <span className="text-lg font-semibold text-slate-500 dark:text-slate-400">
                    hours
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Total study time — about{" "}
                  <strong>
                    {Math.round(
                      data.totalStudyHours /
                        Math.max(1, data.quizzesCompleted || 1),
                    )}
                    h
                  </strong>{" "}
                  per quiz on average.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Achievements */}
        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                <Trophy className="h-3.5 w-3.5" /> Achievements
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold">
                Your Trophy Case
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {achievements.map((a, i) => (
              <GlassCard
                key={i}
                className={`p-5 text-center ${!a.unlocked && "opacity-50"}`}
              >
                <div
                  className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${a.color} shadow-xl ${a.unlocked && "animate-pulse-glow"}`}
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <a.icon className="h-8 w-8 text-white" strokeWidth={2.2} />
                  {a.unlocked && (
                    <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-amber-300 animate-float" />
                  )}
                </div>
                <div className="mt-3 text-sm font-semibold">{a.label}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
                  {a.unlocked ? "Unlocked" : "Locked"}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

export default StudentProgress;
