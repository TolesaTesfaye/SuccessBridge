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
import { AdminDashboardPayments } from "@dashboards/admin/AdminDashboardPayments";

// Import extracted components
import {
  OverviewTab,
  AdminsTab,
  StudentsTab,
  ResourcesTab,
  AdminDashboardView,
  HighSchoolGradeView,
  UniversityLevelView,
  HighSchoolGradeDashboard,
  UniversityLevelDashboard,
  StudentViewWrapper,
  SecurityTab,
} from "./components";

export const SuperAdminDashboard: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Handle navigation state for activeTab
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  // New state for High School and University views
  const [highSchoolActiveGrade, setHighSchoolActiveGrade] = useState<
    "grade_9" | "grade_10" | "grade_11" | "grade_12"
  >("grade_9");
  const [universityActiveLevel, setUniversityActiveLevel] = useState<
    "freshman" | "remedial" | "senior" | "gc"
  >("freshman");

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
      if (data.grade) formData.append("gradeId", data.grade);
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
        {/* Main Tabs - Compact & Scrollable */}
        <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b-2 border-gray-200 dark:border-slate-700 flex gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-2 md:-mx-6 px-2 md:px-6">
          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "overview"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>

          {/* High School Tabs */}
          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "grade_9"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => {
              setActiveTab("grade_9");
              setHighSchoolActiveGrade("grade_9");
            }}
          >
            <span className="hidden sm:inline">Grade 9</span>
            <span className="sm:hidden">G9</span>
          </button>

          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "grade_10"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => {
              setActiveTab("grade_10");
              setHighSchoolActiveGrade("grade_10");
            }}
          >
            <span className="hidden sm:inline">Grade 10</span>
            <span className="sm:hidden">G10</span>
          </button>

          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "grade_11"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => {
              setActiveTab("grade_11");
              setHighSchoolActiveGrade("grade_11");
            }}
          >
            <span className="hidden sm:inline">Grade 11</span>
            <span className="sm:hidden">G11</span>
          </button>

          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "grade_12"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => {
              setActiveTab("grade_12");
              setHighSchoolActiveGrade("grade_12");
            }}
          >
            <span className="hidden sm:inline">Grade 12</span>
            <span className="sm:hidden">G12</span>
          </button>

          {/* University Tabs */}
          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "freshman"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => {
              setActiveTab("freshman");
              setUniversityActiveLevel("freshman");
            }}
          >
            <span className="hidden sm:inline">Freshman</span>
            <span className="sm:hidden">Fr</span>
          </button>

          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "remedial"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => {
              setActiveTab("remedial");
              setUniversityActiveLevel("remedial");
            }}
          >
            <span className="hidden sm:inline">Remedial</span>
            <span className="sm:hidden">Rm</span>
          </button>

          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "senior"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => {
              setActiveTab("senior");
              setUniversityActiveLevel("senior");
            }}
          >
            <span className="hidden sm:inline">Senior</span>
            <span className="sm:hidden">Sr</span>
          </button>

          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "gc"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => {
              setActiveTab("gc");
              setUniversityActiveLevel("gc");
            }}
          >
            GC
          </button>

          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "upload"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Upload
          </button>
          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "admins"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("admins")}
          >
            Admins
          </button>
          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "students"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "payments"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("payments")}
          >
            Payments
          </button>
          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "resources"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </button>
          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "addquiz"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("addquiz")}
          >
            <span className="hidden sm:inline">Add Quiz</span>
            <span className="sm:hidden">Quiz</span>
          </button>
          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "admin-view"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("admin-view")}
          >
            Admin View
          </button>
          <button
            className={`px-3 py-2 md:px-4 md:py-2 font-semibold transition-all duration-300 whitespace-nowrap border-b-2 text-xs md:text-sm ${
              activeTab === "security"
                ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 -mb-0.5"
                : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => setActiveTab("security")}
          >
            <span className="hidden sm:inline">Security</span>
            <span className="sm:hidden">🔒</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn pt-4 md:pt-6 px-2 md:px-0">
          {activeTab === "overview" && <OverviewTab stats={stats} />}

          {/* High School Grade Pages */}
          {activeTab === "grade_9" && (
            <StudentViewWrapper type="highschool" grade="grade_9" />
          )}
          {activeTab === "grade_10" && (
            <StudentViewWrapper type="highschool" grade="grade_10" />
          )}
          {activeTab === "grade_11" && (
            <StudentViewWrapper type="highschool" grade="grade_11" />
          )}
          {activeTab === "grade_12" && (
            <StudentViewWrapper type="highschool" grade="grade_12" />
          )}

          {/* University Level Pages */}
          {activeTab === "freshman" && (
            <StudentViewWrapper type="university" level="freshman" />
          )}
          {activeTab === "remedial" && (
            <StudentViewWrapper type="university" level="remedial" />
          )}
          {activeTab === "senior" && (
            <StudentViewWrapper type="university" level="senior" />
          )}
          {activeTab === "gc" && (
            <StudentViewWrapper type="university" level="gc" />
          )}

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
          {activeTab === "admins" && (
            <AdminsTab
              onViewAdmin={setSelectedAdmin}
              onShowModal={() => setShowAdminModal(true)}
            />
          )}
          {activeTab === "students" && (
            <StudentsTab
              onViewStudent={setSelectedStudent}
              onShowModal={() => setShowStudentModal(true)}
            />
          )}
          {activeTab === "payments" && <AdminDashboardPayments />}
          {activeTab === "resources" && (
            <ResourcesTab onUpload={() => setShowUploadModal(true)} />
          )}
          {activeTab === "addquiz" && <SuperAdminAddQuiz />}
          {activeTab === "admin-view" && <AdminDashboardView />}
          {activeTab === "security" && <SecurityTab />}
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
