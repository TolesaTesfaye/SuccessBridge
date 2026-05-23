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
  BookOpen,
  Users,
  Building,
  ClipboardCheck,
  FileQuestion,
  BookMarked,
  Server,
  ShieldCheck,
  Megaphone,
  CreditCard,
  Sparkles,
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

  // Determine if the user should see the Quizzes nav item
  const shouldShowQuizzes = !(
    user?.studentType === "university" &&
    (user?.universityLevel === "senior" || user?.universityLevel === "gc")
  );

  // Student navigation items
  const studentNavItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      emoji: "📊",
    },
    {
      label: "AI Companion",
      path: "/student/ai-companion",
      icon: <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
      emoji: "🤖",
    },
    ...(shouldShowQuizzes
      ? [
          {
            label: "My Quizzes",
            path: "/student/quizzes",
            icon: <PenTool className="w-5 h-5" />,
            emoji: "✏️",
          },
        ]
      : []),
    {
      label: "Progress",
      path: "/student/progress",
      icon: <BarChart3 className="w-5 h-5" />,
      emoji: "📈",
    },
    {
      label: "Payments",
      path: "/student/payments",
      icon: <CreditCard className="w-5 h-5" />,
      emoji: "💳",
    },
    {
      label: "Profile",
      path: "/student/profile",
      icon: <User className="w-5 h-5" />,
      emoji: "👤",
    },
    {
      label: "Promotions",
      path: "/student/promotions",
      icon: <Megaphone className="w-5 h-5" />,
      emoji: "📢",
    },
  ];

  // Admin navigation items
  const adminNavItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      emoji: "📊",
    },
    {
      label: "Quizzes",
      path: "/admin/quizzes",
      icon: <FileQuestion className="w-5 h-5" />,
      emoji: "📝",
    },
    {
      label: "Analytics",
      path: "/admin/analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      emoji: "📈",
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
      emoji: "⚙️",
    },
    {
      label: "Promotion",
      path: "/admin/promotion",
      icon: <Megaphone className="w-5 h-5" />,
      emoji: "📢",
    },
  ];

  // Super Admin navigation items
  const superAdminNavItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      emoji: "📊",
    },
    {
      label: "Universities",
      path: "/superadmin/universities",
      icon: <Building className="w-5 h-5" />,
      emoji: "🏢",
    },
    {
      label: "Resources",
      path: "/superadmin/resources",
      icon: <BookOpen className="w-5 h-5" />,
      emoji: "📚",
    },
    {
      label: "Users",
      path: "/superadmin/users",
      icon: <Users className="w-5 h-5" />,
      emoji: "👥",
    },
    {
      label: "Admins",
      path: "/superadmin/admins",
      icon: <ShieldCheck className="w-5 h-5" />,
      emoji: "🛡️",
    },
    {
      label: "Analytics",
      path: "/superadmin/analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      emoji: "📈",
    },
    {
      label: "System",
      path: "/superadmin/system",
      icon: <Server className="w-5 h-5" />,
      emoji: "🖥️",
    },
    {
      label: "Settings",
      path: "/superadmin/settings",
      icon: <Settings className="w-5 h-5" />,
      emoji: "⚙️",
    },
    {
      label: "Promotion",
      path: "/superadmin/promotion",
      icon: <Megaphone className="w-5 h-5" />,
      emoji: "📢",
    },
  ];

  // Select nav items based on user role
  const navItems =
    user?.role === "super_admin"
      ? superAdminNavItems
      : user?.role === "admin"
        ? adminNavItems
        : studentNavItems;

  const handleNav = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div
      className={`flex flex-col h-full bg-white dark:bg-[#0B1121] transition-all duration-300 overflow-hidden w-full`}
    >
      {/* Mobile Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 pt-0 pb-2 md:pb-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 md:gap-4 py-2.5 md:py-3.5 transition-all duration-200 group relative
                                ${
                                  isActive
                                    ? "bg-blue-400 text-white"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }
                                ${collapsed ? "justify-center px-0" : "px-3 md:px-5"}
                            `}
            >
              {/* Icon */}
              <span
                className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : ""}`}
              >
                <div className="w-4 h-4 md:w-5 md:h-5">{item.icon}</div>
              </span>

              {/* Label */}
              {!collapsed && (
                <span className="text-xs md:text-sm font-semibold tracking-tight truncate">
                  {item.label}
                </span>
              )}

              {/* Active indicator bar - Removed as active item is full width blue now */}

              {/* Tooltip on collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 dark:bg-slate-700 text-white text-xs font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-50 pointer-events-none shadow-lg">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800 dark:border-r-slate-700" />
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
