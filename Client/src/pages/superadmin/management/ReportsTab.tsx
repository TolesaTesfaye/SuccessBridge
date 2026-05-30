import React, { useState, useEffect } from "react";
import { adminService } from "@services/adminService";
import {
  TrendingUp,
  FileText,
  Download,
  Loader2,
} from "lucide-react";
import { StyledCard, StyledBadge, StyledBtn } from "./StyledComponents";

export const ReportsTab: React.FC<{ toast: any }> = ({ toast }) => {
  const [userGrowth, setUserGrowth] = useState<any[]>([]);
  const [resourceUsage, setResourceUsage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [growth, usage] = await Promise.all([
          adminService.getUserGrowthReport(6),
          adminService.getResourceUsageReport(),
        ]);
        setUserGrowth(growth);
        setResourceUsage(usage);
      } catch {
        toast.error("Failed to load reports");
      } finally {
        setLoading(false);
      }
    })();
  }, [toast]);

  if (loading)
    return (
      <div className="py-12 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-blue-500" />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <StyledCard
          title="User Growth (Last 6 Months)"
          icon={<TrendingUp size={18} />}
        >
          <div className="space-y-3">
            {userGrowth.map((month) => (
              <div key={month.month} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 dark:text-slate-400 w-20">
                  {month.month}
                </span>
                <div className="flex-1 h-8 bg-gray-100 dark:bg-slate-700/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{
                      width: `${Math.min((month.students / 100) * 100, 100)}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white w-16 text-right">
                  {month.students} users
                </span>
              </div>
            ))}
          </div>
        </StyledCard>

        {/* Resource Usage by Type */}
        <StyledCard title="Resources by Type" icon={<FileText size={18} />}>
          <div className="space-y-3">
            {resourceUsage?.byType?.map((item: any) => (
              <div
                key={item.resourceType}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg"
              >
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {item.resourceType || "Uncategorized"}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {item.count || 0} files
                  </span>
                  <StyledBadge className="bg-blue-100 text-blue-700">
                    {item.totalDownloads || 0} downloads
                  </StyledBadge>
                </div>
              </div>
            ))}
          </div>
        </StyledCard>
      </div>

      {/* Export Actions */}
      <StyledCard title="Export Reports" icon={<Download size={18} />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StyledBtn
            variant="secondary"
            onClick={() => toast.info("PDF export coming soon")}
          >
            <FileText size={16} className="mr-2" /> Export as PDF
          </StyledBtn>
          <StyledBtn
            variant="secondary"
            onClick={() => toast.info("CSV export coming soon")}
          >
            <FileText size={16} className="mr-2" /> Export as CSV
          </StyledBtn>
          <StyledBtn
            variant="secondary"
            onClick={() => toast.info("Excel export coming soon")}
          >
            <FileText size={16} className="mr-2" /> Export as Excel
          </StyledBtn>
        </div>
      </StyledCard>
    </div>
  );
};
