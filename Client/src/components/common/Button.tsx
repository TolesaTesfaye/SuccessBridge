import React from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]'

  const variantStyles = {
    primary: 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-lg shadow-blue-600/20 dark:shadow-blue-500/10 border border-blue-500/20',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700',
    danger: 'bg-red-500 dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-700 shadow-lg shadow-red-500/20 dark:shadow-red-600/10 border border-red-400/20',
    success: 'bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 border border-emerald-400/20',
    ghost: 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 active:bg-slate-100',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs uppercase tracking-wider',
    md: 'px-6 py-3 text-sm italic tracking-tight',
    lg: 'px-8 py-4 text-base font-black',
  }

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin opacity-80" />
      ) : icon ? (
        <span className="flex items-center justify-center transition-transform group-hover:scale-110">{icon}</span>
      ) : null}
      {children}
    </button>
  )
}

