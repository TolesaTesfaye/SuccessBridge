import { useState, useEffect } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import api from "@services/api";
import {
  TrendingUp,
  Users,
  BookOpen,
  FileText,
  Download,
  BarChart3,
  PieChart,
  CalendarDays,
  Loader2,
  ChevronDown,
  AlertCircle,
  Award,
} from "lucide-react";

function ResourcePieChart({ data }: { data: { resourceType: string; count: number; totalDownloads: number }[] }) {
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-purple-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
  ];
  const total = data.reduce((s, i) => s + i.count, 0) || 1;
  let cumPct = 0;
  const slices = data.map((item, i) => {
    const pct = (item.count / total) * 100;
    const offset = cumPct;
    cumPct += pct;
    return { ...item, pct, offset, color: colors[i % colors.length] };
  });

  return (
    <div className="space-y-4">
      {/* Visual bar stack */}
      <div className="h-4 rounded-full overflow-hidden flex">
        {slices.map((s, i) => (
          <div
            key={i}
            className={s.color}
            style={{ width: `${s.pct}%` }}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {slices.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className={`w-3 h-3 rounded-full shrink-0 ${item.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize truncate">
                {item.resourceType || "Uncategorized"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {item.count} files · {item.totalDownloads} downloads
              </p>
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {Math.round(item.pct)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminReports() {
  const [resourceData, setResourceData] = useState<any>(null);
  const [userCount, setUserCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [usersRes, resourceStatsRes, quizzesRes] =
          await Promise.allSettled([
            api.get("/users", { params: { limit: 1 } }),
            api.get("/resources/stats"),
            api.get("/quizzes"),
          ]);

        if (usersRes.status === "fulfilled") {
          setUserCount(usersRes.value.data?.data?.total ?? 0);
        }
        if (resourceStatsRes.status === "fulfilled") {
          setResourceData(resourceStatsRes.value.data?.data);
        }
        if (quizzesRes.status === "fulfilled") {
          const qData = quizzesRes.value.data?.data;
          setQuizCount(
            Array.isArray(qData) ? qData.length : qData?.total ?? 0,
          );
        }
      } catch {
        // Silently handle
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Build resource byType array from stats object (resourceStats.byType is { typeName: count })
  const resourceByType = resourceData?.byType
    ? Object.entries(resourceData.byType).map(([resourceType, count]) => ({
        resourceType,
        count: count as number,
        totalDownloads: 0,
      }))
    : [];

  const totalResources = resourceData?.total ?? 0;
  const totalStudents = userCount;

  const overviewCards = [
    {
      label: "Total Users",
      value: totalStudents.toLocaleString(),
      icon: Users,
      color: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    },
    {
      label: "Resources",
      value: totalResources.toLocaleString(),
      icon: BookOpen,
      color: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    },
    {
      label: "Resource Types",
      value: resourceByType.length.toLocaleString(),
      icon: PieChart,
      color: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
    },
    {
      label: "Quiz Variants",
      value: quizCount.toLocaleString(),
      icon: Award,
      color: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400">Loading reports...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 sm:px-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Reports
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Platform analytics and data insights
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {overviewCards.map((card) => (
            <div
              key={card.label}
              className="glass-panel rounded-2xl p-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${card.color}`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {card.value}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {card.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Growth */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                User Growth
              </h2>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <CalendarDays className="w-3.5 h-3.5" />
                Last 6 months
              </span>
            </div>
            <div className="py-8 text-center text-slate-400">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No growth data available</p>
              <p className="text-xs text-slate-500 mt-1">Total users: {userCount.toLocaleString()}</p>
            </div>
          </div>

          {/* Resources by Type */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-500" />
                Resources by Type
              </h2>
            </div>
            {!resourceByType.length ? (
              <div className="py-8 text-center text-slate-400">
                <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No resource data available</p>
              </div>
            ) : (
              <ResourcePieChart data={resourceByType} />
            )}
          </div>
        </div>

        {/* Quiz Performance */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-500" />
              Quiz Performance
            </h2>
          </div>
          {quizCount === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No quiz performance data available</p>
            </div>
          ) : (
            <div className="py-8 text-center">
              <Award className="w-12 h-12 mx-auto mb-3 text-amber-400" />
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                {quizCount} Quiz{quizCount !== 1 ? "zes" : ""} Available
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Performance metrics require super_admin access
              </p>
            </div>
          )}
        </div>

        {/* Export Section */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-500" />
              Export Reports
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Export as PDF", icon: FileText, desc: "Download full report as PDF" },
              { label: "Export as CSV", icon: BarChart3, desc: "Download data as spreadsheet" },
              { label: "Schedule Export", icon: CalendarDays, desc: "Set up automatic reports" },
            ].map((item) => (
              <button
                key={item.label}
                className="group flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all"
              >
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-500 ml-auto transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminReports;
