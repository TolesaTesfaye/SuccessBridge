import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Button } from "@components/common/Button";
import { Modal } from "@components/common/Modal";
import { userService } from "@services/userService";
import { resourceService } from "@services/resourceService";
import {
  ResourceUploadForm,
  UploadFormData,
} from "@components/resources/ResourceUploadForm";
import { SuperAdminAddQuiz } from "@pages/superadmin/SuperAdminAddQuiz";
import { SuperAdminResources } from "@pages/superadmin/SuperAdminResources";
import { EducationHierarchy } from "@pages/superadmin/EducationHierarchy";
import { SuperAdminAnalytics } from "@pages/superadmin/SuperAdminAnalytics";
import { PromotionPage } from "@pages/PromotionPage";
import { StudentAICompanion } from "@pages/student/StudentAICompanion";
import { AdminDashboardPayments } from "@dashboards/admin/AdminDashboardPayments";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Megaphone,
  Sparkles,
  Upload,
  CreditCard,
  FileQuestion,
} from "lucide-react";
import {
  SuperAdminTopTabNav,
  type SuperAdminTabItem,
} from "./components/SuperAdminTopTabNav";

// Import extracted components
import { OverviewTab } from "./components";

const HIGH_SCHOOL_GRADES = [
  "grade_9",
  "grade_10",
  "grade_11",
  "grade_12",
] as const;
const UNIVERSITY_LEVELS = ["freshman", "remedial", "senior", "gc"] as const;

const PLATFORM_TABS: SuperAdminTabItem[] = [
  { id: "overview", label: "Overview", shortLabel: "Home", icon: LayoutDashboard },
  { id: "resources", label: "Resources", shortLabel: "Res", icon: BookOpen },
  { id: "analytics", label: "Analytics", shortLabel: "Stats", icon: BarChart3 },
  { id: "promotion", label: "Promotion", shortLabel: "Promo", icon: Megaphone },
  {
    id: "ai-companion",
    label: "AI Companion",
    shortLabel: "AI",
    icon: Sparkles,
  },
  { id: "upload", label: "Upload", shortLabel: "Add", icon: Upload },
  { id: "payments", label: "Payments", shortLabel: "Pay", icon: CreditCard },
  { id: "addquiz", label: "Add Quiz", shortLabel: "Quiz", icon: FileQuestion },
];

export const SuperAdminDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Legacy tab state → dedicated view routes
  useEffect(() => {
    const tab = location.state?.activeTab;
    if (!tab) return;

    if (tab === "admin-view") {
      navigate("/superadmin/admin-view", { replace: true });
      return;
    }
    if (tab === "security") {
      navigate("/superadmin/security", { replace: true });
      return;
    }
    if (tab === "management") {
      navigate("/superadmin/management", { replace: true });
      return;
    }
    if (HIGH_SCHOOL_GRADES.includes(tab)) {
      navigate("/superadmin/highschool-view", {
        replace: true,
        state: { activeTab: tab },
      });
      return;
    }
    if (UNIVERSITY_LEVELS.includes(tab)) {
      navigate("/superadmin/university-view", {
        replace: true,
        state: { activeTab: tab },
      });
      return;
    }

    setActiveTab(tab);
  }, [location.state, navigate]);

  // Real data from database
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeStudents: 0,
    totalResources: 0,
    loading: true,
  });

  // Fetch dashboard statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, resourcesRes] = await Promise.all([
          userService.getAllUsers(),
          resourceService.getResources({ limit: 1 }),
        ]);

        const users = Array.isArray(usersRes) ? usersRes : usersRes.data || [];
        const activeStudents = users.filter(
          (u: any) => u.role === "student",
        ).length;

        setStats({
          totalUsers: users.length,
          activeStudents,
          totalResources: Array.isArray(resourcesRes)
            ? resourcesRes.length
            : resourcesRes.data?.total || 0,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const handleUploadSubmit = async (data: UploadFormData) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("educationLevel", data.educationLevel);
      formData.append("type", data.type);
      formData.append("subject", data.subject);
      formData.append("tags", data.tags);
      if (data.file) formData.append("file", data.file);
      if (data.grade) formData.append("grade", data.grade);
      if (data.stream) formData.append("stream", data.stream);
      if (data.universityId) formData.append("universityId", data.universityId);
      if (data.departmentId) formData.append("departmentId", data.departmentId);
      if (data.category) formData.append("category", data.category);

      console.log(
        "Uploading resource with data:",
        Object.fromEntries(formData.entries()),
      );

      await resourceService.uploadResource(formData);
      setShowUploadModal(false);
      alert("Resource uploaded successfully!");
    } catch (error: any) {
      console.error("Upload failed:", error);
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Failed to upload resource. Please try again.";
      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DashboardLayout
      title="Super Admin Dashboard"
      subtitle="Platform-wide management and analytics"
      disableTopPadding={true}
    >
      <div className="space-y-0 pb-8">
        <SuperAdminTopTabNav
          tabs={PLATFORM_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className="animate-fadeIn pt-4 md:pt-6 px-2 md:px-0">
          {activeTab === "overview" && <OverviewTab stats={stats} />}

          {activeTab === "resources" && <SuperAdminResources embedded />}
          {activeTab === "analytics" && <SuperAdminAnalytics embedded />}
          {activeTab === "promotion" && <PromotionPage embedded />}
          {activeTab === "ai-companion" && <StudentAICompanion embedded />}

          {activeTab === "upload" && (
            <Card>
              <CardHeader>📤 Upload New Resource</CardHeader>
              <CardBody>
                <ResourceUploadForm
                  onSubmit={handleUploadSubmit}
                  loading={isUploading}
                />
              </CardBody>
            </Card>
          )}
          {activeTab === "payments" && <AdminDashboardPayments />}
          {activeTab === "hierarchy" && <EducationHierarchy />}
          {activeTab === "addquiz" && <SuperAdminAddQuiz />}
        </div>

        {/* Upload Modal */}
        <Modal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title="Upload New Resource"
          size="lg"
          fullScreenOnMobile={true}
        >
          <ResourceUploadForm
            onSubmit={handleUploadSubmit}
            loading={isUploading}
          />
        </Modal>

        {/* Student/Admin Detail Modal */}
        <Modal
          isOpen={showStudentModal || showAdminModal}
          onClose={() => {
            setShowStudentModal(false);
            setShowAdminModal(false);
          }}
          title={
            selectedStudent?.isAdmin || selectedAdmin
              ? "Admin Detailed Profile"
              : "Student Detailed Profile"
          }
          size="lg"
          fullScreenOnMobile={true}
        >
          {(selectedStudent || selectedAdmin) && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-[20px] border border-slate-100 dark:border-white/5">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">
                  {selectedStudent?.isAdmin || selectedAdmin ? "👨‍💼" : "🎓"}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white m-0">
                    {(selectedAdmin || selectedStudent)?.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 m-0">
                    {(selectedAdmin || selectedStudent)?.email}
                  </p>
                </div>
                <div className="ml-auto">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      (selectedAdmin || selectedStudent)?.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {(selectedAdmin || selectedStudent)?.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                    Academic Information
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Education Level
                      </label>
                      <p className="text-slate-900 dark:text-white font-bold m-0">
                        {(selectedAdmin || selectedStudent)?.educationLevel}
                      </p>
                    </div>
                    {(selectedAdmin || selectedStudent)?.educationLevel ===
                    "University" ? (
                      <>
                        <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                          <label className="text-xs font-semibold text-slate-400 block mb-1">
                            University
                          </label>
                          <p className="text-slate-900 dark:text-white font-bold m-0">
                            {(selectedAdmin || selectedStudent)?.university}
                          </p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                          <label className="text-xs font-semibold text-slate-400 block mb-1">
                            Department
                          </label>
                          <p className="text-slate-900 dark:text-white font-bold m-0">
                            {(selectedAdmin || selectedStudent)?.department}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                        <label className="text-xs font-semibold text-slate-400 block mb-1">
                          Grade Level
                        </label>
                        <p className="text-slate-900 dark:text-white font-bold m-0">
                          {(selectedAdmin || selectedStudent)?.grade}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                    Account Details
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Database ID
                      </label>
                      <p className="text-slate-900 dark:text-white font-mono text-xs m-0">
                        {(selectedAdmin || selectedStudent)?.id}
                      </p>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Join Date
                      </label>
                      <p className="text-slate-900 dark:text-white font-bold m-0">
                        {(selectedAdmin || selectedStudent)?.joinedDate}
                      </p>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-white/5">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Role Type
                      </label>
                      <p className="text-slate-900 dark:text-white font-bold m-0">
                        {selectedStudent?.isAdmin || selectedAdmin
                          ? "Platform Administrator"
                          : "Student User"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t dark:border-white/5">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => {
                    setShowStudentModal(false);
                    setShowAdminModal(false);
                  }}
                >
                  Close Profile
                </Button>
                <Button
                  variant="danger"
                  fullWidth
                  onClick={() => {
                    if (
                      confirm(
                        `Are you sure you want to delete ${(selectedAdmin || selectedStudent)?.name}?`,
                      )
                    ) {
                      setShowStudentModal(false);
                      setShowAdminModal(false);
                    }
                  }}
                >
                  Deactivate Account
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
};
