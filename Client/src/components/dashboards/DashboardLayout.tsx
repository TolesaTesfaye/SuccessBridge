import React, { useEffect, useState } from "react";
import { useAuthStore } from "@store/authStore";
import { useThemeStore } from "@store/themeStore";
import { useNavigate } from "react-router-dom";
import { Footer } from "@components/common/Footer";
import { Menu, Moon, Sun } from "lucide-react";
import { AppLogo } from "@components/common/AppLogo";
import { MobileBottomNav } from "@components/common/MobileBottomNav";
import { Sidebar } from "./Sidebar";
import NotificationBell from "@components/notifications/NotificationBell";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: React.ReactNode;
  headerNav?: React.ReactNode;
  noPadding?: boolean;
  showFooter?: boolean;
  disableTopPadding?: boolean;
  mobileNavActiveTab?: "home" | "learning" | "hub";
  onMobileNavTabChange?: (tab: "home" | "learning" | "hub") => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  headerNav,
  noPadding = false,
  showFooter = true,
  disableTopPadding = false,
  mobileNavActiveTab = "home",
  onMobileNavTabChange,
}) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const showMobileBottomNav =
    user?.role === "student" ||
    user?.role === "admin" ||
    user?.role === "super_admin";
  const mobileNavVariant = user?.role === "student" ? "student" : "admin";
  const mobileProfilePath =
    user?.role === "super_admin" ? "/superadmin/profile" : "/admin/profile";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem('superadmin-sidebar-width');
    return saved ? parseInt(saved, 10) : 192; // Default 192px (w-48)
  });
  const [isResizing, setIsResizing] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();

  useEffect(() => {
    const handleMobileMenuOpen = () => setIsSidebarOpen(true);
    window.addEventListener("successbridge:open-sidebar", handleMobileMenuOpen);
    return () =>
      window.removeEventListener(
        "successbridge:open-sidebar",
        handleMobileMenuOpen,
      );
  }, []);

  // Handle sidebar resize
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const minWidth = 64; // w-16 collapsed
      const maxWidth = 600; // Allow stretching over main content
      const newWidth = Math.min(Math.max(e.clientX, minWidth), maxWidth);
      
      setSidebarWidth(newWidth);
      
      // Auto-collapse/expand based on width
      if (newWidth < 100) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      localStorage.setItem('superadmin-sidebar-width', sidebarWidth.toString());
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, sidebarWidth]);

  // Update cursor style when resizing
  useEffect(() => {
    if (isResizing) {
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  }, [isResizing]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleMobileNavTabChange = (tab: "home" | "learning" | "hub") => {
    if (onMobileNavTabChange) {
      onMobileNavTabChange(tab);
      return;
    }

    navigate("/dashboard", tab === "home" ? undefined : { state: { activeTab: tab } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1c] flex flex-col transition-colors duration-300 overflow-hidden h-screen m-0 p-0">
      {/* 1. Full-Width Header at the Top */}
      <header className="hidden md:flex h-12 md:h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 items-center justify-between px-0 md:px-3 flex-shrink-0 z-30 transition-colors duration-300 shadow-sm">
        <div className="flex items-center flex-1 gap-1 md:gap-4">
          {/* Collapse Button - Desktop */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex p-1.5 md:p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:rounded-xl transition-all hover:scale-110 active:scale-95 border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            title={
              isSidebarCollapsed ? "Expand Navigation" : "Collapse Navigation"
            }
          >
            <Menu className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          </button>

          {/* Logo - Desktop */}
          <div
            className="hidden lg:flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
            title="Go to Home"
          >
            <AppLogo size="md" />
          </div>

          {/* Navigation Items */}
          {headerNav && (
            <div className="flex items-center gap-1 ml-1 md:ml-4 lg:absolute lg:left-1/2 lg:-translate-x-1/2 w-full sm:w-auto">
              {headerNav}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {/* Notifications - Desktop header */}
          <div className="hidden md:flex items-center">
            <NotificationBell />
          </div>

          {/* Theme Toggle - Desktop header */}
          <div className="hidden md:flex items-center">
            <button
              onClick={toggleTheme}
              className="p-1.5 md:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-95"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Moon className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </button>
          </div>

          {/* Profile - Desktop only shows avatar without dropdown */}
          <div className="hidden md:flex items-center gap-0.5 md:gap-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-[10px] md:text-sm font-bold shadow-lg shadow-blue-500/20">
              {user?.name
                ?.split(" ")
                .map((n) => n.charAt(0).toUpperCase())
                .slice(0, 2)
                .join("")}
            </div>
          </div>

          {/* Logout - Desktop only */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="px-1.5 md:px-3 py-1 md:py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-lg transition-all duration-300 font-semibold text-[9px] md:text-xs normal-case tracking-normal border border-rose-500/20 hover:border-rose-500 h-7 md:h-auto"
              title="Sign Out"
            >
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Container for Sidebar and Main Content - No Gap */}
      <div className="flex flex-1 overflow-hidden m-0 p-0 gap-0 relative">
        <aside
          style={{ width: isSidebarCollapsed ? '64px' : `${sidebarWidth}px` }}
          className={`hidden lg:block flex-shrink-0 z-30 transition-all duration-300 ${
            isResizing ? '' : 'transition-all'
          } bg-[#0B1121] overflow-hidden m-0 p-0 relative group`}
        >
          <Sidebar collapsed={isSidebarCollapsed} />
          
          {/* Resize Handle */}
          {!isSidebarCollapsed && (
            <div
              onMouseDown={() => setIsResizing(true)}
              className="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-transparent hover:bg-blue-500/50 transition-colors group-hover:bg-blue-500/20 z-40"
              title="Drag to resize sidebar"
            >
              <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1 h-20 bg-blue-500/50 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </aside>

        <div
          className={`absolute inset-0 z-[100] transition-opacity duration-300 lg:hidden ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside
            className={`absolute top-0 bottom-0 left-0 w-48 md:w-52 bg-white dark:bg-slate-900 transition-transform duration-300 shadow-2xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </aside>
        </div>

        <main
          className={
            `flex-1 w-full m-0 p-0 bg-[#f1f1f1] dark:bg-slate-900 min-h-0 min-w-0 ${showMobileBottomNav ? "pb-16 md:pb-0" : ""} ` +
            (noPadding ? "overflow-hidden" : "overflow-y-auto custom-scrollbar")
          }
        >
          {noPadding ? (
            // For noPadding mode (like learning center), render children directly
            <>{children}</>
          ) : (
            // For normal mode, use proper spacing for footer
            <div className="min-h-full flex flex-col">
              <div
                className={`flex-1 ${disableTopPadding ? "" : "pt-1 md:pt-2"} pl-1 md:pl-2`}
              >
                {children}
              </div>
              {showFooter && (
                <div className="mt-auto">
                  <Footer />
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      {showMobileBottomNav && (
        <MobileBottomNav
          activeTab={mobileNavActiveTab}
          onTabChange={handleMobileNavTabChange}
          variant={mobileNavVariant}
          onProfileClick={() => navigate(mobileProfilePath)}
        />
      )}
    </div>
  );
};
