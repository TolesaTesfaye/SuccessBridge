import React from 'react'

interface Option {
  value: string | number
  label: string
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: Option[]
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  error,
  helperText,
  options,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 md:gap-2 mb-3 md:mb-5 w-full">
      {label && (
        <label className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
          {label}
        </label>
      )}
      <div className="relative group italic font-medium">
        <select
          className={`
            w-full 
            px-3 md:px-4 
            py-2.5 md:py-3 
            pr-10 md:pr-12
            rounded-lg md:rounded-xl 
            bg-white dark:bg-slate-700
            border transition-all duration-300 
            text-slate-900 dark:text-white 
            appearance-none
            ${error
              ? 'border-red-500 dark:border-red-500/50 focus:ring-4 focus:ring-red-500/10'
              : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/20'
            } 
            outline-none 
            text-xs md:text-sm
            cursor-pointer
            touch-manipulation
            min-h-[44px] md:min-h-[48px]
            ${className}
          `}
          {...props}
        >
          <option value="" className="dark:bg-slate-800 italic opacity-50 text-xs md:text-sm">
            Choose an option...
          </option>
          {options.map(option => (
            <option 
              key={option.value} 
              value={option.value} 
              className="dark:bg-slate-800 font-sans not-italic text-xs md:text-sm py-2"
            >
              {option.label}
            </option>
          ))}
        </select>
        {/* Larger touch target for mobile */}
        <div className="absolute right-0 top-0 bottom-0 w-10 md:w-12 flex items-center justify-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error ? (
        <div className="flex items-center gap-1.5 ml-1 mt-1">
          <span className="w-1 h-1 rounded-full bg-red-500"></span>
          <span className="text-red-500 text-[10px] md:text-[11px] font-bold uppercase tracking-wider">{error}</span>
        </div>
      ) : helperText ? (
        <span className="text-slate-500 dark:text-slate-500 text-[10px] md:text-xs ml-1 mt-1 font-medium">{helperText}</span>
      ) : null}
    </div>
  )
}


