import React, { useMemo, useState } from "react";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import {
  ResourceUploadForm,
  UploadFormData,
} from "@components/resources/ResourceUploadForm";
import { subjectService } from "@services/subjectService";
import { departmentService } from "@services/departmentService";
import { universityService } from "@services/universityService";
import { resourceService } from "@services/resourceService";
import { quizService } from "@services/quizService";
import { userService } from "@services/userService";
import { AdminDashboardOverview } from "./AdminDashboardOverview";
import { AdminDashboardResources } from "./AdminDashboardResources";
import { AdminDashboardStudents } from "./AdminDashboardStudents";
import { AdminDashboardSubjects } from "./AdminDashboardSubjects";
import { AdminDashboardDepartments } from "./AdminDashboardDepartments";
import { AdminDashboardUniversities } from "./AdminDashboardUniversities";
import { AdminDashboardQuizzes } from "./AdminDashboardQuizzes";
import { AdminDashboardAnalytics } from "./AdminDashboardAnalytics";
import { AdminDashboardUpload } from "./AdminDashboardUpload";
import { AdminDashboardPromotion } from "./AdminDashboardPromotion";
import {
  AlertTriangle,
  BarChart3,
  BookOpenCheck,
  Building2,
  GraduationCap,
  FileText,
  Upload,
  Users,
  School,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type TabKey =
  | "overview"
  | "resources"
  | "students"
  | "subjects"
  | "departments"
  | "universities"
  | "quizzes"
  | "upload"
  | "reports"
  | "promotion";

type DashboardState = {
  loading: boolean;
  error: string | null;
  subjects: any[];
  departments: any[];
  universities: any[];
  quizzes: any[];
  resourceStats: any | null;
  studentCount: number;
};

const initialState: DashboardState = {
  loading: true,
  error: null,
  subjects: [],
  departments: [],
  universities: [],
  quizzes: [],
  resourceStats: null,
  studentCount: 0,
};

const parseArrayData = (value: any): any[] => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.data?.data)) return value.data.data;
  if (Array.isArray(value?.subjects)) return value.subjects;
  if (Array.isArray(value?.departments)) return value.departments;
  if (Array.isArray(value?.universities)) return value.universities;
  return [];
};

const parseError = (err: any): string => {
  const status = err?.response?.status;
  if (status === 403)
    return "You do not have permission to perform this action.";
  if (status === 401) return "Please login again to continue.";
  return (
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Request failed."
  );
};

export const AdminDashboardContent: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [state, setState] = useState<DashboardState>(initialState);
  const [uploading, setUploading] = useState(false);
  const [uploadFormKey, setUploadFormKey] = useState(0);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchDashboardData = React.useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    const results = await Promise.allSettled([
      subjectService.getSubjects(),
      departmentService.getAll(),
      universityService.getUniversities(),
      quizService.getAll({ limit: 200 }),
      resourceService.getResourceStats(),
      userService.getAllUsers(1, 1, "student"),
    ]);

    const [
      subjectsRes,
      departmentsRes,
      universitiesRes,
      quizzesRes,
      resourceStatsRes,
      studentsRes,
    ] = results;

    const subjects =
      subjectsRes.status === "fulfilled"
        ? parseArrayData(subjectsRes.value)
        : [];
    const departments =
      departmentsRes.status === "fulfilled"
        ? parseArrayData(departmentsRes.value)
        : [];
    const universities =
      universitiesRes.status === "fulfilled"
        ? parseArrayData(universitiesRes.value?.data || universitiesRes.value)
        : [];
    const quizzes =
      quizzesRes.status === "fulfilled" ? parseArrayData(quizzesRes.value) : [];
    const resourceStats =
      resourceStatsRes.status === "fulfilled"
        ? resourceStatsRes.value?.data || {}
        : null;
    const studentCount =
      studentsRes.status === "fulfilled" ? studentsRes.value?.total || 0 : 0;

    const hardFailures = [
      subjectsRes,
      departmentsRes,
      universitiesRes,
      quizzesRes,
      resourceStatsRes,
      studentsRes,
    ].filter((result) => result.status === "rejected").length;

    setState({
      loading: false,
      error:
        hardFailures >= 3
          ? "Some dashboard sources are unavailable right now."
          : null,
      subjects,
      departments,
      universities,
      quizzes,
      resourceStats,
      studentCount,
    });
  }, []);

  React.useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const dashboardTabs = useMemo(
    () => [
      { id: "overview" as TabKey, label: "Overview", icon: BarChart3 },
      { id: "resources" as TabKey, label: "Resources", icon: FileText },
      { id: "students" as TabKey, label: "Students", icon: Users },
      { id: "subjects" as TabKey, label: "Subjects", icon: BookOpenCheck },
      { id: "departments" as TabKey, label: "Departments", icon: Building2 },
      { id: "universities" as TabKey, label: "Universities", icon: School },
      { id: "quizzes" as TabKey, label: "Quizzes", icon: GraduationCap },
      { id: "upload" as TabKey, label: " Upload", icon: Upload },
      { id: "reports" as TabKey, label: "Analytics", icon: BarChart3 },
    ],
    [],
  );

  const handleNavigateToTab = (tab: string) => {
    const valid: TabKey[] = [
      "overview",
      "resources",
      "students",
      "subjects",
      "departments",
      "universities",
      "quizzes",
      "upload",
      "reports",
      "promotion",
    ];
    if (valid.includes(tab as TabKey)) {
      setActiveTab(tab as TabKey);
    }
  };

  const tabButton = ({
    id,
    label,
    icon: Icon,
  }: (typeof dashboardTabs)[number]) => (
    <button
      key={id}
      className={`group relative inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3.5 text-left text-sm font-semibold transition-all duration-300 ${
        activeTab === id
          ? "border-blue-400 text-white"
          : "border-transparent text-slate-400 hover:border-slate-500 hover:text-white"
      }`}
      onClick={() => setActiveTab(id)}
    >
      <Icon
        className={`h-4 w-4 transition-colors duration-300 ${
          activeTab === id
            ? "text-blue-300"
            : "text-slate-500 group-hover:text-slate-200"
        }`}
        strokeWidth={2.2}
      />
      <span className="flex min-w-0 flex-col">
        <span className="leading-none tracking-[0.08em] uppercase">
          {label}
        </span>
      </span>
    </button>
  );

  const resetAlerts = () => {
    setActionMessage(null);
    setActionError(null);
  };

  const handleUploadSubmit = async (data: UploadFormData) => {
    resetAlerts();
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("educationLevel", data.educationLevel);
      formData.append("type", data.type);
      formData.append("subject", data.subject);
      formData.append("tags", data.tags);
      if (data.file) formData.append("file", data.file);
      if (data.grade) formData.append("gradeId", data.grade);
      if (data.stream) formData.append("stream", data.stream);
      if (data.universityId) formData.append("universityId", data.universityId);
      if (data.departmentId) formData.append("departmentId", data.departmentId);
      if (data.category) formData.append("category", data.category);
      await resourceService.uploadResource(formData);
      await fetchDashboardData();
      setActionMessage("Resource uploaded successfully.");
      setUploadFormKey((prev) => prev + 1);
    } catch (err: any) {
      setActionError(parseError(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-0 pb-8 w-full pt-4 md:pt-6">
      {/* Top Tab Bar — Sticky at top */}
      <div className="sticky top-0 z-40 -mx-4 md:-mx-6 overflow-x-auto border-b border-slate-700 bg-[#20212b] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.55)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max min-w-full flex-nowrap items-end gap-1 px-4 md:px-6 py-1">
          {dashboardTabs.map((tab) => tabButton(tab))}
        </div>
      </div>

      {state.error && (
        <div className="border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> {state.error}
        </div>
      )}
      {actionMessage && (
        <div className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 text-sm">
          {actionMessage}
        </div>
      )}
      {actionError && (
        <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800 text-sm">
          {actionError}
        </div>
      )}

      {activeTab === "overview" && (
        <AdminDashboardOverview
          state={state}
          onRefresh={fetchDashboardData}
          onNavigateToTab={handleNavigateToTab}
        />
      )}

      {activeTab === "resources" && (
        <AdminDashboardResources
          onUpload={() => setActiveTab("upload")}
          onNavigateToTab={handleNavigateToTab}
        />
      )}

      {activeTab === "students" && (
        <AdminDashboardStudents onNavigateToTab={handleNavigateToTab} />
      )}

      {activeTab === "subjects" && (
        <AdminDashboardSubjects onNavigateToTab={handleNavigateToTab} />
      )}

      {activeTab === "departments" && <AdminDashboardDepartments />}

      {activeTab === "universities" && <AdminDashboardUniversities />}

      {activeTab === "quizzes" && (
        <AdminDashboardQuizzes onNavigateToTab={handleNavigateToTab} />
      )}

      {activeTab === "upload" && (
        <AdminDashboardUpload
          onUploadSubmit={handleUploadSubmit}
          uploading={uploading}
          uploadFormKey={uploadFormKey}
        />
      )}

      {activeTab === "reports" && <AdminDashboardAnalytics />}

      {/* Promotion is only accessible via sidebar → /admin/promotion */}
      {activeTab === "promotion" && <AdminDashboardPromotion />}
    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Manage structures with live database data"
      showFooter={true}
      disableTopPadding={true}
    >
      <AdminDashboardContent />
    </DashboardLayout>
  );
};
