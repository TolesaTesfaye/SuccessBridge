import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@components/dashboards/DashboardLayout";
import { Card, CardBody, CardHeader } from "@components/common/Card";
import { Modal } from "@components/common/Modal";
import { useToast } from "@components/common/Toast";
import { userService } from "@services/userService";
import { resourceService } from "@services/resourceService";
import {
  ResourceUploadForm,
  UploadFormData,
} from "@components/resources/ResourceUploadForm";
import { SuperAdminAddQuiz } from "@pages/superadmin/SuperAdminAddQuiz";
import { SuperAdminResources } from "@pages/superadmin/SuperAdminResources";
import { EducationHierarchy } from "@pages/superadmin/EducationHierarchy";
import { PromotionPage } from "@pages/PromotionPage";
import { StudentAICompanion } from "@pages/student/StudentAICompanion";
import { AdminDashboardPayments } from "@dashboards/admin/AdminDashboardPayments";
import { UniversitiesTab } from "@pages/superadmin/management/UniversitiesTab";
import { UsersTab } from "@pages/superadmin/management/UsersTab";
import { useNavigate } from "react-router-dom";
import {
  SuperAdminTopTabNav,
  type SuperAdminTabItem,
} from "./components/SuperAdminTopTabNav";
import {
  LayoutDashboard,
  Layers,
  Users,
  Send,
  Bot,
  Upload,
  CreditCard,
  FilePlus,
} from "lucide-react";

// Import extracted components
import { OverviewTab } from "./components";

const HIGH_SCHOOL_GRADES = [
  "grade_9",
  "grade_10",
  "grade_11",
  "grade_12",
] as const;
const UNIVERSITY_LEVELS = ["freshman", "remedial"] as const;

const PLATFORM_TABS: SuperAdminTabItem[] = [
  { id: "overview", label: "Overview", shortLabel: "Overview", icon: LayoutDashboard },
  { id: "resources", label: "Resources", shortLabel: "Resources", icon: Layers },
  { id: "users", label: "Users", shortLabel: "Users", icon: Users },
  { id: "promotion", label: "Promotion", shortLabel: "Promotion", icon: Send },
  { id: "ai-companion", label: "AI Companion", shortLabel: "AI Companion", icon: Bot },
  { id: "upload", label: "Upload", shortLabel: "Upload", icon: Upload },
  { id: "payments", label: "Payments", shortLabel: "Payments", icon: CreditCard },
  { id: "addquiz", label: "Add Quiz", shortLabel: "Add Quiz", icon: FilePlus },
  { id: "universities", label: "Universities", shortLabel: "Universities", icon: Layers },
];

export const SuperAdminDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Legacy tab state → dedicated view routes
  useEffect(() => {
    const tab = location.state?.activeTab;
    if (!tab || tab === "overview") {
      setActiveTab("overview");
      return;
    }

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

    const isValidTab = PLATFORM_TABS.some((item) => item.id === tab) || tab === "hierarchy";
    setActiveTab(isValidTab ? tab : "overview");
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
          userService.getAllUsers(1, 10000),
          resourceService.getResources({ limit: 10000 }),
        ]);

        const users = usersRes.data || [];
        const activeStudents = users.filter(
          (u: any) => u.role === "student",
        ).length;

        const resources = Array.isArray(resourcesRes)
          ? resourcesRes
          : resourcesRes.data?.data || resourcesRes.data || [];

        setStats({
          totalUsers: usersRes.total || users.length,
          activeStudents,
          totalResources: resources.length,
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
      if (data.previewImage)
        formData.append("previewImage", data.previewImage);
      if (data.grade) formData.append("grade", data.grade);
      if (data.stream) formData.append("stream", data.stream);
      if (data.universityId) formData.append("universityId", data.universityId);
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
          accent="blue"
        />

        {/* Tab Content */}
        <div className="animate-fadeIn pt-4 md:pt-6 px-2 md:px-0">
          {activeTab === "overview" && (
            <OverviewTab stats={stats} onNavigateTab={setActiveTab} />
          )}

          {activeTab === "resources" && <SuperAdminResources embedded />}
          {activeTab === "users" && <UsersTab toast={toast} />}
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
          {activeTab === "universities" && <UniversitiesTab toast={toast} />}
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

      </div>
    </DashboardLayout>
  );
};
