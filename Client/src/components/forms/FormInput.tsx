import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  showPasswordToggle?: boolean
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  helperText,
  icon,
  showPasswordToggle = false,
  type,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  
  // Determine the actual input type
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password')
    : type

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex flex-col gap-1.5 mb-5 w-full">
      {label && (
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            {icon}
          </div>
        )}
        <input
          type={inputType}
          className={`
            w-full px-4 py-3 rounded-xl 
            bg-white dark:bg-slate-700
            border transition-all duration-300 
            text-slate-900 dark:text-white 
            placeholder:text-slate-400 placeholder:opacity-100
            dark:placeholder:text-slate-400 dark:placeholder:opacity-100
            ${icon ? 'pl-11' : ''}
            ${showPasswordToggle && type === 'password' ? 'pr-11' : ''}
            ${error
              ? 'border-red-500 dark:border-red-500/50 focus:ring-4 focus:ring-red-500/10'
              : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20'
            } 
            outline-none text-sm font-medium
            ${className}
          `}
          {...props}
        />
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none focus:text-blue-500"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error ? (
        <div className="flex items-center gap-1.5 ml-1 mt-1">
          <span className="w-1 h-1 rounded-full bg-red-500"></span>
          <span className="text-red-500 text-[11px] font-bold uppercase tracking-wider">{error}</span>
        </div>
      ) : helperText ? (
        <span className="text-slate-500 dark:text-slate-500 text-xs ml-1 mt-1 font-medium">{helperText}</span>
      ) : null}
    </div>
  )
}

