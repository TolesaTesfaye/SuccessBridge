import React, { useState, useEffect, useCallback } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { analyticsService, AnalyticsData } from "@services/analyticsService";
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  GraduationCap,
  Activity,
  Globe,
  Zap,
  BarChart3,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ShieldCheck,
  Server,
  RefreshCcw,
} from "lucide-react";
import { AnalyticsSkeleton } from "@components/dashboards/DashboardSkeleton";

export const AdminDashboardAnalytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month");

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const analyticsData = await analyticsService.getAnalytics(timeRange);
      setData(analyticsData);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading && !data) {
    return <AnalyticsSkeleton />;
  }

  const getColorClasses = (color: string) => {
    const maps: any = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-500/10",
        text: "text-blue-600 dark:text-blue-400",
        bar: "bg-blue-500",
        lightBg: "bg-blue-500/20",
      },
      indigo: {
        bg: "bg-indigo-50 dark:bg-indigo-500/10",
        text: "text-indigo-600 dark:text-indigo-400",
        bar: "bg-indigo-500",
        lightBg: "bg-indigo-500/20",
      },
      emerald: {
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
        text: "text-emerald-600 dark:text-emerald-400",
        bar: "bg-emerald-500",
        lightBg: "bg-emerald-500/20",
      },
      rose: {
        bg: "bg-rose-50 dark:bg-rose-500/10",
        text: "text-rose-600 dark:text-rose-400",
        bar: "bg-rose-500",
        lightBg: "bg-rose-500/20",
      },
      violet: {
        bg: "bg-violet-50 dark:bg-violet-500/10",
        text: "text-violet-600 dark:text-violet-400",
        bar: "bg-violet-500",
        lightBg: "bg-violet-500/20",
      },
    };
    return maps[color] || maps.blue;
  };

  const StatCard = ({
    title,
    value,
    subValue,
    icon: Icon,
    trend,
    color,
  }: any) => {
    const classes = getColorClasses(color);
    return (
      <Card className="overflow-hidden border-none shadow-lg bg-white dark:bg-[#1a1b23] group hover:scale-[1.02] transition-transform duration-300">
        <CardBody className="p-0">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-2xl ${classes.bg}`}>
                <Icon className={`w-5 h-5 ${classes.text}`} />
              </div>
              {trend && (
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black ${
                    trend > 0
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10"
                      : "bg-rose-50 text-rose-600 dark:bg-rose-500/10"
                  }`}
                >
                  {trend > 0 ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  {Math.abs(trend)}%
                </div>
              )}
            </div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
              {title}
            </h3>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                {value}
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-tight">
              {subValue}
            </p>
          </div>
          <div className={`h-1.5 w-full ${classes.lightBg}`}>
            <div
              className={`h-full ${classes.bar} rounded-r-full transition-all duration-1000`}
              style={{ width: "65%" }}
            ></div>
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#20212b] p-6 border border-white/5 shadow-2xl -mx-4 md:-mx-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-500/20 border border-blue-500/30">
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Intelligence Center
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Real-time Platform Analytics
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-black/20 p-1.5 rounded-2xl border border-white/5">
            {["week", "month", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                  timeRange === range
                    ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <Button
            variant="secondary"
            onClick={fetchAnalytics}
            loading={loading}
            className="rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 h-[42px]"
            icon={
              <RefreshCcw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            }
          >
            Refresh
          </Button>
        </div>
      </div>

      {!data ? null : (
        <>
          {/* Primary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Global Students"
              value={data.userStats.totalUsers.toLocaleString()}
              trend={12.5}
              icon={Users}
              color="blue"
              subValue="Verified active accounts"
            />
            <StatCard
              title="Resource Library"
              value={data.resourceStats.totalResources.toLocaleString()}
              trend={8.2}
              icon={FileText}
              color="indigo"
              subValue="Academic materials"
            />
            <StatCard
              title="Quiz Accuracy"
              value={`${data.quizStats.averageScore}%`}
              trend={15.4}
              icon={GraduationCap}
              color="emerald"
              subValue="Mean performance"
            />
            <StatCard
              title="System Load"
              value={`${data.systemStats.databasePerformance}%`}
              trend={-2.4}
              icon={Activity}
              color="rose"
              subValue="Database efficiency"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Growth Chart */}
            <Card className="lg:col-span-2 border-none shadow-xl bg-white dark:bg-[#1a1b23] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-white/5 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Growth Trajectory
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                    Total
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                    Active
                  </div>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="h-[280px] w-full relative">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 800 240"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="colorUsersRefined"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <filter
                        id="glow"
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                      >
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite
                          in="SourceGraphic"
                          in2="blur"
                          operator="over"
                        />
                      </filter>
                    </defs>

                    {/* Grid */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1="0"
                        y1={i * 60}
                        x2="800"
                        y2={i * 60}
                        stroke="currentColor"
                        className="text-slate-200 dark:text-white/5"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Paths */}
                    <path
                      d={`M ${data.userStats.userGrowthData.map((d, i) => `${(i / (data.userStats.userGrowthData.length - 1)) * 800},${240 - (d.value / data.userStats.totalUsers) * 200}`).join(" L ")} L 800,240 L 0,240 Z`}
                      fill="url(#colorUsersRefined)"
                    />
                    <path
                      d={`M ${data.userStats.userGrowthData.map((d, i) => `${(i / (data.userStats.userGrowthData.length - 1)) * 800},${240 - (d.value / data.userStats.totalUsers) * 200}`).join(" L ")}`}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#glow)"
                    />

                    <path
                      d={`M ${data.userStats.userGrowthData.map((d, i) => `${(i / (data.userStats.userGrowthData.length - 1)) * 800},${240 - (d.activeUsers / data.userStats.totalUsers) * 200}`).join(" L ")}`}
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      className="opacity-60"
                    />

                    {/* Interaction Points */}
                    {data.userStats.userGrowthData.map((d, i) => (
                      <g key={i}>
                        <circle
                          cx={
                            (i / (data.userStats.userGrowthData.length - 1)) *
                            800
                          }
                          cy={240 - (d.value / data.userStats.totalUsers) * 200}
                          r="6"
                          fill="#1a1b23"
                          stroke="#3b82f6"
                          strokeWidth="3"
                        />
                      </g>
                    ))}
                  </svg>

                  <div className="flex justify-between mt-6 px-2">
                    {data.userStats.userGrowthData.map((d, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-black text-slate-400 uppercase tracking-tighter"
                      >
                        {d.label}
                      </span>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Content Mix */}
            <Card className="border-none shadow-xl bg-white dark:bg-[#1a1b23]">
              <CardHeader className="border-b border-slate-100 dark:border-white/5 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10">
                    <Zap className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Ecosystem Mix
                  </h3>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-6">
                  {data.resourceStats.resourcesByType.map((item, idx) => {
                    const classes = getColorClasses(
                      idx === 0
                        ? "blue"
                        : idx === 1
                          ? "indigo"
                          : idx === 2
                            ? "violet"
                            : "rose",
                    );
                    return (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            {item.type}
                          </span>
                          <span className="text-xs font-black text-slate-900 dark:text-white">
                            {item.count} units
                          </span>
                        </div>
                        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                          <div
                            className={`h-full rounded-full ${classes.bar} transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                            style={{
                              width: `${(item.count / data.resourceStats.totalResources) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-white/5 space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#15161d] border border-slate-100 dark:border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-emerald-500/10">
                          <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                            Content Quality
                          </p>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            Verified Resources
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-black text-emerald-500">
                        94%
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Regional Performance */}
            <Card className="border-none shadow-xl bg-white dark:bg-[#1a1b23]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-white/5 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10">
                    <Globe className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Geographic Reach
                  </h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Ethiopia
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-5">
                  {data.geographicData.map((region, idx) => (
                    <div key={idx} className="flex items-center gap-6">
                      <div className="w-28 shrink-0 text-[10px] font-black text-slate-500 uppercase tracking-tighter truncate">
                        {region.region}
                      </div>
                      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                          style={{ width: `${region.percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-24 shrink-0 flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          {region.percentage}%
                        </span>
                        <span className="text-[10px] font-black text-emerald-500 flex items-center gap-0.5">
                          <ArrowUpRight className="w-3 h-3" />
                          {region.growth}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Infrastructure Health */}
            <Card className="border-none shadow-xl bg-white dark:bg-[#1a1b23]">
              <CardHeader className="border-b border-slate-100 dark:border-white/5 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/10">
                    <Server className="w-5 h-5 text-rose-500" />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    Infrastructure Health
                  </h3>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-5 rounded-3xl bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10">
                    <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
                      <Zap className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        API Latency
                      </span>
                    </div>
                    <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                      {data.systemStats.serverResponseTime}ms
                    </div>
                    <div className="mt-2 h-1 w-full bg-blue-100 dark:bg-blue-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[85%] rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-5 rounded-3xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10">
                    <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Availability
                      </span>
                    </div>
                    <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                      {data.systemStats.apiSuccessRate}%
                    </div>
                    <div className="mt-2 h-1 w-full bg-emerald-100 dark:bg-emerald-500/20 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[99%] rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {data.systemStats.systemHealth.map((service, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-[#15161d]"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`relative flex h-3 w-3`}>
                          <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${service.status === "healthy" ? "bg-emerald-400" : "bg-amber-400"}`}
                          ></span>
                          <span
                            className={`relative inline-flex rounded-full h-3 w-3 ${service.status === "healthy" ? "bg-emerald-500" : "bg-amber-500"}`}
                          ></span>
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">
                          {service.service}
                        </span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {service.uptime} uptime
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                            service.status === "healthy"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-amber-500/10 text-amber-500"
                          }`}
                        >
                          {service.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Activity Log */}
          <Card className="border-none shadow-2xl bg-white dark:bg-[#1a1b23] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-white/5 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-500/10">
                  <Clock className="w-5 h-5 text-slate-500" />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Audit Log
                </h3>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest h-8"
              >
                Export Data
              </Button>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-white/5">
                {data.recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-6 p-5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group"
                  >
                    <div
                      className={`shrink-0 p-3 rounded-2xl transition-transform group-hover:scale-110 duration-300 ${
                        activity.type === "success"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10"
                          : activity.type === "warning"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10"
                            : activity.type === "error"
                              ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10"
                              : "bg-blue-50 text-blue-600 dark:bg-blue-500/10"
                      }`}
                    >
                      {activity.type === "success" ? (
                        <ShieldCheck className="w-5 h-5" />
                      ) : (
                        <Zap className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                        {activity.event}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Automated System Audit
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          Priority: {idx < 2 ? "High" : "Normal"}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
};
