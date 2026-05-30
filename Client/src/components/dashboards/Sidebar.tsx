import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@store/authStore";
import {
  LayoutDashboard,
  PenTool,
  BarChart3,
  User,
  X,
  Settings,
  Megaphone,
  CreditCard,
  ShieldCheck,
  School,
  GraduationCap,
  FileText,

} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onClose,
  collapsed = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();


  const shouldShowQuizzes = !(
    user?.studentType === "university" &&
    (user?.universityLevel === "senior" || user?.universityLevel === "gc")
  );

  const studentNavItems = [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, emoji: "📊" },
    ...(shouldShowQuizzes ? [{ label: "My Quizzes", path: "/student/quizzes", icon: <PenTool className="w-5 h-5" />, emoji: "✏️" }] : []),
    { label: "Progress", path: "/student/progress", icon: <BarChart3 className="w-5 h-5" />, emoji: "📈" },
    { label: "Payments", path: "/student/payments", icon: <CreditCard className="w-5 h-5" />, emoji: "💳" },
    { label: "Profile", path: "/student/profile", icon: <User className="w-5 h-5" />, emoji: "👤" },
    { label: "Promotions", path: "/student/promotions", icon: <Megaphone className="w-5 h-5" />, emoji: "📢" },
  ];

  const adminNavItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard, desc: "Overview & stats" },
    { label: "Reports", path: "/admin/reports", icon: FileText, desc: "Data & exports" },
    { label: "Promotion", path: "/admin/promotion", icon: Megaphone, desc: "Student promotions" },
    { label: "Settings", path: "/admin/settings", icon: Settings, desc: "Configure platform" },
    { label: "Profile", path: "/admin/profile", icon: User, desc: "Your account" },
  ];

  const superAdminNavItems = [
    { label: "Overview", path: "/superadmin/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, emoji: "📊", section: "main" },
    { label: "High School View", path: "/superadmin/highschool-view", icon: <School className="w-5 h-5" />, emoji: "🏫", section: "dashboard" },
    { label: "University View", path: "/superadmin/university-view", icon: <GraduationCap className="w-5 h-5" />, emoji: "🎓", section: "dashboard" },
    { label: "Admin View", path: "/superadmin/admin-view", icon: <LayoutDashboard className="w-5 h-5" />, emoji: "📊", section: "dashboard" },
    { label: "Security", path: "/superadmin/security", icon: <ShieldCheck className="w-5 h-5" />, emoji: "🔒", section: "dashboard" },
    { label: "Management", path: "/superadmin/management", icon: <Settings className="w-5 h-5" />, emoji: "⚙️", section: "dashboard" },
    { label: "Profile", path: "/superadmin/profile", icon: <User className="w-5 h-5" />, emoji: "👤", section: "dashboard" },
  ];

  const isSuperAdmin = user?.role === "super_admin";
  const isAdmin = user?.role === "admin";

  const handleNav = (path: string, tab?: string) => {
    if (tab) { navigate(path, { state: { activeTab: tab } }); }
    else { navigate(path); }
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col h-full bg-[#0B1121] transition-all duration-300 overflow-hidden w-full">
      {onClose && (
        <button onClick={onClose} className="lg:hidden absolute top-4 right-4 p-2 text-slate-500 hover:bg-slate-800 rounded-lg transition-colors z-10">
          <X className="w-5 h-5" />
        </button>
      )}

      {/* User Profile Section */}
      {isAdmin && !collapsed && (
        <div className="relative px-4 pt-6 pb-4">
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/20 ring-2 ring-white/10">
                {user?.name?.split(" ").map(n => n.charAt(0).toUpperCase()).slice(0, 2).join("")}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0B1121]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || "Admin"}</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Administrator</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className={`flex-1 overflow-y-auto custom-scrollbar ${isAdmin ? "px-2" : ""}`}>
        {isSuperAdmin ? (
          <>
            {superAdminNavItems.filter(i => i.section === "main").map(item => {
              const isActive = location.pathname === item.path;
              return <NavButton key={item.path} item={item} isActive={isActive} collapsed={collapsed} onClick={() => handleNav(item.path)} />;
            })}
            {!collapsed && (
              <div className="px-3 md:px-5 pt-3 pb-1 border-t border-slate-700/30 mt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Views</span>
              </div>
            )}
            {superAdminNavItems.filter(i => i.section === "dashboard").map(item => {
              const isActive = location.pathname === item.path;
              return <NavButton key={item.label} item={item} isActive={isActive} collapsed={collapsed} onClick={() => handleNav(item.path, (item as any).tab)} />;
            })}
          </>
        ) : isAdmin ? (
          <div className="space-y-1 pt-2">
            {adminNavItems.map(item => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  title={collapsed ? item.label : undefined}
                  className={`group relative w-full flex items-center gap-3 rounded-xl py-2.5 px-3 transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/10 text-white shadow-sm shadow-blue-500/5"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-blue-400 to-indigo-500 shadow-sm shadow-blue-500/30" />
                  )}
                  <span className={`flex-shrink-0 transition-all duration-200 ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  {!collapsed && (
                    <div className="flex flex-col items-start min-w-0">
                      <span className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${isActive ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">{item.desc}</span>
                    </div>
                  )}
                  {isActive && !collapsed && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400/50" />
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-xs font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-50 pointer-events-none shadow-xl border border-white/5">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="pt-2">
            {studentNavItems.map(item => {
              const isActive = location.pathname === item.path;
              return <NavButton key={item.path} item={item} isActive={isActive} collapsed={collapsed} onClick={() => handleNav(item.path)} />;
            })}
          </div>
        )}
      </nav>


    </div>
  );
};

function NavButton({ item, isActive, collapsed, onClick }: {
  item: any;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={`w-full flex items-center gap-3 md:gap-4 py-2.5 md:py-3.5 transition-all duration-200 group relative
        ${isActive ? "bg-blue-400 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}
        ${collapsed ? "justify-center px-0" : "px-3 md:px-5"}
      `}
    >
      <span className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : ""}`}>
        <div className="w-4 h-4 md:w-5 md:h-5">{item.icon}</div>
      </span>
      {!collapsed && (
        <span className="text-xs md:text-sm font-semibold tracking-tight truncate">{item.label}</span>
      )}
      {collapsed && (
        <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-50 pointer-events-none shadow-lg">
          {item.label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
        </div>
      )}
    </button>
  );
}
