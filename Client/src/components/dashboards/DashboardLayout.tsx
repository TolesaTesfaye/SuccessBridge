import React, { useState } from "react";
import { useAuthStore } from "@store/authStore";
import { useThemeStore } from "@store/themeStore";
import { useNavigate } from "react-router-dom";
import { Footer } from "@components/common/Footer";
import { Menu } from "lucide-react";
import { AppLogo } from "@components/common/AppLogo";
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
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  headerNav,
  noPadding = false,
  showFooter = true,
  disableTopPadding = false,
}) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1c] flex flex-col transition-colors duration-300 overflow-hidden h-screen m-0 p-0">
      {/* 1. Full-Width Header at the Top */}
      <header className="h-12 md:h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-0 md:px-3 flex-shrink-0 z-30 transition-colors duration-300 shadow-sm">
        <div className="flex items-center gap-1 md:gap-4">
          {/* Logo - Mobile First */}
          <div
            className="flex lg:hidden items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
            title="Go to Home"
          >
            <AppLogo size="sm" />
          </div>

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

          {/* Menu Button - Mobile */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all active:scale-95"
          >
            <Menu className="w-4 h-4" />
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
            <div className="flex items-center gap-1 ml-1 md:ml-4 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              {headerNav}
            </div>
          )}
        </div>

        <div className="flex items-center gap-0.5 md:gap-2">
          {/* Notifications */}
          <div className="flex items-center">
            <NotificationBell />
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <button
              onClick={useThemeStore.getState().toggleTheme}
              className="p-1.5 md:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-95"
              aria-label="Toggle theme"
            >
              {useThemeStore.getState().isDark ? (
                // Sun icon for dark mode (click to go light)
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                // Moon icon for light mode (click to go dark)
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-0.5 md:gap-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-[10px] md:text-sm font-bold shadow-lg shadow-blue-500/20">
              {user?.name
                ?.split(" ")
                .map((n) => n.charAt(0).toUpperCase())
                .slice(0, 2)
                .join("")}
            </div>
          </div>

          {/* Logout */}
          <div className="flex items-center">
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
          className={`hidden lg:block flex-shrink-0 z-30 transition-all duration-300 ${isSidebarCollapsed ? "w-16" : "w-48"} bg-[#0B1121] overflow-hidden m-0 p-0`}
        >
          <Sidebar collapsed={isSidebarCollapsed} />
        </aside>

        <div
          className={`absolute inset-0 z-[100] transition-opacity duration-300 lg:hidden ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside
            className={`absolute top-0 bottom-0 left-0 w-56 md:w-64 bg-white dark:bg-slate-900 transition-transform duration-300 shadow-2xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </aside>
        </div>

        <main
          className={
            `flex-1 w-full m-0 p-0 bg-[#f1f1f1] dark:bg-slate-900 min-h-0 min-w-0 ` +
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
    </div>
  );
};
