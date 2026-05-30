import React, { useState, useEffect } from "react";
import { SystemSetting } from "@services/adminService";
import {
  Settings,
  Server,
  Bell,
  ShieldCheck,
  Megaphone,
  Search,
  Edit,
  Loader2,
  DollarSign,
  Check,
} from "lucide-react";
import {
  StyledCard,
  StyledBadge,
  StyledInput,
  StyledBtn,
  StyledModal,
} from "./StyledComponents";

export const SettingsTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<SystemSetting | null>(null);
  const [editValue, setEditValue] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { managementService } =
          await import("@services/managementService");
        setSettings(await managementService.getAllSettings());
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, [toast]);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const { managementService } = await import("@services/managementService");
      let p: any;
      try {
        p = JSON.parse(editValue);
      } catch {
        p = editValue;
      }
      await managementService.updateSetting(editing.settingKey, p);
      toast.success("Setting updated successfully");
      setEditing(null);
      setSettings(await managementService.getAllSettings());
    } catch {
      toast.error("Failed to update setting");
    } finally {
      setSaving(false);
    }
  };

  const grouped = settings.reduce((acc: Record<string, SystemSetting[]>, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const categories = Object.keys(grouped);
  const filteredSettings = settings.filter((s) => {
    const matchesCategory =
      activeCategory === "all" || s.category === activeCategory;
    const matchesSearch =
      s.settingKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      platform: <Server size={18} />,
      email: <Bell size={18} />,
      payment: <DollarSign size={18} />,
      security: <ShieldCheck size={18} />,
      feature: <Settings size={18} />,
      notification: <Megaphone size={18} />,
    };
    return icons[category] || <Settings size={18} />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      platform: "from-blue-500 to-blue-600",
      email: "from-purple-500 to-purple-600",
      payment: "from-green-500 to-green-600",
      security: "from-red-500 to-red-600",
      feature: "from-orange-500 to-orange-600",
      notification: "from-pink-500 to-pink-600",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  if (loading)
    return (
      <div className="py-12 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
        <p className="mt-4 text-gray-500">Loading settings...</p>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            System Settings
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage platform configuration and feature flags
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StyledBadge className="bg-blue-100 text-blue-700 px-3 py-1">
            {settings.length} Settings
          </StyledBadge>
        </div>
      </div>

      {/* Search and Filters */}
      <StyledCard>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <StyledInput
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
            >
              All ({settings.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                }`}
              >
                {getCategoryIcon(cat)}
                {cat.charAt(0).toUpperCase() + cat.slice(1)} (
                {grouped[cat].length})
              </button>
            ))}
          </div>
        </div>
      </StyledCard>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSettings.map((setting) => (
          <div
            key={setting.id}
            className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${getCategoryColor(setting.category)}`}
                    />
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {setting.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">
                    {setting.settingKey}
                  </h4>
                </div>
                <StyledBtn
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setEditing(setting);
                    setEditValue(JSON.stringify(setting.settingValue, null, 2));
                  }}
                >
                  <Edit size={14} />
                </StyledBtn>
              </div>

              {/* Description */}
              {setting.description && (
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-3 line-clamp-2">
                  {setting.description}
                </p>
              )}

              {/* Value Preview */}
              <div className="bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3">
                <pre className="text-xs text-gray-600 dark:text-slate-400 font-mono overflow-x-auto max-h-20">
                  {JSON.stringify(setting.settingValue, null, 1)}
                </pre>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-100 dark:border-slate-700/30 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Updated {new Date(setting.updatedAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => {
                  setEditing(setting);
                  setEditValue(JSON.stringify(setting.settingValue, null, 2));
                }}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Edit →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSettings.length === 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-12 text-center">
          <Settings
            size={48}
            className="mx-auto mb-4 text-gray-300 dark:text-slate-600"
          />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            No settings found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <StyledModal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        title="Edit Setting"
        size="lg"
      >
        {editing && (
          <div className="space-y-4">
            {/* Setting Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700/30 dark:to-slate-700/30 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(editing.category)}`}
                />
                <span className="text-xs font-semibold text-gray-500 uppercase">
                  {editing.category}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                {editing.settingKey}
              </h3>
              {editing.description && (
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">
                  {editing.description}
                </p>
              )}
            </div>

            {/* Value Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Value (JSON format)
              </label>
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                rows={8}
                spellCheck={false}
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Enter valid JSON. For simple values, use quotes for
                strings.
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
              <StyledBtn
                variant="secondary"
                onClick={() => setEditing(null)}
                disabled={saving}
              >
                Cancel
              </StyledBtn>
              <StyledBtn variant="primary" onClick={save} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
              </StyledBtn>
            </div>
          </div>
        )}
      </StyledModal>
    </div>
  );
};
