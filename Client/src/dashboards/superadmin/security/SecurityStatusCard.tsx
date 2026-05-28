import React from "react";
import { LucideIcon } from "lucide-react";

interface StatusItem {
  name: string;
  status: "active" | "inactive" | "warning";
  description?: string;
}

interface SecurityStatusCardProps {
  title: string;
  items: StatusItem[];
  icon?: LucideIcon;
  loading?: boolean;
}

export const SecurityStatusCard: React.FC<SecurityStatusCardProps> = ({
  title,
  items,
  icon: Icon,
  loading = false,
}) => {
  const statusColors = {
    active:
      "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700/50",
    inactive:
      "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700/50",
    warning:
      "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700/50",
  };

  const statusBadges = {
    active: "✅",
    inactive: "❌",
    warning: "⚠️",
  };

  return (
    <div className="bg-white dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700/50 p-5 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        {Icon && (
          <Icon size={20} className="text-gray-700 dark:text-slate-300" />
        )}
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
          {title}
        </h3>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.name}
              className={`p-3 rounded-lg border flex items-start gap-2 ${statusColors[item.status]}`}
            >
              <span className="text-lg mt-0.5">
                {statusBadges[item.status]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{item.name}</p>
                {item.description && (
                  <p className="text-xs mt-1 opacity-75">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecurityStatusCard;
