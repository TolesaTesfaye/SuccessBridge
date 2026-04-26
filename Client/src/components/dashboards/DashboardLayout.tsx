import React, { useState } from "react";
import { useAuthStore } from "@store/authStore";
import { useThemeStore } from "@store/themeStore";
import { useNavigate } from "react-router-dom";
import { Footer } from "@components/common/Footer";
import { Menu } from "lucide-react";
import { AppLogo } from "@components/common/AppLogo";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: React.ReactNode;
  headerNav?: React.ReactNode;
  noPadding?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
  headerNav,
  noPadding = false,
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1c] flex flex-col transition-colors duration-300 overflow-hidden h-screen">
      {/* 1. Full-Width Header at the Top */}
      <header className="h-12 md:h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-2 md:px-3 flex-shrink-0 z-40 transition-colors duration-300 shadow-sm">
        <div className="flex items-center gap-2 md:gap-4">
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
            className="lg:hidden p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all active:scale-95"
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
            <div className="flex items-center gap-1 ml-2 md:ml-4 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              {headerNav}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {/* Theme Toggle */}
          <div className="flex items-center pr-1 md:pr-2 border-r dark:border-white/5">
            <button
              onClick={useThemeStore.getState().toggleTheme}
              className="p-1 md:p-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors active:scale-95"
              aria-label="Toggle theme"
            >
              {useThemeStore.getState().isDark ? (
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.12-2.12a1 1 0 00-1.414 0l-.707.707a1 1 0 000 1.414l2.12 2.12a1 1 0 001.414 0l.707-.707a1 1 0 000-1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM9 4a1 1 0 100-2 1 1 0 000 2zm6.464 12.05l-2.12-2.12a1 1 0 10-1.414 1.414l2.12 2.12a1 1 0 001.414-1.414l-.707-.707a1 1 0 000-1.414zM9 16a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-1 md:gap-2 pl-1 md:pl-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-[10px] md:text-sm font-bold shadow-lg shadow-blue-500/20">
              {user?.name?.split(' ').map(n => n.charAt(0).toUpperCase()).slice(0, 2).join('')}
            </div>
          </div>

          {/* Logout */}
          <div className="flex items-center pl-1 md:pl-2 border-l border-slate-100 dark:border-white/5">
            <button
              onClick={handleLogout}
              className="px-1.5 md:px-3 py-0.5 md:py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-lg transition-all duration-300 font-semibold text-[8px] md:text-xs uppercase tracking-wide border border-rose-500/20 hover:border-rose-500"
              title="Sign Out"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Container for Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`hidden lg:block flex-shrink-0 z-30 transition-all duration-300 ${isSidebarCollapsed ? "w-16" : "w-48"} bg-[#0B1121] overflow-hidden`}
        >
          <Sidebar collapsed={isSidebarCollapsed} />
        </aside>

        <div
          className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside
            className={`absolute inset-y-0 left-0 w-64 md:w-72 bg-white dark:bg-slate-900 transition-transform duration-300 shadow-2xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </aside>
        </div>

        <main className="flex-1 overflow-y-auto custom-scrollbar w-full">
          <div className="w-full pt-4 md:pt-6">
            {children}
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};
