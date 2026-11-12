import React, { useMemo } from "react";
import {
  BarChart3,
  BookOpen,
  Building2,
  ChevronRight,
  GraduationCap,
  Layers3,
  LibraryBig,
  Target,
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

const formatLabel = (value: string) => {
  const cleaned = value
    .replace(/[_-]+/g, " ")
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .trim();
  if (!cleaned) return "Other";
  if (cleaned.length <= 4) return cleaned.toUpperCase();
  return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
};

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

  const totalItems =
    metrics.universities + metrics.subjects + resourceCount;
  const share = (value: number) =>
    totalItems > 0 ? Math.round((value / totalItems) * 100) : 0;
  const subjectsPerUniversity =
    metrics.universities > 0 ? metrics.subjects / metrics.universities : 0;
  const resourcesPerSubject =
    metrics.subjects > 0 ? resourceCount / metrics.subjects : 0;

  const resourceTypeBreakdown = useMemo(() => {
    const byType = state.resourceStats?.byType;
    if (!byType || typeof byType !== "object") return [] as Array<{ label: string; count: number }>;
    return Object.entries(byType as Record<string, unknown>)
      .map(([type, count]) => ({ label: formatLabel(type), count: Number(count) || 0 }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [state.resourceStats]);

  const educationLevelBreakdown = useMemo(() => {
    const byLevel = state.resourceStats?.byEducationLevel;
    if (!byLevel || typeof byLevel !== "object") return [] as Array<{ label: string; count: number }>;
    return Object.entries(byLevel as Record<string, unknown>)
      .map(([level, count]) => ({ label: formatLabel(level), count: Number(count) || 0 }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [state.resourceStats]);

  const maxTypeCount = resourceTypeBreakdown[0]?.count || 1;

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
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 md:gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 sm:h-32" />
          ))}
        </div>
        <div className="h-72 rounded-[28px] bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-4">

      {/* Enhanced State Cards Grid - Similar to SuperAdmin */}
      <section className="grid grid-cols-2 gap-2 lg:grid-cols-4 md:gap-3">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 text-white shadow-lg hover:shadow-xl transition-shadow border border-slate-700/50">
          <div className="flex items-start justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <GraduationCap size={18} />
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total Students</p>
          <p className="text-2xl font-bold mb-0.5">{formatNumber(metrics.students)}</p>
          <p className="text-xs text-slate-400">Enrolled learners</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 text-white shadow-lg hover:shadow-xl transition-shadow border border-slate-700/50">
          <div className="flex items-start justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <Building2 size={18} />
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Universities</p>
          <p className="text-2xl font-bold mb-0.5">{formatNumber(metrics.universities)}</p>
          <p className="text-xs text-slate-400">Partner institutions</p>
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

        <div className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-5 text-slate-900 shadow-sm md:p-6 dark:border-white/5 dark:bg-gradient-to-br dark:from-[#101a33] dark:via-[#0d1730] dark:to-[#0a1226] dark:text-white dark:shadow-xl dark:shadow-slate-900/10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent dark:via-blue-400/50" />
          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-slate-400">Platform snapshot</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Catalogue overview</h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Live totals across your academic content.</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-blue-600 dark:border-white/10 dark:bg-white/10 dark:text-blue-300">
                <BookOpen className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total catalogue items</p>
                  <p className="mt-1 text-3xl font-bold leading-none text-slate-900 dark:text-white">{formatNumber(totalItems)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Learners reached</p>
                  <p className="mt-1 text-lg font-bold leading-none text-blue-600 dark:text-blue-300">{formatNumber(metrics.students)}</p>
                </div>
              </div>
              <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                <div className="h-full bg-blue-400" style={{ width: `${share(metrics.universities)}%` }} />
                <div className="h-full bg-amber-400" style={{ width: `${share(metrics.subjects)}%` }} />
                <div className="h-full bg-emerald-400" style={{ width: `${share(resourceCount)}%` }} />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  Universities {share(metrics.universities)}%
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Subjects {share(metrics.subjects)}%
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Resources {share(resourceCount)}%
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <SnapshotRow
                icon={Building2}
                label="Universities"
                value={metrics.universities}
                percent={share(metrics.universities)}
                hint={`${subjectsPerUniversity.toFixed(1)} subjects per university`}
                color="bg-blue-400"
              />
              <SnapshotRow
                icon={Layers3}
                label="Subjects"
                value={metrics.subjects}
                percent={share(metrics.subjects)}
                hint={`Across ${metrics.universities} universities`}
                color="bg-amber-400"
              />
              <SnapshotRow
                icon={LibraryBig}
                label="Learning resources"
                value={resourceCount}
                percent={share(resourceCount)}
                hint={`${resourcesPerSubject.toFixed(1)} resources per subject`}
                color="bg-emerald-400"
              />
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Resource mix</p>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  {resourceTypeBreakdown.length}{" "}
                  {resourceTypeBreakdown.length === 1 ? "type" : "types"}
                </span>
              </div>
              {resourceTypeBreakdown.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400">No resources uploaded yet.</p>
              ) : (
                <div className="space-y-3">
                  {resourceTypeBreakdown.slice(0, 4).map((item, index) => {
                    const palette = [
                      "bg-blue-400",
                      "bg-amber-400",
                      "bg-emerald-400",
                      "bg-purple-400",
                    ];
                    const color = palette[index % palette.length];
                    const percent =
                      maxTypeCount > 0
                        ? Math.round((item.count / maxTypeCount) * 100)
                        : 0;
                    return (
                      <div key={item.label}>
                        <div className="mb-1 flex items-center justify-between text-[11px]">
                          <span className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-300">
                            <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
                            {item.label}
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {formatNumber(item.count)}
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                          <div
                            className={`h-full rounded-full ${color}`}
                            style={{ width: `${Math.max(percent, 3)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {educationLevelBreakdown.length > 0 && (
              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Education levels
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {educationLevelBreakdown.slice(0, 6).map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300"
                    >
                      {item.label}
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-white/10 dark:text-white">
                        {formatNumber(item.count)}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-200 pt-4 text-[11px] text-slate-500 dark:border-white/10 dark:text-slate-500">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                Synced with platform data
              </span>
              <span>{formatNumber(totalItems)} items tracked</span>
            </div>
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

const SnapshotRow: React.FC<{
  label: string;
  value: number;
  percent: number;
  hint: string;
  icon: React.ElementType;
  color: string;
}> = ({ label, value, percent, hint, icon: Icon, color }) => (
  <div>
    <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
      <span className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-300">
        <Icon className="h-3.5 w-3.5 text-slate-400" />
        {label}
      </span>
      <span className="flex items-center gap-2">
        <span className="font-bold text-slate-900 dark:text-white">{formatNumber(value)}</span>
        <span className="w-8 text-right text-[10px] font-semibold text-slate-400 dark:text-slate-500">{percent}%</span>
      </span>
    </div>
    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${Math.max(percent, 2)}%` }}
      />
    </div>
    <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-500">{hint}</p>
  </div>
);
