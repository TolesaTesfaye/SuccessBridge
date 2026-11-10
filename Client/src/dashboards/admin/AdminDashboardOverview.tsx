import React, { useMemo } from "react";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Layers3,
  LibraryBig,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

type DashboardState = {
  loading: boolean;
  error: string | null;
  subjects: any[];
  universities: any[];
  quizzes: any[];
  resourceStats: any | null;
  studentCount: number;
};

type AdminDashboardOverviewProps = {
  state: DashboardState;
  onNavigateToTab: (tab: string) => void;
};

const formatNumber = (value: number) => value.toLocaleString();

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  state,
  onNavigateToTab,
}) => {
  const metrics = useMemo(
    () => ({
      students: state.studentCount,
      universities: state.universities?.length || 0,
      subjects: state.subjects?.length || 0,
      quizzes: state.quizzes?.length || 0,
    }),
    [state],
  );

  const resourceCount =
    state.resourceStats?.total ??
    state.resourceStats?.totalResources ??
    state.resourceStats?.count ??
    0;
  const snapshotMax = Math.max(
    metrics.universities,
    metrics.subjects,
    resourceCount,
    1,
  );

  const actionCards = [
    {
      eyebrow: "Academic structure",
      title: "Universities & subjects",
      description: "Keep the academic catalogue organized and ready for students.",
      icon: Building2,
      accent: "from-blue-500 to-cyan-400",
      action: () => onNavigateToTab("universities"),
      actionLabel: "Manage catalogue",
    },
    {
      eyebrow: "Learning content",
      title: "Resource library",
      description: "Publish, organize, and maintain the materials learners use every day.",
      icon: LibraryBig,
      accent: "from-violet-500 to-fuchsia-400",
      action: () => onNavigateToTab("resources"),
      actionLabel: "Open library",
    },
    {
      eyebrow: "Assessment",
      title: "Quiz workspace",
      description: "Build assessments and keep progress measurement moving forward.",
      icon: Target,
      accent: "from-amber-400 to-orange-500",
      action: () => onNavigateToTab("quizzes"),
      actionLabel: "Open workspace",
    },
  ];

  if (state.loading && state.subjects.length === 0) {
    return (
      <div className="space-y-5 animate-pulse">
        <div className="h-56 rounded-[28px] bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
        <div className="h-72 rounded-[28px] bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-4">

      {/* Enhanced State Cards Grid - Similar to SuperAdmin */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 text-white shadow-lg hover:shadow-xl transition-shadow border border-slate-700/50">
          <div className="flex items-start justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Users</p>
          <p className="text-2xl font-bold mb-0.5">{formatNumber(metrics.students)}</p>
          <p className="text-xs text-slate-400">All platform users</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 text-white shadow-lg hover:shadow-xl transition-shadow border border-slate-700/50">
          <div className="flex items-start justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <GraduationCap size={18} />
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Active Students</p>
          <p className="text-2xl font-bold mb-0.5">{formatNumber(metrics.universities)}</p>
          <p className="text-xs text-slate-400">Enrolled students</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 text-white shadow-lg hover:shadow-xl transition-shadow border border-slate-700/50">
          <div className="flex items-start justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Resources</p>
          <p className="text-2xl font-bold mb-0.5">{formatNumber(resourceCount)}</p>
          <p className="text-xs text-slate-400">Learning materials</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 text-white shadow-lg hover:shadow-xl transition-shadow border border-slate-700/50">
          <div className="flex items-start justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Target size={18} />
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Active Quizzes</p>
          <p className="text-2xl font-bold mb-0.5">{formatNumber(metrics.quizzes)}</p>
          <p className="text-xs text-slate-400">Assessment tools</p>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 md:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Workspace</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Manage the platform</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your most important admin tools, arranged by job.</p>
            </div>
            <BarChart3 className="hidden h-6 w-6 text-slate-300 md:block dark:text-slate-600" />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {actionCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.title}
                  onClick={card.action}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/50 dark:hover:border-slate-600 dark:hover:bg-slate-900"
                >
                  <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} text-white shadow-lg`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{card.eyebrow}</p>
                  <h3 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500 dark:text-slate-400">{card.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                    {card.actionLabel}
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[26px] bg-slate-900 p-5 text-white shadow-xl shadow-slate-900/10 md:p-6 dark:bg-[#101a33]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Platform snapshot</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">Content health</h2>
            </div>
            <BookOpen className="h-5 w-5 text-blue-300" />
          </div>
          <div className="mt-6 space-y-5">
            <SnapshotRow label="Universities" value={metrics.universities} total={snapshotMax} color="bg-blue-400" />
            <SnapshotRow label="Subjects" value={metrics.subjects} total={snapshotMax} color="bg-amber-400" />
            <SnapshotRow label="Learning resources" value={resourceCount} total={snapshotMax} color="bg-emerald-400" />
          </div>
          <div className="mt-7 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-slate-400">
            <GraduationCap className="h-4 w-4 text-blue-300" />
            Keep the catalogue growing for your learners.
          </div>
        </div>
      </section>

      {state.error && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          {state.error}
        </div>
      )}
    </div>
  );
};

type MetricCardProps = {
  label: string;
  value: number;
  icon: React.ElementType;
  tone: "blue" | "violet" | "amber" | "emerald";
};

const metricTone: Record<MetricCardProps["tone"], string> = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300",
};

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon: Icon, tone }) => (
  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 md:p-5">
    <div className={`mb-5 flex h-9 w-9 items-center justify-center rounded-xl ${metricTone[tone]}`}>
      <Icon className="h-4.5 w-4.5" />
    </div>
    <p className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-3xl">{formatNumber(value)}</p>
    <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
    <div className="absolute -bottom-7 -right-7 h-20 w-20 rounded-full border-[12px] border-slate-100/70 dark:border-slate-700/30" />
  </div>
);

const SnapshotRow: React.FC<{ label: string; value: number; total: number; color: string }> = ({ label, value, total, color }) => (
  <div>
    <div className="mb-2 flex items-center justify-between text-xs">
      <span className="font-medium text-slate-300">{label}</span>
      <span className="font-bold text-white">{formatNumber(value)}</span>
    </div>
    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min((value / total) * 100, 100)}%` }} />
    </div>
  </div>
);
