import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@store/authStore";
import { useThemeStore } from "@store/themeStore";
import { useNavigate } from "react-router-dom";
import { Footer } from "@components/common/Footer";
import { Menu, Bell, Moon, Sun, LogOut, User, ChevronDown } from "lucide-react";
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
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const { isDark, toggleTheme } = useThemeStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1c] flex flex-col transition-colors duration-300 overflow-hidden h-screen m-0 p-0">
      {/* 1. Full-Width Header at the Top */}
      <header className="h-12 md:h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-0 md:px-3 flex-shrink-0 z-30 transition-colors duration-300 shadow-sm">
        <div className="flex items-center flex-1 gap-1 md:gap-4">
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
            <div className="flex items-center gap-1 ml-1 md:ml-4 lg:absolute lg:left-1/2 lg:-translate-x-1/2 w-full sm:w-auto">
              {headerNav}
            </div>
          )}
        </div>

        <div className="flex items-center gap-0.5 md:gap-2">
          {/* Notifications - Desktop only */}
          <div className="hidden md:flex items-center">
            <NotificationBell />
          </div>

          {/* Theme Toggle - Desktop only */}
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

          {/* Profile Dropdown - Mobile only */}
          <div className="md:hidden relative" ref={profileDropdownRef}>
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-1 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold shadow-lg shadow-blue-500/20">
                {user?.name
                  ?.split(" ")
                  .map((n) => n.charAt(0).toUpperCase())
                  .slice(0, 2)
                  .join("")}
              </div>
              <ChevronDown className="w-3 h-3 text-slate-500 dark:text-slate-400" />
            </button>

            {/* Dropdown Menu - Mobile only */}
            {isProfileDropdownOpen && (
              <>
                {/* Backdrop for mobile */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileDropdownOpen(false)}
                />
                
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                  {/* User Info */}
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n.charAt(0).toUpperCase())
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white truncate text-sm">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 capitalize truncate">
                          {user?.role.replace("_", " ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {/* Notification - Mobile only */}
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        // Navigate to notifications or trigger notification bell
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Bell className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span>Notifications</span>
                    </button>

                    {/* Dark Mode Toggle - Mobile only */}
                    <button
                      onClick={() => {
                        toggleTheme();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      {isDark ? (
                        <>
                          <Sun className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </button>

                    {/* Profile */}
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        navigate(`/${user?.role}/profile`);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span>My Profile</span>
                    </button>

                    {/* Divider */}
                    <div className="my-2 border-t border-slate-200 dark:border-slate-700" />

                    {/* Logout */}
                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
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
