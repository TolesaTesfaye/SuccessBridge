import React, { useMemo } from "react";
import {
  GraduationCap,
  RefreshCcw,
  School,
  ArrowRight,
  Users,
  Target,
  BookOpen,
  Code2,
  Building2,
} from "lucide-react";
import { useAuth } from "@hooks/useAuth";

type DashboardState = {
  loading: boolean;
  error: string | null;
  subjects: any[];
  departments: any[];
  universities: any[];
  quizzes: any[];
  resourceStats: any | null;
  studentCount: number;
};

type AdminDashboardOverviewProps = {
  state: DashboardState;
  onRefresh: () => void;
  onNavigateToTab: (tab: string) => void;
};

const statCards = [
  {
    label: "Active Students",
    key: "studentCount" as const,
    icon: Users,
    color: "blue",
    format: (v: number) => v.toLocaleString(),
  },
  {
    label: "Active Quizzes",
    key: "quizzes" as const,
    icon: Target,
    color: "emerald",
    format: (v: number) => v.toLocaleString(),
  },
  {
    label: "Academic Nodes",
    key: "nodes" as const,
    icon: School,
    color: "amber",
    format: (v: number) => v.toLocaleString(),
  },
];

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  state,
  onRefresh,
  onNavigateToTab,
}) => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const overviewStats = useMemo(() => ({
    studentCount: state.studentCount,
    quizzes: state.quizzes.length,
    nodes: state.universities.length + state.departments.length + state.subjects.length,
  }), [state]);

  const managementFeatures = [
    {
      title: "Academic Registry",
      description: "Manage universities, departments, and subjects.",
      icon: School,
      items: ["Universities", "Departments", "Subjects"],
      action: () => onNavigateToTab("universities"),
    },
    {
      title: "Content Repository",
      description: "Upload, organize, and manage learning resources.",
      icon: BookOpen,
      items: ["Resource Library", "Resource Uploads", "Media Management"],
      action: () => onNavigateToTab("resources"),
    },
    {
      title: "Assessment Center",
      description: "Create quizzes and analyze student performance.",
      icon: GraduationCap,
      items: ["Quiz Deployment", "Result Analytics", "Question Banks"],
      action: () => onNavigateToTab("quizzes"),
    },
  ];

  const quickActions = [
    { label: "Universities", tab: "universities", value: state.universities.length },
    { label: "Departments", tab: "departments", value: state.departments.length },
    { label: "Subjects", tab: "subjects", value: state.subjects.length },
    { label: "Students", tab: "students", value: state.studentCount },
  ];

  if (state.loading && state.subjects.length === 0) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 md:h-40 rounded-xl bg-slate-100 dark:bg-slate-800" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-xl bg-slate-100 dark:bg-slate-800" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back, <span className="text-blue-600 dark:text-blue-400">{user?.name || "Admin"}</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {today}
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={state.loading}
          className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all disabled:opacity-50"
        >
          <RefreshCcw className={`w-3.5 h-3.5 ${state.loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const value = overviewStats[stat.key];
          return (
            <div
              key={stat.key}
              className="relative overflow-hidden bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {stat.format(value)}
              </p>
              <p className="text-[11px] md:text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions + Management Features */}
      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Management Features */}
        {managementFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-2 mb-4">
                {feature.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={feature.action}
                className="w-full py-2 px-3 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                Open
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick Stats Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {quickActions.map((action) => (
          <button
            key={action.tab}
            onClick={() => onNavigateToTab(action.tab)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all"
          >
            <span className="font-bold text-slate-900 dark:text-white">{action.value}</span>
            {action.label}
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
};
