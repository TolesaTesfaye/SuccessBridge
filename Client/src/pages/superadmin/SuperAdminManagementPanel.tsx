import React, { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { DashboardTopTabNav } from "@components/dashboards/DashboardTopTabNav";
import { useToast } from "@components/common/Toast";
import {
  adminService,
  User,
  Resource,
  Quiz,
  Subject,
  Announcement,
  AuditLog,
  Permission,
  SystemSetting,
  DashboardStats,
  HealthStatus,
} from "@services/adminService";
import {
  LayoutDashboard,
  Users,
  FileText,
  Megaphone,
  Settings,
  ShieldCheck,
  BarChart3,
  Activity,
  Plus,
  Search,
  Filter,
  RefreshCw,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Upload,
  Loader2,
  TrendingUp,
  DollarSign,
  FileCheck,
  Bell,
  Server,
  Database,
  HardDrive,
  Clock,
  AlertCircle,
  Check,
  X,
  Zap,
  Cpu,
  ShieldCheck as ShieldCheckIcon,
} from "lucide-react";

type TabType =
  | "overview"
  | "users"
  | "content"
  | "announcements"
  | "permissions"
  | "settings"
  | "audit"
  | "reports"
  | "system";

// ==================== STYLED COMPONENTS ====================

const StyledBtn: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: string;
    size?: string;
  }
> = ({
  variant = "secondary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const base =
    "font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg",
    secondary:
      "bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-600",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    warning: "bg-orange-500 hover:bg-orange-600 text-white",
    ghost:
      "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300",
  };
  const sizes: Record<string, string> = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      className={`${base} ${variants[variant] || variants.secondary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const StyledCard: React.FC<{
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, icon, children, className = "" }) => (
  <div
    className={`bg-white dark:bg-slate-800/80 rounded-xl border border-gray-200 dark:border-slate-700/50 shadow-sm ${className}`}
  >
    {title && (
      <div className="flex items-center gap-2 p-4 border-b border-gray-100 dark:border-slate-700/30">
        {icon && <span className="text-blue-500">{icon}</span>}
        <h4 className="font-bold text-gray-900 dark:text-white text-sm">
          {title}
        </h4>
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

const StyledBadge: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <span
    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}
  >
    {children}
  </span>
);

const StyledInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
> = ({ label, className = "", ...props }) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
    )}
    <input
      className={`w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all ${className}`}
      {...props}
    />
  </div>
);

const StyledSelect: React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    options: { value: string; label: string }[];
  }
> = ({ label, options, className = "", ...props }) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
    )}
    <select
      className={`w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all ${className}`}
      {...props}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

const StyledModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: string;
}> = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const widths: Record<string, string> = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full ${widths[size] || widths.md} max-h-[85vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-gray-500"
          >
            &times;
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

// ==================== OVERVIEW TAB ====================

const OverviewTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [statsData, healthData, activityData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getSystemHealth(),
        adminService.getRecentActivity(10),
      ]);
      setStats(statsData);
      setHealth(healthData);
      setActivity(activityData);
    } catch {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading)
    return (
      <div className="py-12 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{stats?.users.total || 0}</p>
              <p className="text-sm opacity-80 mt-1">Total Users</p>
            </div>
            <Users size={32} className="opacity-60" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{stats?.users.active || 0}</p>
              <p className="text-sm opacity-80 mt-1">Active Students</p>
            </div>
            <FileCheck size={32} className="opacity-60" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">
                {stats?.resources.total || 0}
              </p>
              <p className="text-sm opacity-80 mt-1">Resources</p>
            </div>
            <FileText size={32} className="opacity-60" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{stats?.quizzes.total || 0}</p>
              <p className="text-sm opacity-80 mt-1">Quizzes</p>
            </div>
            <Activity size={32} className="opacity-60" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <StyledCard title="System Health" icon={<Server size={18} />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-slate-400">
                Status
              </span>
              <StyledBadge
                className={
                  health?.status === "healthy"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              >
                {health?.status || "Unknown"}
              </StyledBadge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-slate-400">
                Uptime
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {health?.uptime || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-slate-400">
                Database
              </span>
              <StyledBadge
                className={
                  health?.database === "connected"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              >
                {health?.database || "Unknown"}
              </StyledBadge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-slate-400">
                Memory
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {health?.memory?.rss || "N/A"}
              </span>
            </div>
          </div>
        </StyledCard>

        {/* Recent Activity */}
        <StyledCard title="Recent Activity" icon={<Activity size={18} />}>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {activity.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No recent activity
              </p>
            ) : (
              activity.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/20"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${log.status === "success" ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {log.action}
                    </p>
                    <p className="text-xs text-gray-500">
                      {log.user?.name || "System"} ·{" "}
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </StyledCard>
      </div>

      {/* Quick Actions */}
      <StyledCard title="Quick Actions" icon={<Settings size={18} />}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StyledBtn
            variant="primary"
            onClick={() => toast.info("Feature coming soon")}
          >
            <Plus size={16} className="mr-1" /> New User
          </StyledBtn>
          <StyledBtn
            variant="secondary"
            onClick={() => toast.info("Feature coming soon")}
          >
            <Megaphone size={16} className="mr-1" /> Broadcast
          </StyledBtn>
          <StyledBtn
            variant="secondary"
            onClick={() => toast.info("Feature coming soon")}
          >
            <Download size={16} className="mr-1" /> Export Data
          </StyledBtn>
          <StyledBtn variant="secondary" onClick={fetchData}>
            <RefreshCw size={16} className="mr-1" /> Refresh
          </StyledBtn>
        </div>
      </StyledCard>
    </div>
  );
};

// ==================== USERS TAB ====================

const UsersTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editing, setEditing] = useState<User | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await adminService.getUsers({
        search: search || undefined,
        role: roleFilter || undefined,
        status: statusFilter || undefined,
        page,
        limit: 20,
      });
      setUsers(result.users);
      setTotal(result.total);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, statusFilter, page, toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateUser = async (data: Partial<User>) => {
    if (!editing) return;
    try {
      await adminService.updateUser(editing.id, data);
      toast.success("User updated");
      setEditing(null);
      fetchUsers();
    } catch {
      toast.error("Failed to update user");
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await adminService.deleteUser(id);
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const roleColors: Record<string, string> = {
    student: "bg-blue-100 text-blue-700",
    admin: "bg-purple-100 text-purple-700",
    super_admin: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <StyledCard>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <StyledInput
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-10"
              />
            </div>
          </div>
          <StyledSelect
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            options={[
              { value: "", label: "All Roles" },
              { value: "student", label: "Students" },
              { value: "admin", label: "Admins" },
              { value: "super_admin", label: "Super Admins" },
            ]}
          />
          <StyledSelect
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            options={[
              { value: "", label: "All Status" },
              { value: "approved", label: "Approved" },
              { value: "pending", label: "Pending" },
              { value: "rejected", label: "Rejected" },
            ]}
          />
        </div>
      </StyledCard>

      {/* Users Table */}
      <StyledCard>
        {loading ? (
          <div className="py-12 text-center">
            <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Email Verified
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Joined
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700/30">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/20"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <StyledBadge
                          className={
                            roleColors[user.role] || "bg-gray-100 text-gray-600"
                          }
                        >
                          {user.role.replace("_", " ")}
                        </StyledBadge>
                      </td>
                      <td className="px-4 py-3">
                        <StyledBadge
                          className={
                            user.approvalStatus === "approved"
                              ? "bg-green-100 text-green-700"
                              : user.approvalStatus === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }
                        >
                          {user.approvalStatus || "Unknown"}
                        </StyledBadge>
                      </td>
                      <td className="px-4 py-3">
                        {user.isEmailVerified ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <XCircle size={16} className="text-gray-400" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <StyledBtn
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditing(user)}
                          >
                            <Edit size={14} />
                          </StyledBtn>
                          <StyledBtn
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash2 size={14} className="text-red-500" />
                          </StyledBtn>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-slate-700/30">
              <p className="text-sm text-gray-500">
                Showing {users.length} of {total} users
              </p>
              <div className="flex gap-2">
                <StyledBtn
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </StyledBtn>
                <StyledBtn
                  size="sm"
                  disabled={page >= Math.ceil(total / 20)}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </StyledBtn>
              </div>
            </div>
          </>
        )}
      </StyledCard>

      {/* Edit Modal */}
      <StyledModal
        isOpen={!!editing}
        onClose={() => setEditing(null)}
        title="Edit User"
        size="lg"
      >
        {editing && (
          <div className="space-y-4">
            <StyledInput
              label="Name"
              defaultValue={editing.name}
              id="edit-name"
            />
            <StyledInput
              label="Email"
              defaultValue={editing.email}
              id="edit-email"
              type="email"
            />
            <StyledSelect
              label="Role"
              defaultValue={editing.role}
              id="edit-role"
              options={[
                { value: "student", label: "Student" },
                { value: "admin", label: "Admin" },
                { value: "super_admin", label: "Super Admin" },
              ]}
            />
            <StyledSelect
              label="Approval Status"
              defaultValue={editing.approvalStatus || "approved"}
              id="edit-status"
              options={[
                { value: "approved", label: "Approved" },
                { value: "pending", label: "Pending" },
                { value: "rejected", label: "Rejected" },
              ]}
            />
            <div className="flex justify-end gap-3 pt-4">
              <StyledBtn variant="secondary" onClick={() => setEditing(null)}>
                Cancel
              </StyledBtn>
              <StyledBtn
                variant="primary"
                onClick={() => {
                  const name = (
                    document.getElementById("edit-name") as HTMLInputElement
                  ).value;
                  const email = (
                    document.getElementById("edit-email") as HTMLInputElement
                  ).value;
                  const role = (
                    document.getElementById("edit-role") as HTMLSelectElement
                  ).value;
                  const approvalStatus = (
                    document.getElementById("edit-status") as HTMLSelectElement
                  ).value;
                  updateUser({ name, email, role, approvalStatus });
                }}
              >
                Save Changes
              </StyledBtn>
            </div>
          </div>
        )}
      </StyledModal>
    </div>
  );
};

// ==================== CONTENT TAB ====================

const ContentTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<
    "resources" | "quizzes" | "subjects"
  >("resources");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resData, quizData, subjData] = await Promise.all([
        adminService.getResources({ limit: 50 }),
        adminService.getQuizzes({ limit: 50 }),
        adminService.getSubjects(),
      ]);
      setResources(resData.resources);
      setQuizzes(quizData.quizzes);
      setSubjects(subjData);
    } catch {
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading)
    return (
      <div className="py-12 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-slate-700">
        {[
          { id: "resources", label: "Resources", count: resources.length },
          { id: "quizzes", label: "Quizzes", count: quizzes.length },
          { id: "subjects", label: "Subjects", count: subjects.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 font-semibold text-sm transition-colors border-b-2 ${activeSubTab === tab.id ? "text-blue-600 dark:text-blue-400 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700"}`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {activeSubTab === "resources" && (
        <StyledCard>
          <div className="space-y-4">
            {resources.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No resources found
              </p>
            ) : (
              resources.map((r) => (
                <div
                  key={r.id}
                  className="flex items-start justify-between p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {r.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {r.description || "No description"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <StyledBadge className="bg-blue-100 text-blue-700">
                        {r.type}
                      </StyledBadge>
                      <StyledBadge className="bg-purple-100 text-purple-700">
                        {r.educationLevel}
                      </StyledBadge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <StyledBtn size="sm" variant="ghost">
                      <Eye size={14} />
                    </StyledBtn>
                    <StyledBtn size="sm" variant="ghost">
                      <Trash2 size={14} className="text-red-500" />
                    </StyledBtn>
                  </div>
                </div>
              ))
            )}
          </div>
        </StyledCard>
      )}

      {activeSubTab === "quizzes" && (
        <StyledCard>
          <div className="space-y-4">
            {quizzes.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No quizzes found</p>
            ) : (
              quizzes.map((q) => (
                <div
                  key={q.id}
                  className="flex items-start justify-between p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {q.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {q.description || "No description"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <StyledBadge
                        className={
                          q.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      >
                        {q.isPublished ? "Published" : "Draft"}
                      </StyledBadge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <StyledBtn size="sm" variant="ghost">
                      <Edit size={14} />
                    </StyledBtn>
                    <StyledBtn size="sm" variant="ghost">
                      <Eye size={14} />
                    </StyledBtn>
                  </div>
                </div>
              ))
            )}
          </div>
        </StyledCard>
      )}

      {activeSubTab === "subjects" && (
        <StyledCard>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((s) => (
              <div
                key={s.id}
                className="p-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {s.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {s.description || "No description"}
                </p>
              </div>
            ))}
          </div>
        </StyledCard>
      )}
    </div>
  );
};

// ==================== ANNOUNCEMENTS TAB (existing, kept as-is) ====================

const AnnouncementsTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [list, setList] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "info",
    targetRoles: [] as string[],
  });

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await adminService.getAnnouncements({ limit: 50 });
      setList(result.announcements);
    } catch {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const create = async () => {
    if (!form.title || !form.content) {
      toast.error("Title and content required");
      return;
    }
    try {
      // Using managementService for announcements (existing endpoint)
      const { managementService } = await import("@services/managementService");
      await managementService.createAnnouncement(form);
      toast.success("Created");
      setShowCreate(false);
      fetch();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Platform Announcements
        </h3>
        <StyledBtn variant="primary" onClick={() => setShowCreate(true)}>
          <Plus size={16} className="mr-1" /> New
        </StyledBtn>
      </div>
      {loading ? (
        <div className="py-12 text-center">
          <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
        </div>
      ) : list.length === 0 ? (
        <div className="bg-white dark:bg-slate-800/60 rounded-xl border p-12 text-center text-gray-400">
          <Megaphone size={48} className="mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">No announcements</p>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((a) => (
            <div
              key={a.id}
              className={`bg-white dark:bg-slate-800/60 rounded-xl border p-5 ${a.isActive ? "" : "opacity-60"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <StyledBadge
                      className={
                        a.type === "info"
                          ? "bg-blue-100 text-blue-700"
                          : a.type === "warning"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }
                    >
                      {a.type}
                    </StyledBadge>
                    {!a.isActive && (
                      <StyledBadge className="bg-gray-100 text-gray-500">
                        Inactive
                      </StyledBadge>
                    )}
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                    {a.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 whitespace-pre-wrap">
                    {a.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <StyledModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create Announcement"
      >
        <div className="space-y-4">
          <StyledInput
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Announcement title"
          />
          <StyledSelect
            label="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            options={[
              { value: "info", label: "Info" },
              { value: "warning", label: "Warning" },
              { value: "important", label: "Important" },
            ]}
          />
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-slate-300">
              Content
            </label>
            <textarea
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
              rows={5}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Announcement content..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <StyledBtn variant="secondary" onClick={() => setShowCreate(false)}>
              Cancel
            </StyledBtn>
            <StyledBtn variant="primary" onClick={create}>
              Create
            </StyledBtn>
          </div>
        </div>
      </StyledModal>
    </div>
  );
};

// ==================== PERMISSIONS TAB ====================

const PermissionsTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<
    Record<string, string[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("student");

  const fetch = useCallback(async () => {
    try {
      const result = await adminService.getPermissions();
      setPermissions(result.permissions);
      setRolePermissions(result.rolePermissions);
    } catch {
      toast.error("Failed to load permissions");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const togglePermission = async (permId: string) => {
    const current = rolePermissions[selectedRole] || [];
    const updated = current.includes(permId)
      ? current.filter((p) => p !== permId)
      : [...current, permId];
    try {
      await adminService.updateRolePermissions(selectedRole, updated);
      setRolePermissions({ ...rolePermissions, [selectedRole]: updated });
      toast.success("Updated");
    } catch {
      toast.error("Failed");
    }
  };

  if (loading)
    return (
      <div className="py-12 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
      </div>
    );

  const grouped = permissions.reduce(
    (acc, p) => {
      if (!acc[p.category]) acc[p.category] = [];
      acc[p.category].push(p);
      return acc;
    },
    {} as Record<string, Permission[]>,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Role Permissions
        </h3>
        <StyledSelect
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          options={[
            { value: "student", label: "Student" },
            { value: "admin", label: "Admin" },
            { value: "super_admin", label: "Super Admin" },
          ]}
        />
      </div>
      <div className="space-y-4">
        {Object.entries(grouped).map(([category, perms]) => (
          <StyledCard
            key={category}
            title={category.replace(/_/g, " ")}
            icon={<ShieldCheck size={18} />}
          >
            <div className="space-y-2">
              {perms.map((perm) => {
                const has = (rolePermissions[selectedRole] || []).includes(
                  perm.id,
                );
                return (
                  <div
                    key={perm.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/20"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {perm.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {perm.description}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePermission(perm.id)}
                      className={`w-12 h-6 rounded-full transition-colors ${has ? "bg-green-500" : "bg-gray-300 dark:bg-slate-600"}`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${has ? "translate-x-6" : "translate-x-0.5"}`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </StyledCard>
        ))}
      </div>
    </div>
  );
};

// ==================== SETTINGS TAB (Professional UI) ====================

const SettingsTab: React.FC<{ toast: any }> = ({ toast }) => {
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

// ==================== AUDIT TAB ====================

const AuditTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("");

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await adminService.getAuditLogs({
        action: actionFilter || undefined,
        page,
        limit: 50,
      });
      setLogs(result.logs);
      setTotal(result.total);
    } catch {
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  }, [actionFilter, page, toast]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (loading)
    return (
      <div className="py-12 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
      </div>
    );

  return (
    <div className="space-y-6">
      <StyledCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StyledInput
            placeholder="Filter by action..."
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
          />
          <div className="flex gap-2 items-end">
            <StyledBtn
              variant="secondary"
              onClick={() => {
                setActionFilter("");
                setPage(1);
                fetch();
              }}
            >
              <RefreshCw size={16} className="mr-1" /> Reset
            </StyledBtn>
            <StyledBtn
              variant="secondary"
              onClick={() => toast.info("Export feature coming soon")}
            >
              <Download size={16} className="mr-1" /> Export
            </StyledBtn>
          </div>
        </div>
      </StyledCard>

      <StyledCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                  Resource
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/30">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700/20"
                >
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {log.user ? (
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {log.user.name}
                        </p>
                        <p className="text-xs text-gray-500">{log.user.role}</p>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">System</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {log.action}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {log.resource || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <StyledBadge
                      className={
                        log.status === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {log.status || "unknown"}
                    </StyledBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-slate-700/30">
          <p className="text-sm text-gray-500">
            Showing {logs.length} of {total} entries
          </p>
          <div className="flex gap-2">
            <StyledBtn
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </StyledBtn>
            <StyledBtn
              size="sm"
              disabled={page >= Math.ceil(total / 50)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </StyledBtn>
          </div>
        </div>
      </StyledCard>
    </div>
  );
};

// ==================== REPORTS TAB ====================

const ReportsTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [userGrowth, setUserGrowth] = useState<any[]>([]);
  const [resourceUsage, setResourceUsage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [growth, usage] = await Promise.all([
          adminService.getUserGrowthReport(6),
          adminService.getResourceUsageReport(),
        ]);
        setUserGrowth(growth);
        setResourceUsage(usage);
      } catch {
        toast.error("Failed to load reports");
      } finally {
        setLoading(false);
      }
    })();
  }, [toast]);

  if (loading)
    return (
      <div className="py-12 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <StyledCard
          title="User Growth (Last 6 Months)"
          icon={<TrendingUp size={18} />}
        >
          <div className="space-y-3">
            {userGrowth.map((month) => (
              <div key={month.month} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 dark:text-slate-400 w-20">
                  {month.month}
                </span>
                <div className="flex-1 h-8 bg-gray-100 dark:bg-slate-700/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{
                      width: `${Math.min((month.students / 100) * 100, 100)}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white w-16 text-right">
                  {month.students} users
                </span>
              </div>
            ))}
          </div>
        </StyledCard>

        {/* Resource Usage by Type */}
        <StyledCard title="Resources by Type" icon={<FileText size={18} />}>
          <div className="space-y-3">
            {resourceUsage?.byType?.map((item: any) => (
              <div
                key={item.resourceType}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg"
              >
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {item.resourceType || "Uncategorized"}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {item.count || 0} files
                  </span>
                  <StyledBadge className="bg-blue-100 text-blue-700">
                    {item.totalDownloads || 0} downloads
                  </StyledBadge>
                </div>
              </div>
            ))}
          </div>
        </StyledCard>
      </div>

      {/* Export Actions */}
      <StyledCard title="Export Reports" icon={<Download size={18} />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StyledBtn
            variant="secondary"
            onClick={() => toast.info("PDF export coming soon")}
          >
            <FileText size={16} className="mr-2" /> Export as PDF
          </StyledBtn>
          <StyledBtn
            variant="secondary"
            onClick={() => toast.info("CSV export coming soon")}
          >
            <FileText size={16} className="mr-2" /> Export as CSV
          </StyledBtn>
          <StyledBtn
            variant="secondary"
            onClick={() => toast.info("Excel export coming soon")}
          >
            <FileText size={16} className="mr-2" /> Export as Excel
          </StyledBtn>
        </div>
      </StyledCard>
    </div>
  );
};

// ==================== SYSTEM TAB ====================

const SystemTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const { systemService } = await import("@services/systemService");
      const res = await systemService.getStatus();
      if (res.success && res.data) {
        setSystemStatus(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch system status:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const handleAction = async (action: string) => {
    try {
      setActionLoading(action);
      setMessage(null);
      const { systemService } = await import("@services/systemService");
      const res = await systemService.performAction(action);
      if (res.success) {
        setMessage({
          type: "success",
          text: res.message || "Action completed successfully",
        });
      } else {
        setMessage({
          type: "error",
          text: (res as any).error || "Action failed",
        });
      }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "An unexpected error occurred",
      });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading && !systemStatus)
    return (
      <div className="py-12 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
        <p className="mt-4 text-gray-500">Fetching live system metrics...</p>
      </div>
    );

  const status = systemStatus || {
    apiStatus: "Unknown",
    database: "Unknown",
    cache: "Unknown",
    storage: "Unknown",
    uptime: "Unknown",
    lastBackup: "Unknown",
  };

  const MetricCard = ({
    icon: Icon,
    label,
    value,
    statusColor,
  }: {
    icon: any;
    label: string;
    value: string;
    statusColor: string;
  }) => (
    <div
      className={`relative group p-6 rounded-2xl border border-white/20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-10 blur-2xl rounded-full ${statusColor === "green" ? "bg-green-500" : statusColor === "blue" ? "bg-blue-500" : "bg-amber-500"}`}
      ></div>
      <div className="flex justify-between items-start relative z-10">
        <div
          className={`p-3 rounded-xl ${statusColor === "green" ? "bg-green-100 dark:bg-green-900/30 text-green-600" : statusColor === "blue" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600" : "bg-amber-100 dark:bg-amber-900/30 text-amber-600"}`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2 h-2 rounded-full ${statusColor === "green" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" : statusColor === "blue" ? "bg-blue-500" : "bg-amber-500"}`}
          ></div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Live
          </span>
        </div>
      </div>
      <div className="mt-4 relative z-10">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {label}
        </h3>
        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );

  const ActionCard = ({
    icon: Icon,
    title,
    description,
    action,
    loadingKey,
    label,
  }: {
    icon: any;
    title: string;
    description: string;
    action: string;
    loadingKey: string;
    label: string;
  }) => (
    <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900 dark:text-white">
            {title}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {description}
          </p>
          <div className="mt-4">
            <StyledBtn
              variant="secondary"
              size="sm"
              onClick={() => handleAction(action)}
              disabled={!!actionLoading}
              className="w-full justify-center gap-2"
            >
              {actionLoading === loadingKey ? (
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-500" />
              ) : (
                <>
                  <Zap className="w-4 h-4 transition-transform group-hover:scale-125" />
                  {label}
                </>
              )}
            </StyledBtn>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {message && (
        <div
          className={`p-4 rounded-xl font-medium text-sm flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
              : "bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}
          />
          {message.text}
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          icon={Activity}
          label="API Availability"
          value={status.apiStatus}
          statusColor={status.apiStatus === "Operational" ? "green" : "amber"}
        />
        <MetricCard
          icon={Database}
          label="Database Connectivity"
          value={status.database}
          statusColor={status.database === "Healthy" ? "green" : "amber"}
        />
        <MetricCard
          icon={Cpu}
          label="Caching Layer"
          value={status.cache}
          statusColor="blue"
        />
        <MetricCard
          icon={HardDrive}
          label="Disk Resource"
          value={status.storage}
          statusColor="blue"
        />
        <MetricCard
          icon={Clock}
          label="System Uptime"
          value={status.uptime}
          statusColor="green"
        />
        <MetricCard
          icon={ShieldCheck}
          label="Last Data Backup"
          value={status.lastBackup}
          statusColor="blue"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* System Operations Pane */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
              <Settings className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              System Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActionCard
              icon={Zap}
              title="Optimize Database"
              description="Re-index tables and vacuum dead space to improve query performance."
              action="optimize_db"
              loadingKey="optimize_db"
              label="Run Optimization"
            />
            <ActionCard
              icon={Trash2}
              title="Purge System Cache"
              description="Clear all temporary application cache and force re-fetch."
              action="clear_cache"
              loadingKey="clear_cache"
              label="Clear Cache"
            />
            <ActionCard
              icon={Download}
              title="Generate Snapshot"
              description="Create a full database snapshot and store it in cloud storage."
              action="backup"
              loadingKey="backup"
              label="Run Backup"
            />
            <ActionCard
              icon={FileText}
              title="Export Logs"
              description="Package and download the last 24 hours of system event logs."
              action="logs"
              loadingKey="logs"
              label="Export Logs"
            />
          </div>
        </div>

        {/* Configuration Space */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Quick Config
            </h2>
          </div>

          <StyledCard>
            <div className="space-y-5">
              <StyledInput
                label="Max Upload (MB)"
                type="number"
                defaultValue="100"
              />
              <StyledInput
                label="Session (Min)"
                type="number"
                defaultValue="30"
              />
              <div className="pt-2">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer group">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Maintenance Mode
                  </span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all"
                  />
                </label>
              </div>
              <StyledBtn variant="primary" className="w-full">
                Save Changes
              </StyledBtn>
            </div>
          </StyledCard>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

const TABS: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "content", label: "Content", icon: FileText },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "permissions", label: "Permissions", icon: ShieldCheck },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "audit", label: "Audit Logs", icon: Activity },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "system", label: "System", icon: Server },
];

export const SuperAdminManagementPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const toast = useToast();

  return (
    <DashboardLayout
      title="Management Panel"
      subtitle="Complete platform administration & analytics"
    >
      <div className="space-y-6">
        <DashboardTopTabNav
          tabs={TABS.map(({ id, label, icon }) => ({ id, label, icon }))}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as TabType)}
        />

        {/* Tab Content */}
        <div className="animate-fadeIn">
          {activeTab === "overview" && <OverviewTab toast={toast} />}
          {activeTab === "users" && <UsersTab toast={toast} />}
          {activeTab === "content" && <ContentTab toast={toast} />}
          {activeTab === "announcements" && <AnnouncementsTab toast={toast} />}
          {activeTab === "permissions" && <PermissionsTab toast={toast} />}
          {activeTab === "settings" && <SettingsTab toast={toast} />}
          {activeTab === "audit" && <AuditTab toast={toast} />}
          {activeTab === "reports" && <ReportsTab toast={toast} />}
          {activeTab === "system" && <SystemTab toast={toast} />}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminManagementPanel;
