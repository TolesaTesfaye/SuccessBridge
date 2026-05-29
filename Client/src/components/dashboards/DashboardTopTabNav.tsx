import React from "react";
import type { LucideIcon } from "lucide-react";

export type DashboardTabItem = {
  id: string;
  label: string;
  shortLabel?: string;
  icon?: LucideIcon;
};

type AccentColor = "purple" | "blue";

interface DashboardTopTabNavProps {
  tabs: DashboardTabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onTabClick?: (tabId: string) => void;
  className?: string;
  stickyClassName?: string;
  accent?: AccentColor;
}

const accentStyles: Record<
  AccentColor,
  { active: string; iconActive: string }
> = {
  purple: {
    active:
      "border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400",
    iconActive: "text-purple-600 dark:text-purple-400",
  },
  blue: {
    active:
      "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400",
    iconActive: "text-blue-600 dark:text-blue-400",
  },
};

export const DashboardTopTabNav: React.FC<DashboardTopTabNavProps> = ({
  tabs,
  activeTab,
  onTabChange,
  onTabClick,
  className = "",
  stickyClassName = "-mx-2 md:-mx-6 px-2 md:px-6",
  accent = "purple",
}) => {
  const accentClass = accentStyles[accent];

  const handleClick = (tabId: string) => {
    onTabClick?.(tabId);
    onTabChange(tabId);
  };

  return (
    <div
      className={`sticky top-0 z-40 bg-white dark:bg-slate-900 border-b-2 border-gray-200 dark:border-slate-700 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${stickyClassName} ${className}`}
    >
      <div className="flex w-max min-w-full flex-nowrap items-end gap-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          const displayLabel = tab.label;
          const mobileLabel = tab.shortLabel ?? tab.label;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleClick(tab.id)}
              className={`group relative inline-flex h-11 md:h-12 shrink-0 items-center gap-1.5 md:gap-2 whitespace-nowrap border-b-2 px-3 md:px-4 text-left text-xs md:text-sm font-semibold leading-none transition-all duration-300 ${
                isActive
                  ? `${accentClass.active} -mb-0.5`
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {Icon && (
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors duration-300 ${
                    isActive
                      ? accentClass.iconActive
                      : "text-gray-500 group-hover:text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-200"
                  }`}
                  strokeWidth={2.2}
                />
              )}
              <span className="flex min-w-0 flex-col">
                <span className="leading-none tracking-[0.08em] uppercase hidden sm:inline">
                  {displayLabel}
                </span>
                <span className="leading-none tracking-[0.08em] uppercase sm:hidden">
                  {mobileLabel}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardTopTabNav;
