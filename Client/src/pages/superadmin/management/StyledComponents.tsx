import React from "react";

export const StyledBtn: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: string;
    size?: string;
  }
> = ({
  variant = "secondary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const base =
    "font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";
  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg",
    secondary:
      "bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-600",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    warning: "bg-orange-500 hover:bg-orange-600 text-white",
    ghost:
      "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300",
  };
  const sizes: Record<string, string> = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      className={`${base} ${variants[variant] || variants.secondary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const StyledCard: React.FC<{
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, icon, children, className = "" }) => (
  <div
    className={`bg-white dark:bg-slate-800/80 rounded-xl border border-gray-200 dark:border-slate-700/50 shadow-sm ${className}`}
  >
    {title && (
      <div className="flex items-center gap-2 p-4 border-b border-gray-100 dark:border-slate-700/30">
        {icon && <span className="text-blue-500">{icon}</span>}
        <h4 className="font-bold text-gray-900 dark:text-white text-sm">
          {title}
        </h4>
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

export const StyledBadge: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <span
    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}
  >
    {children}
  </span>
);

export const StyledInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
> = ({ label, className = "", ...props }) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
    )}
    <input
      className={`w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all ${className}`}
      {...props}
    />
  </div>
);

export const StyledSelect: React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    options: { value: string; label: string }[];
  }
> = ({ label, options, className = "", ...props }) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
    )}
    <select
      className={`w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all ${className}`}
      {...props}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

export const StyledModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: string;
}> = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const widths: Record<string, string> = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full ${widths[size] || widths.md} max-h-[85vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-gray-500"
          >
            &times;
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};


