import React, { useState } from "react";
import { useAuthStore } from "@store/authStore";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@components/common/ThemeToggle";
import { Footer } from "@components/common/Footer";
import { Menu, LogOut } from "lucide-react";
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
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex p-1.5 md:p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:rounded-xl transition-all hover:scale-110 active:scale-95 border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            title={
              isSidebarCollapsed ? "Expand Navigation" : "Collapse Navigation"
            }
          >
            <Menu className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          </button>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-1.5 md:p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:rounded-xl transition-all active:scale-95"
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div
            className="hidden sm:flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
            title="Go to Home"
          >
            <AppLogo size="md" />
          </div>

          {/* Navigation Items - Medium position between left and center */}
          {headerNav && (
            <div className="flex items-center gap-1 ml-2 md:ml-4 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              {headerNav}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 md:gap-2">

          <div className="flex items-center gap-2 pr-2 md:pr-3 border-r dark:border-white/5">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-3">
            <div className="w-7 h-7 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-xs md:text-lg font-bold shadow-lg shadow-blue-500/20">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col min-w-0">
              <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white truncate tracking-tight">
                {(() => {
                  const nameParts = user?.name?.split(' ') || [];
                  if (nameParts.length >= 2) {
                    return `${nameParts[0]}.${nameParts[1].charAt(0)}`;
                  }
                  return user?.name;
                })()}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 pl-2 md:pl-3 border-l border-slate-100 dark:border-white/5">
            <button
              onClick={handleLogout}
              className="group flex items-center gap-1.5 px-2 md:px-3 py-1.5 md:py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-lg transition-all duration-300 font-semibold text-xs uppercase tracking-wide border border-rose-500/20 hover:border-rose-500"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span className="hidden md:inline">Sign Out</span>
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
            className={`absolute inset-y-0 left-0 w-48 bg-white dark:bg-slate-900 transition-transform duration-300 shadow-2xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </aside>
        </div>

        <main className="flex-1 overflow-y-auto custom-scrollbar w-full">
          <div className="w-full">
            {children}
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};
