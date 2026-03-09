import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-slate-900/50 
        rounded-[24px] 
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none
        border border-slate-200/60 dark:border-white/5 
        overflow-hidden transition-all duration-500 
        ${hoverable ? 'cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 dark:hover:bg-slate-800/60' : ''} 
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`px-8 py-5 border-b border-slate-100 dark:border-white/5 font-bold text-lg text-slate-900 dark:text-white bg-slate-50/30 dark:bg-white/5 ${className}`}>
    {children}
  </div>
)

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div className={`p-8 text-slate-600 dark:text-slate-400 font-medium leading-relaxed ${className}`}>{children}</div>
)

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`px-8 py-5 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/60 flex gap-4 ${className}`}>
    {children}
  </div>
)

