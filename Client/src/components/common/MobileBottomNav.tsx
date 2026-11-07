import React, { useState } from 'react'
import { Home, BookOpen, Library, Menu, Moon, Sun, User } from 'lucide-react'
import { useThemeStore } from '@store/themeStore'
import NotificationBell from '@components/notifications/NotificationBell'

interface MobileBottomNavProps {
  activeTab: 'home' | 'learning' | 'hub'
  onTabChange: (tab: 'home' | 'learning' | 'hub') => void
  variant?: 'student' | 'admin'
  onProfileClick?: () => void
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onTabChange,
  variant = 'student',
  onProfileClick,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useThemeStore()
  const studentTabs = [
    { id: 'home' as const, label: 'Home', shortLabel: 'Home', icon: Home, color: 'emerald' },
    { id: 'learning' as const, label: 'Learning Center', shortLabel: 'Learning', icon: BookOpen, color: 'blue' },
    { id: 'hub' as const, label: 'Resource Hub', shortLabel: 'Resources', icon: Library, color: 'violet' },
  ]

  const getColorClasses = (color: string, isActive: boolean) => {
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900/95 backdrop-blur-lg border-t border-slate-700/30 z-50 shadow-xl">
      {/* Subtle glow effect on top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />

      {variant === 'admin' && isProfileMenuOpen && (
        <div className="absolute bottom-full right-2 mb-2 w-52 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-1.5 shadow-2xl shadow-black/30">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-slate-300">
            <NotificationBell dropdownPlacement="top" />
            <span>Notifications</span>
          </div>
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button
            onClick={() => {
              setIsProfileMenuOpen(false)
              onProfileClick?.()
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <User className="h-4 w-4" />
            <span>My Profile</span>
          </button>
        </div>
      )}
      
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

        {(variant === 'admin' ? [studentTabs[0]] : studentTabs).map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          const colors = getColorClasses(tab.color, isActive)

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-0.5 px-0.5 rounded-lg transition-all duration-300 ease-out group ${
                tab.id === 'learning' ? 'ml-1' : ''
              } ${
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

        {variant === 'admin' && (
          <button
            onClick={() => setIsProfileMenuOpen((open) => !open)}
            className="relative flex flex-1 flex-col items-center justify-center rounded-lg px-0.5 py-0.5 text-slate-500 transition-all active:scale-95 hover:bg-slate-800/20 hover:text-slate-300"
            aria-label="Open profile"
          >
            <div className="mb-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800/30">
              <User className="h-4 w-4" />
            </div>
            <span className="text-[8px] font-medium tracking-wide">Profile</span>
          </button>
        )}
      </div>
      
    </nav>
  )
}
