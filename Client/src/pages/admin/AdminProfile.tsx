import { useState, useEffect } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { useAuthStore } from "@store/authStore";
import api from "@services/api";
import type { ActivityLog } from "@services/adminService";
import {
  Mail,
  Phone,
  CalendarDays,
  MapPin,
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

export function AdminProfile() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<Record<string, any> | null>(null);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [usersRes, studentsRes, resourcesRes, quizzesRes, activityRes] =
          await Promise.allSettled([
            api.get("/users", { params: { limit: 1 } }),
            api.get("/users", { params: { limit: 1, role: "student" } }),
            api.get("/resources/stats"),
            api.get("/quizzes"),
            api.get("/admin/audit-logs", { params: { limit: 10 } }),
          ]);

        const usersTotal =
          usersRes.status === "fulfilled"
            ? usersRes.value.data?.data?.total ?? 0
            : 0;
        const activeStudents =
          studentsRes.status === "fulfilled"
            ? studentsRes.value.data?.data?.total ?? 0
            : 0;
        const resourcesTotal =
          resourcesRes.status === "fulfilled"
            ? resourcesRes.value.data?.data?.total ?? 0
            : 0;
        const quizzesTotal =
          quizzesRes.status === "fulfilled"
            ? (Array.isArray(quizzesRes.value.data?.data)
                ? quizzesRes.value.data.data.length
                : quizzesRes.value.data?.data?.total ?? 0)
            : 0;
        const activityData =
          activityRes.status === "fulfilled"
            ? (activityRes.value.data?.data?.logs ??
              activityRes.value.data?.data ??
              [])
            : [];

        setStats({
          users: { total: usersTotal, active: activeStudents, growth: [] },
          resources: { total: resourcesTotal },
          quizzes: { total: quizzesTotal },
        });
        setActivity(activityData);
      } catch {
        // Silently fail — UI will show fallback values
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const name = user?.name || "Admin User";
  const email = user?.email || "";
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";
  const role = user?.role?.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Admin";
  const isEmailVerified = user?.isEmailVerified ?? true;

  const statCards = [
    { label: "Total Users", value: stats?.users.total ?? 0, icon: Users, color: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" },
    { label: "Active Students", value: stats?.users.active ?? 0, icon: User, color: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" },
    { label: "Resources", value: stats?.resources.total ?? 0, icon: BookOpen, color: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400" },
    { label: "Quizzes", value: stats?.quizzes.total ?? 0, icon: FileText, color: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 sm:px-6">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden glass-panel shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-indigo-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-indigo-500/5" />
          <div className="p-8 relative">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-5xl md:text-6xl font-bold border-4 border-white dark:border-slate-900 shadow-2xl">
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
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-500/20 dark:to-indigo-500/20 border border-blue-200 dark:border-blue-500/30 shadow-lg shadow-blue-500/20 text-blue-700 dark:text-blue-300 text-sm font-semibold">
                    <Shield className="w-4 h-4" />
                    {role}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-lg flex items-center gap-2 justify-center md:justify-start">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  SuccessBridge Administration
                </p>
              </div>

              <div className="flex gap-3 pb-2 w-full md:w-auto justify-center">
                <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center gap-2 justify-center">
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
                <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2 justify-center">
                  <Lock className="w-4 h-4" />
                  Security
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Personal & Contact */}
          <div className="space-y-8">
            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Personal Details
              </h2>
              <div className="space-y-5">
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-500/20">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {email || <span className="text-slate-400 italic">Not provided</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="p-2.5 rounded-xl bg-green-100 dark:bg-green-500/20">
                    <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                      Phone
                    </p>
                    <p className="text-sm font-semibold text-slate-400 italic">
                      Not provided
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-500/20">
                    <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-sm font-semibold text-slate-400 italic">
                      Not provided
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-500/20">
                    <CalendarDays className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                      Member Since
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {joinDate || <span className="text-slate-400 italic">Unknown</span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Role & Permissions */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Role & Permissions
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Access Level
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                    {role}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Email Verified
                  </span>
                  <div className={`flex items-center gap-1.5 text-sm font-semibold ${isEmailVerified ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                    {isEmailVerified ? (
                      <><CheckCircle2 className="w-4 h-4" /> Verified</>
                    ) : (
                      <><AlertCircle className="w-4 h-4" /> Unverified</>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Two-Factor Auth
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                    Not configured
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Recent Activity */}
          <div className="space-y-8">
            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
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
                <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                  {activity.map((item) => {
                    const type = getActivityType(item.action);
                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                            type === "success"
                              ? "bg-emerald-500"
                              : type === "error"
                                ? "bg-red-500"
                                : type === "warning"
                                  ? "bg-amber-500"
                                  : "bg-blue-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {item.action}
                          </p>
                          {item.resource && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {item.resource}
                            </p>
                          )}
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {timeAgo(item.createdAt)}
                            {item.user && (
                              <> · {item.user.name}</>
                            )}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Active Sessions */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-blue-500" />
                Active Sessions
              </h2>
              <div className="space-y-4">
                {[
                  { name: "Current Session", icon: Monitor, lastActive: "Active now", location: "Web Browser" },
                ].map((device, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-500/20">
                      <device.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {device.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {device.location}
                      </p>
                    </div>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium whitespace-nowrap">
                      {device.lastActive}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Security & Notifications */}
          <div className="space-y-8">
            {/* Security Settings */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-500" />
                Security
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Change Password", icon: Key, desc: "Update your password regularly" },
                  { label: "Two-Factor Auth", icon: Shield, desc: "Add an extra layer of security" },
                  { label: "Login History", icon: Globe, desc: "Review recent login activity" },
                  { label: "API Keys", icon: Key, desc: "Manage integration tokens" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group text-left"
                  >
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
                      <item.icon className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-500" />
                Notifications
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Student Registrations", desc: "When new students sign up", enabled: true },
                  { label: "Report Ready", desc: "When analytics reports are generated", enabled: true },
                  { label: "System Alerts", desc: "Critical system notifications", enabled: true },
                  { label: "Weekly Digest", desc: "Weekly summary of activities", enabled: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.desc}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-3 shrink-0">
                      <input
                        type="checkbox"
                        defaultChecked={item.enabled}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-6 bg-slate-300 dark:bg-slate-600 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow after:transition-all" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminProfile;
