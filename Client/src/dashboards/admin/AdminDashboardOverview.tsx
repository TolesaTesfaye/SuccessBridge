import React, { useMemo } from "react";
import {
  GraduationCap,
  School,
  ArrowRight,
  Users,
  Target,
  BookOpen,
} from "lucide-react";

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
  onNavigateToTab,
}) => {
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
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const value = overviewStats[stat.key];
          return (
            <div
              key={stat.key}
              className="bg-white dark:bg-slate-800/80 rounded-xl border border-gray-200 dark:border-slate-700/50 shadow-sm p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
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
              className="bg-white dark:bg-slate-800/80 rounded-xl border border-gray-200 dark:border-slate-700/50 shadow-sm"
            >
              <div className="flex items-center gap-2 p-4 border-b border-gray-100 dark:border-slate-700/30">
                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                  {feature.title}
                </h4>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-4 leading-relaxed">
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
