import { useState, useEffect } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import api from "@services/api";
import {
  Globe,
  Clock,
  Sparkles,
  Lock,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  Shield,
  Mail,
  Loader2,
} from "lucide-react";

export const AdminSettings: React.FC = () => {
  const [localValues, setLocalValues] = useState({
    defaultLanguage: "en",
    timezone: "UTC",
    enableRecommendations: true,
    enableEmailVerification: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/settings");
        const data = res.data?.data || {};
        setLocalValues((prev) => ({
          ...prev,
          defaultLanguage: data.defaultLanguage || "en",
          timezone: data.timezone || "UTC",
          enableRecommendations: data.enableRecommendations ?? true,
          enableEmailVerification: data.enableEmailVerification ?? true,
        }));
      } catch {
        // Use defaults if API unavailable
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (field: string, value: any) => {
    setLocalValues((prev) => ({ ...prev, [field]: value }));
    setMessage(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await api.put("/settings", localValues);
      setMessage({ type: "success", text: "Settings saved successfully" });
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({ type: "error", text: "Failed to save settings" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400">Loading settings...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-12 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 sm:px-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">
            Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Configure platform behavior and preferences
          </p>
        </div>

        {/* Status Alert */}
        {message && (
          <div
            className={`rounded-2xl border p-4 flex items-center gap-3 animate-in slide-in-from-top-2 ${
              message.type === "success"
                ? "border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                : "border-red-500/20 bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-300"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <p className="text-sm font-semibold">{message.text}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* General Settings */}
            <div className="glass-panel rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="px-6 md:px-8 py-5 border-b border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    General
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Regional formatting and platform defaults
                  </p>
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Default Language
                    </label>
                    <div className="relative">
                      <select
                        value={localValues.defaultLanguage}
                        onChange={(e) => handleChange("defaultLanguage", e.target.value)}
                        className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-900 dark:text-white font-semibold appearance-none transition-all text-sm"
                      >
                        <option value="en">English (US)</option>
                        <option value="am">Amharic (Ethiopia)</option>
                        <option value="or">Oromo (Ethiopia)</option>
                      </select>
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Timezone
                    </label>
                    <div className="relative">
                      <select
                        value={localValues.timezone}
                        onChange={(e) => handleChange("timezone", e.target.value)}
                        className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-900 dark:text-white font-semibold appearance-none transition-all text-sm"
                      >
                        <option value="UTC">Coordinated Universal Time (UTC)</option>
                        <option value="EAT">East Africa Time (EAT)</option>
                        <option value="GMT">Greenwich Mean Time (GMT)</option>
                      </select>
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="glass-panel rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="px-6 md:px-8 py-5 border-b border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Platform Features
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Enable or disable core system modules
                  </p>
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-4">
                {[
                  {
                    key: "enableRecommendations",
                    label: "AI Recommendations",
                    desc: "Enable machine-learning driven course and resource suggestions for students.",
                    icon: Sparkles,
                    color: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
                  },
                  {
                    key: "enableEmailVerification",
                    label: "Email Verification",
                    desc: "Require email verification for new student registrations.",
                    icon: Mail,
                    color: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
                  },
                ].map((item: Record<string, any>) => {
                  const vals = localValues as Record<string, any>;
                  const checked = vals[item.key] === true;
                  return (
                    <div
                      key={item.key}
                      className="flex items-start justify-between p-4 md:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/30 transition-all hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    >
                      <div className="flex gap-4">
                        <div className={`mt-0.5 p-2.5 rounded-xl ${item.color}`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {item.label}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-md">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleChange(item.key, !checked)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                          checked ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ${
                            checked ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleSave}
                disabled={loading || saving}
                className="flex-1 inline-flex justify-center items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {saving ? "Saving..." : "Save Configuration"}
              </button>
              <button
                onClick={() => window.location.reload()}
                disabled={loading || saving}
                className="sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-semibold text-sm transition-all border border-slate-200 dark:border-slate-700"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Security Info */}
            <div className="glass-panel rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Super Admin Only
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  The following configuration panels require elevated privileges and are restricted to Super Administrators:
                </p>
                <ul className="space-y-3">
                  {[
                    "Maintenance Mode Controls",
                    "Password & Security Policies",
                    "Session Timeout Limits",
                    "Auto-Approve Resources",
                    "Platform Identity Settings",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700/50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Contact super admin to request changes
                  </p>
                </div>
              </div>
            </div>

            {/* Environment Info */}
            <div className="glass-panel rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Environment
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: "API Version", value: "v1.2.0" },
                  { label: "Environment", value: "Production", color: "text-emerald-600 dark:text-emerald-400" },
                  { label: "Settings Count", value: "Local" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/30"
                  >
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {item.label}
                    </span>
                    <span className={`text-sm font-bold text-slate-900 dark:text-white ${item.color || ""}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
