import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'
import { LayoutDashboard, PenTool, BarChart3, User, X, BarChart3 as VisualizationIcon, Settings, Info } from 'lucide-react'

interface SidebarProps {
    onClose?: () => void
    collapsed?: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose, collapsed = false }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuthStore()

    // Student navigation items
    const studentNavItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, emoji: '📊' },
        { label: 'My Quizzes', path: '/student/quizzes', icon: <PenTool className="w-5 h-5" />, emoji: '✏️' },
        { label: 'Progress', path: '/student/progress', icon: <BarChart3 className="w-5 h-5" />, emoji: '📈' },
        { label: 'Profile', path: '/student/profile', icon: <User className="w-5 h-5" />, emoji: '👤' },
    ]

    // Admin navigation items
    const adminNavItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, emoji: '📊' },
        { label: 'Resources', path: '/admin/resources', icon: <LayoutDashboard className="w-5 h-5" />, emoji: '📚' },
        { label: 'Students', path: '/admin/students', icon: <User className="w-5 h-5" />, emoji: '👥' },
        { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" />, emoji: '📈' },
        { label: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" />, emoji: '⚙️' },
    ]

    // Super Admin navigation items
    const superAdminNavItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, emoji: '📊' },
        { label: 'Visualize', path: '/superadmin/visualization', icon: <VisualizationIcon className="w-5 h-5" />, emoji: '📊' },
        { label: 'Settings', path: '/superadmin/settings', icon: <Settings className="w-5 h-5" />, emoji: '⚙️' },
        { label: 'About', path: '/superadmin/about', icon: <Info className="w-5 h-5" />, emoji: 'ℹ️' },
    ]

    // Select nav items based on user role
    const navItems = 
        user?.role === 'super_admin' ? superAdminNavItems :
        user?.role === 'admin' ? adminNavItems :
        studentNavItems

    const handleNav = (path: string) => {
        navigate(path)
        if (onClose) onClose()
    }

    return (
        <div className={`flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-white/5 transition-all duration-300 overflow-hidden ${collapsed ? 'w-0 border-none' : 'w-48'}`}>
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
            <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto custom-scrollbar">
                {!collapsed && (
                    <p className="px-3 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-3">
                        Main Menu
                    </p>
                )}
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                        <button
                            key={item.path}
                            onClick={() => handleNav(item.path)}
                            title={collapsed ? item.label : undefined}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                                ${isActive
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                }
                                ${collapsed ? 'justify-center' : ''}
                            `}
                        >
                            {/* Icon */}
                            <span className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : ''}`}>
                                {item.icon}
                            </span>

                            {/* Label */}
                            {!collapsed && (
                                <span className="text-sm font-semibold tracking-tight truncate">
                                    {item.label}
                                </span>
                            )}

                            {/* Active indicator bar */}
                            {isActive && !collapsed && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white/60 rounded-l-full" />
                            )}

                            {/* Tooltip on collapsed */}
                            {collapsed && (
                                <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 dark:bg-slate-700 text-white text-xs font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 whitespace-nowrap z-50 pointer-events-none shadow-lg">
                                    {item.label}
                                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800 dark:border-r-slate-700" />
                                </div>
                            )}
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}
