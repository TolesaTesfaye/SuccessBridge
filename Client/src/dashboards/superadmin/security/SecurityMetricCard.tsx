import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export const SecurityMetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  className = "",
  loading = false,
}) => {
  const isPositive = change && change > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div
      className={`bg-white dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700/50 p-5 shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700/50 transition-all duration-300 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 dark:text-slate-400 text-sm font-medium mb-1">
            {title}
          </p>
          {loading ? (
            <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mt-1 w-20" />
          ) : (
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {value}
            </p>
          )}
          {change !== undefined && (
            <div className="flex items-center mt-3">
              <TrendIcon
                size={16}
                className={isPositive ? "text-green-500" : "text-red-500"}
              />
              <span
                className={`text-sm ml-1 ${
                  isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {change > 0 ? "+" : ""}
                {change}% {changeLabel || "from last period"}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-gray-400 dark:text-slate-500 text-2xl">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityMetricCard;
