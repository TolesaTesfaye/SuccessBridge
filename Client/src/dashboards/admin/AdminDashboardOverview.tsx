import React, { useMemo } from "react";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import {
  AlertTriangle,
  BarChart3,
  BookOpenCheck,
  Building2,
  CheckCircle,
  GraduationCap,
  RefreshCcw,
  School,
  TrendingUp,
  Activity,
  Database,
  Zap,
  ArrowRight,
  Users,
  Upload,
  FileText,
  Sparkles,
  ShieldCheck,
  Server,
  ChevronRight,
  Clock,
  LayoutDashboard,
  Settings,
  CalendarDays,
  Target,
  Star,
  LineChart,
  Lightbulb,
  Award,
} from "lucide-react";
import {
  DashboardHeroSkeleton,
  DashboardGridSkeleton,
} from "@components/dashboards/DashboardSkeleton";
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

  const overviewStats = useMemo(
    () => [
      {
        label: "Active Students",
        value: state.studentCount.toLocaleString(),
        icon: Users,
        color: "blue",
        trend: "Live",
      },
      {
        label: "Total Resources",
        value: (
          state.resourceStats?.totalResources ||
          state.resourceStats?.total ||
          0
        ).toLocaleString(),
        icon: BookOpenCheck,
        color: "indigo",
        trend: "Sync",
      },
      {
        label: "Active Quizzes",
        value: state.quizzes.length.toLocaleString(),
        icon: Target,
        color: "emerald",
        trend: "Active",
      },
      {
        label: "Academic Nodes",
        value: (
          state.universities.length +
          state.departments.length +
          state.subjects.length
        ).toLocaleString(),
        icon: School,
        color: "amber",
        trend: "Hub",
      },
    ],
    [state],
  );

  const managementFeatures = [
    {
      title: "Academic Registry",
      description: "Manage the core educational structure of SuccessBridge.",
      icon: School,
      color: "blue",
      items: ["Universities", "Departments", "Subjects"],
      action: () => onNavigateToTab("universities"),
    },
    {
      title: "Content Repository",
      description: "Control the flow of knowledge and learning materials.",
      icon: FileText,
      color: "indigo",
      items: ["Resource Uploads", "Media Management", "Audit Logs"],
      action: () => onNavigateToTab("resources"),
    },
    {
      title: "Assessment Center",
      description: "Oversee student performance and testing integrity.",
      icon: GraduationCap,
      color: "emerald",
      items: ["Quiz Deployment", "Result Analytics", "Question Banks"],
      action: () => onNavigateToTab("quizzes"),
    },
  ];

  const getColorClasses = (color: string) => {
    const maps: any = {
      blue: "from-blue-500/20 to-blue-600/20 text-blue-500 border-blue-500/20",
      indigo:
        "from-indigo-500/20 to-indigo-600/20 text-indigo-500 border-indigo-500/20",
      violet:
        "from-violet-500/20 to-violet-600/20 text-violet-500 border-violet-500/20",
      emerald:
        "from-emerald-500/20 to-emerald-600/20 text-emerald-500 border-emerald-500/20",
      amber:
        "from-amber-500/20 to-amber-600/20 text-amber-500 border-amber-500/20",
      rose: "from-rose-500/20 to-rose-600/20 text-rose-500 border-rose-500/20",
    };
    return maps[color] || maps.blue;
  };

  if (state.loading && state.subjects.length === 0) {
    return (
      <div className="space-y-12 animate-pulse">
        <DashboardHeroSkeleton />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-40 rounded-[32px] bg-slate-100 dark:bg-white/5"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen -mt-6 -mx-4 pb-12 bg-slate-900 text-slate-200 transition-colors duration-300 overflow-hidden">
      {/* Command Interface Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pointer-events-none"></div>

      {/* Premium Hero Section - Admin Landing Style */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Decorative Elements - Dark Mode */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-[150px] rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-cyan-600 to-emerald-600 blur-[150px] rounded-full opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-gradient-to-r from-indigo-600 to-purple-600 blur-[120px] rounded-full opacity-30"></div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-1/2 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 border border-blue-200 dark:border-blue-700 text-sm font-black uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300 backdrop-blur-md shadow-lg">
                <Sparkles className="h-4 w-4 animate-pulse text-blue-500 dark:text-blue-400" />
                Command Interface v4.0
              </div>

              <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none text-slate-900 dark:text-white">
                Platform <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                  Orchestration
                </span>
              </h1>

              <p className="text-xl font-medium text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Welcome back,{" "}
                <span className="text-slate-900 dark:text-white font-bold">
                  {user?.name || "Administrator"}
                </span>
                . Today is{" "}
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  {today}
                </span>
                . Your systems are operational and performing at peak
                efficiency.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => onNavigateToTab("reports")}
                  className="group relative px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black rounded-[24px] shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10">Intelligence Report</span>
                  <LineChart className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button
                  onClick={onRefresh}
                  className="px-8 py-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl text-slate-900 dark:text-slate-100 font-black rounded-[24px] border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 hover:shadow-2xl active:scale-95 transition-all flex items-center gap-3 shadow-xl"
                >
                  <RefreshCcw
                    className={`w-5 h-5 ${state.loading ? "animate-spin" : ""}`}
                  />
                  <span>Sync Nodes</span>
                </button>
              </div>
            </div>

            {/* Infrastructure Health Cluster - Like a hero visual */}
            <div className="lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000 opacity-50"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="p-8 rounded-[40px] bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-blue-100 dark:border-blue-800 shadow-2xl space-y-6 hover:shadow-3xl transition-shadow">
                  <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 inline-flex">
                    <Database className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">
                      99.9%
                    </h3>
                    <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      Uptime Index
                    </p>
                  </div>
                </div>
                <div className="p-8 rounded-[40px] bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-blue-100 dark:border-blue-800 shadow-2xl space-y-6 mt-12 hover:shadow-3xl transition-shadow">
                  <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 inline-flex">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">
                      124ms
                    </h3>
                    <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      Avg Latency
                    </p>
                  </div>
                </div>
                <div className="p-8 rounded-[40px] bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-blue-100 dark:border-blue-800 shadow-2xl space-y-6 hover:shadow-3xl transition-shadow">
                  <div className="p-4 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 inline-flex">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">
                      Encrypted
                    </h3>
                    <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      Security Link
                    </p>
                  </div>
                </div>
                <div className="p-8 rounded-[40px] bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-blue-100 dark:border-blue-800 shadow-2xl space-y-6 mt-12 hover:shadow-3xl transition-shadow">
                  <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 inline-flex">
                    <Activity className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">
                      Healthy
                    </h3>
                    <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      System Pulse
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - Clean & High Impact */}
      <section className="py-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-y border-blue-100 dark:border-blue-900 shadow-inner transition-colors">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {overviewStats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-[32px] bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-900/30 border border-blue-100 dark:border-blue-800 hover:bg-white dark:hover:bg-slate-700 hover:shadow-2xl hover:scale-105 transition-all duration-500"
              >
                <div
                  className={`mb-6 p-4 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500 inline-flex group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
                    {stat.label}
                  </span>
                  <span className="text-[10px] font-black text-emerald-500 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Management Grid - Landing Style */}
      <section className="py-8 container mx-auto px-8">
        <div className="text-center mb-8 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Core Management Nodes
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            High-performance control interfaces for every dimension of the
            SuccessBridge academic ecosystem.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {managementFeatures.map((feature, index) => (
            <div
              key={index}
              className="group p-10 rounded-[48px] bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-800 dark:to-blue-900/50 border border-blue-100 dark:border-blue-800 shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-3xl hover:scale-105 transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-125 transition-transform duration-700">
                <feature.icon className="w-40 h-40" />
              </div>
              <div
                className={`mb-8 p-5 rounded-[24px] bg-${feature.color}-500/10 text-${feature.color}-500 inline-flex`}
              >
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                {feature.title}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-medium">
                {feature.description}
              </p>
              <ul className="space-y-4 mb-10">
                {feature.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle
                      className={`w-4 h-4 text-${feature.color}-500`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={feature.action}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 text-blue-700 dark:text-blue-300 font-black text-xs uppercase tracking-[0.2em] hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
              >
                Access Hub
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive System Monitoring Section - The "Landing Feature" */}
      <section className="mb-8 relative">
        <div className="relative bg-transparent p-8 lg:p-12 overflow-visible">
          {/* Curved/Wavy Background Shape */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1200 400"
          >
            <defs>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              ></linearGradient>
            </defs>
            <path
              d="M0,80 C200,20 400,20 600,80 C800,140 1000,140 1200,80 L1200,320 C1000,380 800,380 600,320 C400,260 200,260 0,320 Z"
              fill="url(#gradient1)"
            />
          </svg>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-[0.3em]">
                <Activity className="h-4 w-4" />
                Live Network Load
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                Global Performance <br />
                <span className="text-cyan-200">Synchronization.</span>
              </h2>
              <div className="space-y-5">
                {[
                  { label: "Storage Efficiency", value: 85, color: "cyan" },
                  { label: "API Success Rate", value: 99.8, color: "blue" },
                  { label: "Active Connections", value: 72, color: "indigo" },
                ].map((bar, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-cyan-200">
                      <span>{bar.label}</span>
                      <span className="text-white font-bold">{bar.value}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full bg-gradient-to-r from-${bar.color}-400 to-${bar.color}-300 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-cyan-100 leading-relaxed italic border-l-2 border-cyan-300/50 pl-4">
                "Our predictive analytics engine anticipates peak loads 4 hours
                in advance, ensuring zero-latency access for all students during
                exam seasons."
              </p>
            </div>

            <div className="relative aspect-square lg:aspect-auto h-[350px] flex items-center justify-center">
              {/* Abstract "Globe" or Pulse visual */}
              <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-300/30 animate-[ping_4s_linear_infinite]" />
              <div className="absolute w-[200px] h-[200px] rounded-full border border-cyan-200/40 animate-[ping_6s_linear_infinite]" />
              <div className="relative w-[150px] h-[150px] rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-400/30 border border-cyan-300/50 flex items-center justify-center shadow-[0_0_100px_rgba(34,211,238,0.5)]">
                <Zap className="w-16 h-16 text-yellow-300 animate-pulse" />
              </div>

              <div className="absolute top-10 left-10 p-3 rounded-2xl bg-white/20 backdrop-blur-md animate-bounce border border-white/30">
                <Star className="w-5 h-5 text-yellow-300 mb-1" />
                <div className="text-[10px] font-black text-white">
                  Top Rated Node
                </div>
              </div>
              <div className="absolute bottom-10 right-10 p-3 rounded-2xl bg-white/20 backdrop-blur-md animate-pulse border border-white/30">
                <Users className="w-5 h-5 text-cyan-300 mb-1" />
                <div className="text-[10px] font-black text-white">
                  Active Node Cluster
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - The "Admin News" or Bottom Banner */}
      <section className="mb-8 relative">
        <div className="p-8 lg:p-10 text-white text-center relative overflow-visible space-y-6">
          {/* Curved/Wavy Background Shape */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1200 300"
          >
            <defs>
              <linearGradient
                id="gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              ></linearGradient>
            </defs>
            <path
              d="M0,60 C300,10 600,10 900,60 C1050,85 1125,85 1200,60 L1200,240 C1125,265 1050,265 900,240 C600,190 300,190 0,240 Z"
              fill="url(#gradient2)"
            />
          </svg>

          <Lightbulb className="w-14 h-14 mx-auto text-yellow-300 drop-shadow-[0_0_20px_rgba(252,211,77,0.5)] animate-bounce relative z-10" />
          <div className="space-y-3 relative z-10">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
              Need Support or Have Feedback?
            </h2>
            <p className="text-lg font-medium text-purple-100 max-w-2xl mx-auto">
              The SuccessBridge developer team is available 24/7 for system
              customization and administrative support.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button className="px-8 py-4 bg-white text-purple-700 font-black rounded-2xl hover:bg-purple-50 transition-all active:scale-95 shadow-xl">
              System Support
            </button>
            <button className="px-8 py-4 bg-white/20 backdrop-blur-xl text-white font-black rounded-2xl border border-white/30 hover:bg-white/30 transition-all active:scale-95 shadow-xl">
              Configuration Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
