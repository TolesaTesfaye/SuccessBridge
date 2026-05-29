import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@store/authStore";
import { useToast } from "@components/common/Toast";
import {
  File,
  FileWarning,
  Upload,
  Download,
} from "lucide-react";
import { SecurityTabLayout } from "./SecurityTabLayout";
import SecurityMetricCard from "./SecurityMetricCard";
import SecurityDataTable from "./SecurityDataTable";
import { adminSecurityService } from "@services/adminSecurityService";

export const FileUploadsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    uploads: [],
    total: 0,
    page: 1,
    pages: 1,
    totalUploads: 0,
    blockedUploads: 0,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (user && user.role !== "super_admin") {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchUploads();
  }, [page]);

  const fetchUploads = async () => {
    try {
      setLoading(true);
      const result = await adminSecurityService.getUploads(page, 50);
      setData(result);
    } catch (error) {
      console.error("Failed to fetch uploads:", error);
      toast.error("Failed to load file upload records");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "timestamp",
      label: "Time",
      render: (value: any) => new Date(value).toLocaleString(),
    },
    {
      key: "action",
      label: "Action",
      render: (value: string) => {
        const isBlocked = value === "upload_blocked";
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${
              isBlocked
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {isBlocked ? <FileWarning size={14} /> : <Upload size={14} />}
            {value.replace(/_/g, " ")}
          </span>
        );
      },
    },
    {
      key: "resource",
      label: "Resource",
      sortable: true,
    },
    {
      key: "userId",
      label: "User",
      render: (value: string) => (
        <span className="text-sm font-mono">
          {value ? value.substring(0, 12) + "..." : "Unknown"}
        </span>
      ),
    },
    {
      key: "ipAddress",
      label: "IP Address",
      render: (value: string) => (
        <span className="font-mono text-sm">{value || "Unknown"}</span>
      ),
    },
    {
      key: "errorMessage",
      label: "Details",
      render: (value: string) => (value ? value.substring(0, 60) + "..." : "—"),
    },
  ];

  return (
    <SecurityTabLayout title="File Uploads" subtitle="Monitor file upload activity">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SecurityMetricCard
          title="Total Uploads"
          value={data.totalUploads || 0}
          icon="📤"
          loading={loading}
        />
        <SecurityMetricCard
          title="Blocked Uploads"
          value={data.blockedUploads || 0}
          icon="🚫"
          loading={loading}
        />
        <SecurityMetricCard
          title="Records Found"
          value={data.total || 0}
          icon="📋"
          loading={loading}
        />
        <SecurityMetricCard
          title="Block Rate"
          value={
            data.totalUploads + data.blockedUploads > 0
              ? `${Math.round(
                  (data.blockedUploads /
                    (data.totalUploads + data.blockedUploads)) *
                    100,
                )}%`
              : "0%"
          }
          icon="📊"
          loading={loading}
        />
      </div>

      {/* Upload Restrictions Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <File size={20} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            File Upload Restrictions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="font-semibold text-green-800 mb-1">
              ✅ Allowed Types
            </p>
            <p className="text-green-700">
              PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV, JPG, PNG, GIF,
              SVG, MP4, MP3, ZIP
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="font-semibold text-yellow-800 mb-1">
              ⚠️ Size Limits
            </p>
            <p className="text-yellow-700">
              Max 10MB per file for resources
              <br />
              Max 5MB for profile images
              <br />
              Max 50MB for video content
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="font-semibold text-red-800 mb-1">
              🚫 Blocked Types
            </p>
            <p className="text-red-700">
              EXE, BAT, SH, PHP, ASP, JSP, DLL, SO, PY, RB, JS (scripts)
            </p>
          </div>
        </div>
      </div>

      {/* Upload Records Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Download size={20} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            File Upload Activity
          </h2>
        </div>
        <SecurityDataTable
          columns={columns}
          data={data.uploads || []}
          loading={loading}
          pagination={
            data.total > 0
              ? {
                  page: data.page || 1,
                  total: data.total,
                  pages: data.pages || 1,
                  onPageChange: setPage,
                }
              : undefined
          }
        />
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          🔒 All file uploads are logged in the audit trail. Blocked uploads
          are flagged when files do not meet the allowed type or size
          criteria. Super admins can review upload activity and identify
          potential security concerns.
        </p>
      </div>
    </SecurityTabLayout>
  );
};

export default FileUploadsPage;
