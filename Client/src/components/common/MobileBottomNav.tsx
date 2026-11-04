import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, BookOpen, Library, User, Bell, Moon, Sun, LogOut, Menu } from 'lucide-react'
import { useAuthStore } from '@store/authStore'
import { useThemeStore } from '@store/themeStore'
import NotificationBell from '@components/notifications/NotificationBell'

interface MobileBottomNavProps {
  activeTab: 'home' | 'learning' | 'hub'
  onTabChange: (tab: 'home' | 'learning' | 'hub') => void
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const { isDark, toggleTheme } = useThemeStore()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileMenuOpen])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const tabs = [
    { id: 'home' as const, label: 'Home', shortLabel: 'Home', icon: Home, color: 'emerald' },
    { id: 'learning' as const, label: 'Learning Center', shortLabel: 'Learning', icon: BookOpen, color: 'blue' },
    { id: 'hub' as const, label: 'Resource Hub', shortLabel: 'Resources', icon: Library, color: 'violet' },
  ]

  const getColorClasses = (color: string, isActive: boolean, isHover: boolean = false) => {
    const colors: Record<string, any> = {
      emerald: {
        activeBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
        activeShadow: 'shadow-md shadow-emerald-500/40',
        activeGlow: 'from-emerald-600/15 via-emerald-500/8',
        activeIndicator: 'bg-emerald-400',
        activeLabel: 'text-emerald-400',
        hoverBg: 'group-hover:from-emerald-500/80 group-hover:to-emerald-600/80',
        hoverLabel: 'group-hover:text-emerald-300',
        hoverIcon: 'group-hover:text-emerald-100'
      },
      blue: {
        activeBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
        activeShadow: 'shadow-md shadow-blue-500/40',
        activeGlow: 'from-blue-600/15 via-blue-500/8',
        activeIndicator: 'bg-blue-400',
        activeLabel: 'text-blue-400',
        hoverBg: 'group-hover:from-blue-500/80 group-hover:to-blue-600/80',
        hoverLabel: 'group-hover:text-blue-300',
        hoverIcon: 'group-hover:text-blue-100'
      },
      violet: {
        activeBg: 'bg-gradient-to-br from-violet-500 to-violet-600',
        activeShadow: 'shadow-md shadow-violet-500/40',
        activeGlow: 'from-violet-600/15 via-violet-500/8',
        activeIndicator: 'bg-violet-400',
        activeLabel: 'text-violet-400',
        hoverBg: 'group-hover:from-violet-500/80 group-hover:to-violet-600/80',
        hoverLabel: 'group-hover:text-violet-300',
        hoverIcon: 'group-hover:text-violet-100'
      }
    }

    if (!isActive) {
      return {
        bg: `bg-slate-800/30 ${colors[color].hoverBg}`,
        icon: `text-slate-500 ${colors[color].hoverIcon}`,
        label: `text-slate-500 ${colors[color].hoverLabel}`,
        shadow: '',
        glow: '',
        indicator: ''
      }
    }

    return {
      bg: colors[color].activeBg,
      icon: 'text-white',
      label: colors[color].activeLabel,
      shadow: colors[color].activeShadow,
      glow: colors[color].activeGlow,
      indicator: colors[color].activeIndicator
    }
  }

  return (
    <nav ref={navRef} className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900/95 backdrop-blur-lg border-t border-slate-700/30 z-50 shadow-xl">
      {/* Subtle glow effect on top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
      
      <div className="flex items-center justify-around px-1 py-0.5 pb-safe max-w-md mx-auto">
        <button
          onClick={() => window.dispatchEvent(new Event('successbridge:open-sidebar'))}
          className="relative flex flex-1 flex-col items-center justify-center rounded-lg px-0.5 py-0.5 text-slate-500 transition-all active:scale-95 hover:bg-slate-800/20 hover:text-slate-300"
          aria-label="Open navigation menu"
        >
          <div className="mb-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800/30">
            <Menu className="h-4 w-4" />
          </div>
          <span className="text-[8px] font-medium tracking-wide">Menu</span>
        </button>

        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          const colors = getColorClasses(tab.color, isActive)

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-0.5 px-0.5 rounded-lg transition-all duration-300 ease-out group ${
                isActive
                  ? 'scale-105'
                  : 'active:scale-95 hover:bg-slate-800/20'
              }`}
            >
              {/* Active background glow - more subtle */}
              {isActive && (
                <div className={`absolute inset-0 bg-gradient-to-t ${colors.glow} to-transparent rounded-lg blur-sm opacity-50`} />
              )}
              
              {/* Icon container - smaller size */}
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-lg mb-0.5 transition-all duration-300 transform ${colors.bg} ${
                  isActive
                    ? `${colors.shadow} scale-105`
                    : 'group-active:scale-90'
                }`}
              >
                {/* Inner glow for active state */}
                {isActive && (
                  <div className="absolute inset-[1px] rounded-[7px] bg-white/5 backdrop-blur-sm" />
                )}
                
                <Icon
                  className={`relative z-10 w-4 h-4 transition-all duration-300 ${colors.icon}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              
              {/* Label - smaller text */}
              <span
                className={`text-[8px] font-medium tracking-wide transition-all duration-300 ${colors.label}`}
              >
                {tab.shortLabel}
              </span>
              
              {/* Active indicator line at top - thinner */}
              {isActive && (
                <div className={`absolute -top-[1px] left-1/2 -translate-x-1/2 w-6 h-0.5 ${colors.indicator} rounded-b-full opacity-80`} />
              )}
            </button>
          )
        })}
        <div className="relative flex-1">
          {isProfileMenuOpen && (
            <div className="absolute bottom-full right-1 mb-2 w-52 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-2xl">
              <div className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800">
                <Bell className="h-4 w-4 text-slate-400" />
                <span className="flex-1">Notifications</span>
                <NotificationBell />
              </div>
              <button
                onClick={() => toggleTheme()}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs text-slate-200 hover:bg-slate-800"
              >
                {isDark ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-slate-400" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button
                onClick={() => {
                  setIsProfileMenuOpen(false)
                  navigate('/student/profile')
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs text-slate-200 hover:bg-slate-800"
              >
                <User className="h-4 w-4 text-slate-400" />
                <span>My Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs text-rose-300 hover:bg-rose-500/10"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`relative flex w-full flex-col items-center justify-center rounded-lg px-0.5 py-0.5 transition-all ${
              isProfileMenuOpen ? 'scale-105' : 'active:scale-95 hover:bg-slate-800/20'
            }`}
            aria-expanded={isProfileMenuOpen}
            aria-label="Profile menu"
          >
            <div className="relative mb-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800/30 text-slate-500">
              <User className="h-4 w-4" />
            </div>
            <span className="text-[8px] font-medium tracking-wide text-slate-500">Profile</span>
          </button>
        </div>
      </div>
      
    </nav>
  )
}
