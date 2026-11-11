import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  GraduationCap,
  BookOpen,
  Hourglass,
  ArrowUpRight,
  BarChart3,
  Zap,
  UserRound,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { userService } from "@services/userService";
import { resourceService } from "@services/resourceService";
import api from "@services/api";

interface OverviewTabProps {
  stats: {
    totalUsers: number;
    activeStudents: number;
    totalResources: number;
    pendingApprovals?: number;
    loading: boolean;
  };
  onNavigateTab?: (tabId: string) => void;
}

type ChartRange = "7D" | "30D" | "90D" | "1Y";

const COLORS = ["#1677ff", "#a020f0", "#20c997", "#ff9d2e", "#ef4444", "#6366f1"];

const RANGE_DAYS: Record<ChartRange, number> = {
  "7D": 7,
  "30D": 30,
  "90D": 90,
  "1Y": 365,
};

function getTimeAgo(date: string) {
  const now = new Date();
  const created = new Date(date);
  const diffMs = now.getTime() - created.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

function buildSignupChart(
  users: any[],
  range: ChartRange,
): { day: string; users: number }[] {
  const days = RANGE_DAYS[range];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const buckets: { key: string; label: string; count: number }[] = [];

  if (days <= 7) {
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      buckets.push({
        key: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString(undefined, { weekday: "short" }),
        count: 0,
      });
    }
  } else if (days <= 90) {
    const step = days <= 30 ? 1 : 3;
    for (let i = days - 1; i >= 0; i -= step) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      buckets.push({
        key: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        count: 0,
      });
    }
  } else {
    for (let i = 11; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      buckets.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        label: d.toLocaleDateString(undefined, { month: "short" }),
        count: 0,
      });
    }
  }

  users.forEach((user) => {
    if (!user.createdAt) return;
    const created = new Date(user.createdAt);
    if (Number.isNaN(created.getTime())) return;

    if (days > 90) {
      const key = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, "0")}`;
      const bucket = buckets.find((b) => b.key === key);
      if (bucket) bucket.count += 1;
      return;
    }

    const key = created.toISOString().slice(0, 10);
    const bucket = buckets.find((b) => b.key === key);
    if (bucket) {
      bucket.count += 1;
    } else if (days > 7) {
      // Snap to nearest earlier bucket for stepped ranges
      const nearest = [...buckets]
        .reverse()
        .find((b) => b.key <= key);
      if (nearest) nearest.count += 1;
    }
  });

  return buckets.map((b) => ({ day: b.label, users: b.count }));
}

function StatCard({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  color,
  loading,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  change?: string;
  icon: React.ElementType;
  color: "blue" | "green" | "purple" | "orange";
  loading?: boolean;
}) {
  const colorMap = {
    blue: {
      card: "from-blue-500/15 via-blue-500/5 to-transparent border-blue-500/20",
      icon: "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/30",
      title: "text-blue-600 dark:text-blue-400",
      value: "from-blue-600 to-blue-800 dark:from-blue-300 dark:to-blue-500",
    },
    green: {
      card: "from-emerald-500/15 via-emerald-500/5 to-transparent border-emerald-500/20",
      icon: "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-emerald-500/30",
      title: "text-emerald-600 dark:text-emerald-400",
      value: "from-emerald-600 to-emerald-800 dark:from-emerald-300 dark:to-emerald-500",
    },
    purple: {
      card: "from-purple-500/15 via-purple-500/5 to-transparent border-purple-500/20",
      icon: "bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-purple-500/30",
      title: "text-purple-600 dark:text-purple-400",
      value: "from-purple-600 to-purple-800 dark:from-purple-300 dark:to-purple-500",
    },
    orange: {
      card: "from-orange-500/15 via-orange-500/5 to-transparent border-orange-500/20",
      icon: "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-orange-500/30",
      title: "text-orange-600 dark:text-orange-400",
      value: "from-orange-600 to-orange-800 dark:from-orange-300 dark:to-orange-500",
    },
  }[color];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-white dark:bg-[#101a32] bg-gradient-to-br ${colorMap.card} p-4 md:p-5 shadow-sm hover:shadow-lg transition-all duration-300`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-lg ${colorMap.icon}`}
        >
          <Icon size={28} strokeWidth={2.2} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${colorMap.title}`}>
            {title}
          </h3>
          <p
            className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white md:text-3xl"
          >
            {loading ? "..." : value}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-[#a9bad5]">{subtitle}</p>
        </div>

        {change && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ArrowUpRight size={14} />
            {change}
          </span>
        )}
      </div>

      <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/40 dark:bg-white/5" />
    </div>
  );
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  stats,
  onNavigateTab,
}) => {
  const navigate = useNavigate();
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [resourcesByType, setResourcesByType] = useState<Record<string, number>>({});
  const [pendingApprovals, setPendingApprovals] = useState(
    stats.pendingApprovals ?? 0,
  );
  const [telegramUsers, setTelegramUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chartRange, setChartRange] = useState<ChartRange>("7D");

  const goToResources = () => {
    if (onNavigateTab) {
      onNavigateTab("resources");
      return;
    }
    navigate("/superadmin/dashboard", { state: { activeTab: "resources" } });
  };

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const [usersRes, resourcesRes, approvalsRes] = await Promise.all([
          userService.getAllUsers(),
          resourceService.getResources({ limit: 1000 }),
          api.get("/auth/admin-requests").catch(() => ({ data: { requests: [] } })),
        ]);

        const users = Array.isArray(usersRes) ? usersRes : usersRes.data || [];
        const resourcesData = Array.isArray(resourcesRes)
          ? resourcesRes
          : resourcesRes.data?.data || resourcesRes.data || [];
        const resources = Array.isArray(resourcesData) ? resourcesData : [];

        // Count Telegram users
        const telegramCount = users.filter((u: any) => u.telegramId).length;
        setTelegramUsers(telegramCount);

        const sortedUsers = [...users].sort(
          (a: any, b: any) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime(),
        );

        setAllUsers(users);
        setRecentUsers(sortedUsers.slice(0, 5));

        const typeCount: Record<string, number> = {};
        resources.forEach((r: any) => {
          const type = (r.type || "other").toString();
          typeCount[type] = (typeCount[type] || 0) + 1;
        });
        setResourcesByType(typeCount);

        const requests = approvalsRes?.data?.requests || [];
        setPendingApprovals(
          requests.filter((r: any) => r.status === "pending").length,
        );
      } catch (error) {
        console.error("Failed to fetch activity data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  const chartData = useMemo(
    () => buildSignupChart(allUsers, chartRange),
    [allUsers, chartRange],
  );

  const resourceData = useMemo(() => {
    const entries = Object.entries(resourcesByType);
    const total = entries.reduce((sum, [, count]) => sum + count, 0) || 1;

    return entries
      .map(([name, value]) => ({
        name: name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        value,
        percent: Math.round((value / total) * 100),
      }))
      .sort((a, b) => b.value - a.value);
  }, [resourcesByType]);

  const totalResourcesChart = resourceData.reduce((sum, item) => sum + item.value, 0);

  const activityItems = recentUsers.map((user) => ({
    id: user.id,
    name: user.name || "Unknown",
    initial: (user.name || "?").charAt(0).toUpperCase(),
    action: "joined the platform",
    time: getTimeAgo(user.createdAt),
    role: (user.role || "student").toUpperCase(),
  }));

  return (
    <div className="space-y-5 md:space-y-6">
      {/* Statistics */}
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          subtitle="All platform users"
          change="+12%"
          icon={Users}
          color="blue"
          loading={stats.loading}
        />
        <StatCard
          title="Active Students"
          value={stats.activeStudents.toLocaleString()}
          subtitle="Enrolled students"
          change="+8%"
          icon={GraduationCap}
          color="green"
          loading={stats.loading}
        />
        <StatCard
          title="Total Resources"
          value={stats.totalResources.toLocaleString()}
          subtitle="Learning materials"
          change="+15%"
          icon={BookOpen}
          color="purple"
          loading={stats.loading}
        />
        <StatCard
          title="Telegram Users"
          value={telegramUsers}
          subtitle="Connected to Telegram"
          icon={UserRound}
          color="orange"
          loading={loading && stats.loading}
        />
      </section>

      {/* Analytics + Resource Categories */}
      <section className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-4 md:gap-5">
        {/* Analytics Overview */}
        <div className="rounded-2xl border border-slate-200 dark:border-[#263653] bg-white dark:bg-[#101a32] p-4 md:p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-base md:text-lg font-bold text-slate-900 dark:text-white m-0">
              <BarChart3 className="text-blue-500" size={20} />
              Analytics Overview
            </h2>

            <div className="flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-[#0b1428] p-1">
              {(["7D", "30D", "90D", "1Y"] as ChartRange[]).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setChartRange(range)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    chartRange === range
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500 dark:text-[#a9bad5] hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 md:h-72 w-full">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1677ff" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#1677ff" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="currentColor"
                    className="text-slate-200 dark:text-[#263653]"
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="day"
                    stroke="#a9bad5"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis
                    stroke="#a9bad5"
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                    tick={{ fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#101a32",
                      border: "1px solid #263653",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#1685ff"
                    strokeWidth={3}
                    fill="url(#blueGradient)"
                    dot={{
                      fill: "#ffffff",
                      stroke: "#1685ff",
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{ r: 7 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Resource Categories */}
        <div className="rounded-2xl border border-slate-200 dark:border-[#263653] bg-white dark:bg-[#101a32] p-4 md:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-base md:text-lg font-bold text-slate-900 dark:text-white m-0">
              <span className="text-blue-500 text-xl leading-none">◕</span>
              Resource Categories
            </h2>
            <button
              type="button"
              onClick={goToResources}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Details <ChevronRight size={16} />
            </button>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
            </div>
          ) : resourceData.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-sm text-slate-400">
              No resources yet
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row xl:flex-col items-center gap-5">
              <div className="relative h-48 w-48 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resourceData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="57%"
                      outerRadius="88%"
                      paddingAngle={2}
                      stroke="none"
                    >
                      {resourceData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#101a32",
                        border: "1px solid #263653",
                        borderRadius: "10px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white m-0">
                    {totalResourcesChart || stats.totalResources}
                  </h2>
                  <span className="text-xs text-slate-400">Total</span>
                </div>
              </div>

              <div className="w-full space-y-2.5">
                {resourceData.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-white/5"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: COLORS[index % COLORS.length] }}
                    />
                    <span className="flex-1 text-sm text-slate-600 dark:text-[#a9bad5]">
                      {item.name}
                    </span>
                    <strong className="text-sm text-slate-900 dark:text-white">
                      {item.percent}%
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Live Activity Feed */}
      <section className="rounded-2xl border border-slate-200 dark:border-[#263653] bg-white dark:bg-[#101a32] p-4 md:p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-center gap-2 text-base md:text-lg font-bold text-slate-900 dark:text-white m-0">
            <Zap className="text-amber-400" size={20} />
            Live Activity Feed
          </h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Real-time
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          </div>
        ) : activityItems.length === 0 ? (
          <div className="py-10 text-center text-sm text-slate-400">
            No recent activity yet
          </div>
        ) : (
          <div className="space-y-3">
            {activityItems.map((person) => (
              <div
                key={person.id}
                className="group flex items-center gap-3 rounded-xl border border-slate-100 dark:border-[#263653]/70 bg-slate-50/70 dark:bg-[#0b1428]/60 p-3 md:p-4 transition-all hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-md"
              >
                <div className="relative shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-lg">
                    {person.initial}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-[#101a32] bg-emerald-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-sm text-slate-900 dark:text-white">
                      {person.name}
                    </strong>
                    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-300">
                      {person.role}
                    </span>
                  </div>
                  <p className="m-0 mt-0.5 text-xs text-slate-500 dark:text-[#a9bad5]">
                    {person.action}{" "}
                    <span className="text-slate-400">• {person.time}</span>
                  </p>
                </div>

                <UserRound className="hidden sm:block h-5 w-5 text-slate-300 dark:text-[#3d4f6f] group-hover:text-blue-400 transition-colors" />
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="pt-2 text-center text-xs text-slate-400 dark:text-[#7f91ad]">
        © {new Date().getFullYear()} SuccessBridge. All rights reserved.
      </footer>
    </div>
  );
};
