import React, { useState } from 'react'
import { useAuthStore } from '@store/authStore'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '@components/common/ThemeToggle'
import { Footer } from '@components/common/Footer'
import { Menu, PanelLeftClose, PanelLeft, LogOut } from 'lucide-react'
import { AppLogo } from '@components/common/AppLogo'
import { Sidebar } from './Sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true) // Changed to true - collapsed by default

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1c] flex flex-col transition-colors duration-300 overflow-hidden h-screen">

      {/* 1. Full-Width Header at the Top */}
      <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-40 transition-colors duration-300 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all hover:scale-110 active:scale-95 border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            title={isSidebarCollapsed ? "Expand Navigation" : "Collapse Navigation"}
          >
            {isSidebarCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5 flex-shrink-0" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-95"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo on the left */}
          <div 
            className="hidden sm:flex items-center gap-3 border-r dark:border-white/5 pr-4 mr-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
            title="Go to Home"
          >
            <AppLogo size="lg" />
          </div>

          {/* Super Admin Navigation Menu - REMOVED */}
          {/* Navigation items removed as requested */}

        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center gap-2 pr-4 border-r dark:border-white/5">
            <ThemeToggle />
          </div>

          {/* Student Profile on the right */}
          <div className="flex items-center gap-3 pl-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-blue-500/20">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:flex flex-col min-w-0">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate tracking-tight">
                {user?.name}
              </h3>
              <p className="text-[10px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-widest truncate">
                {user?.role === 'student' ? 'Student Scholar' : user?.role}
              </p>
            </div>
          </div>

          {/* Header Sign Out */}
          <div className="flex items-center gap-2 pl-4 border-l border-slate-100 dark:border-white/5 mx-2">
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 px-4 py-2.5 bg-rose-500/5 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest border border-rose-500/20 hover:border-rose-500 shadow-sm hover:shadow-rose-500/25"
            >
              <LogOut className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Container for Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar - Desktop Popup Overlay */}
        {!isSidebarCollapsed && (
          <>
            {/* Backdrop */}
            <div 
              className="hidden lg:block fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 transition-opacity duration-300"
              onClick={() => setIsSidebarCollapsed(true)}
            />
            {/* Sidebar Popup */}
            <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-48 z-40 shadow-2xl animate-slideInLeft">
              <Sidebar collapsed={false} />
            </aside>
          </>
        )}

        {/* Sidebar - Mobile Drawer */}
        <div
          className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <aside
            className={`absolute inset-y-0 left-0 w-48 bg-white dark:bg-slate-900 transition-transform duration-300 shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </aside>
        </div>

        {/* Main Content Area - Full Width */}
        <main className="flex-1 overflow-y-auto custom-scrollbar w-full">
          <div className="w-full p-4 pb-0">
            {children}
          </div>
          
          {/* Footer inside scrollable area */}
          <Footer />
        </main>
      </div>
    </div>
  )
}
