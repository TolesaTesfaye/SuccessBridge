import { useState, useEffect } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { useAuthStore } from "@store/authStore";
import { adminService } from "@services/adminService";
import type { DashboardStats, ActivityLog, HealthStatus } from "@services/adminService";
import {
  Mail,
  CalendarDays,
  User,
  Shield,
  Building2,
  Activity,
  Bell,
  Lock,
  Key,
  ChevronRight,
  CheckCircle2,
  Clock,
  Monitor,
  Globe,
  Edit3,
  Users,
  BookOpen,
  FileText,
  Loader2,
  AlertCircle,
  Server,
  Database,
  Cpu,
  HardDrive,
  ShieldCheck,
  Zap,
  Layers,
  Megaphone,
  DollarSign,
} from "lucide-react";

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function getActivityType(action: string): "success" | "error" | "warning" | "info" {
  const lower = action.toLowerCase();
  if (lower.includes("approve") || lower.includes("success") || lower.includes("complete")) return "success";
  if (lower.includes("reject") || lower.includes("fail") || lower.includes("delete") || lower.includes("error")) return "error";
  if (lower.includes("update") || lower.includes("edit") || lower.includes("warn")) return "warning";
  return "info";
}

export function SuperAdminProfile() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [statsData, activityData, healthData] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getRecentActivity(15),
          adminService.getSystemHealth(),
        ]);
        setStats(statsData);
        setActivity(activityData);
        setHealth(healthData);
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const name = user?.name || "Super Admin";
  const email = user?.email || "";
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";
  const role = "Super Administrator";
  const isEmailVerified = user?.isEmailVerified ?? true;

  const statCards = [
    { label: "Total Users", value: stats?.users.total ?? 0, icon: Users, color: "bg-blue-500/10 text-blue-600" },
    { label: "Active Students", value: stats?.users.active ?? 0, icon: User, color: "bg-emerald-500/10 text-emerald-600" },
    { label: "Resources", value: stats?.resources.total ?? 0, icon: BookOpen, color: "bg-purple-500/10 text-purple-600" },
    { label: "Quizzes", value: stats?.quizzes.total ?? 0, icon: FileText, color: "bg-amber-500/10 text-amber-600" },
    { label: "Announcements", value: stats?.announcements.total ?? 0, icon: Megaphone, color: "bg-rose-500/10 text-rose-600" },
    { label: "Revenue", value: stats?.payments?.revenue ? `$${stats.payments.revenue}` : "$0", icon: DollarSign, color: "bg-cyan-500/10 text-cyan-600" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-12 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 sm:px-6">

        {/* System Status Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-700/50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
          <div className="p-4 md:p-5 relative flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/20">
                <Server className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">System Status</p>
                <p className="text-xs text-slate-400">
                  {health?.status === "healthy" ? "All systems operational" : health?.status || "Checking..."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Database className="w-3.5 h-3.5" />
                <span className={health?.database === "connected" ? "text-emerald-400" : "text-red-400"}>
                  {health?.database || "..."}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Cpu className="w-3.5 h-3.5" />
                <span>{health?.nodeVersion || "..."}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{health?.uptime || "..."}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden glass-panel shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5" />
          <div className="p-8 relative">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl md:text-6xl font-bold border-4 border-white dark:border-slate-900 shadow-2xl">
                  {name.charAt(0)}
                </div>
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 border-4 border-white dark:border-slate-900 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex-1 pb-2 text-center md:text-left">
                <div className="flex flex-wrap items-center gap-4 mb-2 justify-center md:justify-start">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
                    {name}
                  </h1>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-500/20 dark:to-purple-500/20 border border-indigo-200 dark:border-indigo-500/30 shadow-lg shadow-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    {role}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-lg flex items-center gap-2 justify-center md:justify-start">
                  <Building2 className="w-4 h-4 text-indigo-500" />
                  SuccessBridge Platform Administration
                </p>
              </div>

              <div className="flex gap-3 pb-2 w-full md:w-auto justify-center">
                <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center gap-2 justify-center">
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
                <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2 justify-center">
                  <Lock className="w-4 h-4" />
                  Security
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading ? (
            <div className="col-span-full py-8 flex items-center justify-center text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading stats...
            </div>
          ) : (
            statCards.map((stat) => (
              <div
                key={stat.label}
                className="glass-panel rounded-2xl p-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stat.value.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Column 1: Personal & Account */}
          <div className="space-y-8">
            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-500" />
                Personal Details
              </h2>
              <div className="space-y-5">
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-500/20">
                    <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Email</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {email || <span className="text-slate-400 italic">Not provided</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-500/20">
                    <CalendarDays className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Member Since</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {joinDate || <span className="text-slate-400 italic">Unknown</span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-500" />
                Role & Permissions
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Access Level</span>
                  <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                    {role}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Email Verified</span>
                  <div className={`flex items-center gap-1.5 text-sm font-semibold ${isEmailVerified ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                    {isEmailVerified ? <><CheckCircle2 className="w-4 h-4" /> Verified</> : <><AlertCircle className="w-4 h-4" /> Unverified</>}
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Two-Factor Auth</span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-semibold">Not configured</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Full Platform Access</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">Granted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Recent Activity */}
          <div className="space-y-8">
            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                Recent Activity
              </h2>
              {loading ? (
                <div className="py-8 flex items-center justify-center text-slate-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              ) : activity.length === 0 ? (
                <div className="py-8 text-center text-slate-400">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No recent activity</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {activity.map((item) => {
                    const type = getActivityType(item.action);
                    return (
                      <div key={item.id} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                          type === "success" ? "bg-emerald-500" : type === "error" ? "bg-red-500" : type === "warning" ? "bg-amber-500" : "bg-blue-500"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{item.action}</p>
                          {item.resource && <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{item.resource}</p>}
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {timeAgo(item.createdAt)}
                            {item.user && <> · {item.user.name}</>}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-indigo-500" />
                System Health
              </h2>
              {loading ? (
                <div className="py-4 text-center text-slate-400">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                </div>
              ) : !health ? (
                <div className="py-6 text-center text-slate-400">
                  <Server className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Health data unavailable</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Database</span>
                    </div>
                    <span className={`text-xs font-semibold ${health.database === "connected" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                      {health.database}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Node</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{health.nodeVersion}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Memory (Heap)</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{health.memory?.heapUsed || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Uptime</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{health.uptime}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">API Version</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{health.apiVersion || "1.0.0"}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Security & Quick Actions */}
          <div className="space-y-8">
            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-500" />
                Security
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Change Password", icon: Key, desc: "Update your master password" },
                  { label: "Two-Factor Auth", icon: Shield, desc: "Add extra security layer" },
                  { label: "Audit Logs", icon: Activity, desc: "Review all platform activity" },
                  { label: "API Keys", icon: Key, desc: "Manage integration tokens" },
                  { label: "Session Management", icon: Monitor, desc: "View and manage active sessions" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group text-left"
                  >
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700/50 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
                      <item.icon className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-500" />
                Notifications
              </h2>
              <div className="space-y-4">
                {[
                  { label: "New Registrations", desc: "When new users sign up", enabled: true },
                  { label: "Security Alerts", desc: "Critical security events", enabled: true },
                  { label: "System Updates", desc: "Platform maintenance notices", enabled: true },
                  { label: "Weekly Digest", desc: "Weekly platform summary", enabled: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-3 shrink-0">
                      <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                      <div className="w-10 h-6 bg-slate-300 dark:bg-slate-600 rounded-full peer peer-checked:bg-indigo-600 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow after:transition-all" />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-500" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Users", icon: Users, color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" },
                  { label: "Security", icon: ShieldCheck, color: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" },
                  { label: "Settings", icon: Layers, color: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20" },
                  { label: "Reports", icon: FileText, color: "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${item.color} transition-all hover:-translate-y-0.5`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SuperAdminProfile;
