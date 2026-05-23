import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "@store/authStore";
import { Layout } from "@components/Layout";
import { LoadingOverlay } from "@components/common/Spinner";
import { PerformanceMonitor } from "@components/common/PerformanceMonitor";
import { ToastProvider, useToast } from "@components/common/Toast";
import { useApiErrorHandler } from "@utils/apiErrorHandler";
import { SessionTimeoutWarning } from "@components/common/SessionTimeoutWarning";
import { sessionManager } from "@utils/sessionManager";

// Eager load critical components
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { Register } from "@pages/Register";
import { VerifyEmail } from "@pages/VerifyEmail";
import { ResendVerification } from "@pages/ResendVerification";
import { ForgotPassword } from "@pages/ForgotPassword";
import { ResetPassword } from "@pages/ResetPassword";
import { NotFound } from "@pages/NotFound";
import { Unauthorized } from "@pages/Unauthorized";
import { OAuthCallback } from "@pages/OAuthCallback";
import { OAuthRegister } from "@pages/OAuthRegister";
import { CompleteProfile } from "@pages/CompleteProfile";

// Lazy load dashboards
const HighSchoolDashboard = lazy(() =>
  import("@dashboards/student/HighSchoolDashboard").then((m) => ({
    default: m.HighSchoolDashboard,
  })),
);
const UniversityDashboard = lazy(() =>
  import("@dashboards/student/UniversityDashboard").then((m) => ({
    default: m.UniversityDashboard,
  })),
);
const AdminDashboard = lazy(() =>
  import("@dashboards/admin/AdminDashboard").then((m) => ({
    default: m.AdminDashboard,
  })),
);
const SuperAdminDashboard = lazy(() =>
  import("@dashboards/superadmin/SuperAdminDashboard").then((m) => ({
    default: m.SuperAdminDashboard,
  })),
);

// Lazy load student pages
const StudentResources = lazy(() =>
  import("@pages/student/StudentResources").then((m) => ({
    default: m.StudentResources,
  })),
);
const StudentAICompanion = lazy(() =>
  import("@pages/student/StudentAICompanion").then((m) => ({
    default: m.StudentAICompanion,
  })),
);
const StudentQuizzes = lazy(() =>
  import("@pages/student/StudentQuizzes").then((m) => ({
    default: m.StudentQuizzes,
  })),
);
const StudentProgress = lazy(() =>
  import("@pages/student/StudentProgress").then((m) => ({
    default: m.StudentProgress,
  })),
);
const StudentPromotions = lazy(() =>
  import("@pages/student/StudentPromotions").then((m) => ({
    default: m.StudentPromotions,
  })),
);
const StudentProfile = lazy(() =>
  import("@pages/student/StudentProfile").then((m) => ({
    default: m.StudentProfile,
  })),
);
const StudentPayments = lazy(() =>
  import("@pages/PaymentTrackingPage").then((m) => ({
    default: m.PaymentTrackingPage,
  })),
);
const UniversityCourseViewer = lazy(() =>
  import("@pages/student/UniversityCourseViewer").then((m) => ({
    default: m.UniversityCourseViewer,
  })),
);

// Learning Center deep-link route (keeps dashboard layout)
const UniversityLearningCenterRoute = lazy(() =>
  import("@pages/student/UniversityLearningCenterRoute").then((m) => ({
    default: m.UniversityLearningCenterRoute,
  })),
);

// Lazy load admin pages
const AdminResources = lazy(() =>
  import("@pages/admin/AdminResources").then((m) => ({
    default: m.AdminResources,
  })),
);
const AdminStudents = lazy(() =>
  import("@pages/admin/AdminStudents").then((m) => ({
    default: m.AdminStudents,
  })),
);
const AdminQuizzes = lazy(() =>
  import("@pages/admin/AdminQuizzes").then((m) => ({
    default: m.AdminQuizzes,
  })),
);
const AdminAnalytics = lazy(() =>
  import("@pages/admin/AdminAnalytics").then((m) => ({
    default: m.AdminAnalytics,
  })),
);
const AdminSettings = lazy(() =>
  import("@pages/admin/AdminSettings").then((m) => ({
    default: m.AdminSettings,
  })),
);
const PromotionPage = lazy(() =>
  import("@pages/PromotionPage").then((m) => ({
    default: m.PromotionPage,
  })),
);

// Lazy load security dashboard pages
const SecurityDashboard = lazy(() =>
  import("@dashboards/admin/SecurityDashboard").then((m) => ({
    default: m.SecurityDashboard,
  })),
);
const AuditLogsPage = lazy(() =>
  import("@dashboards/admin/AuditLogsPage").then((m) => ({
    default: m.AuditLogsPage,
  })),
);
const FailedLoginsPage = lazy(() =>
  import("@dashboards/admin/FailedLoginsPage").then((m) => ({
    default: m.FailedLoginsPage,
  })),
);
const SessionsPage = lazy(() =>
  import("@dashboards/admin/SessionsPage").then((m) => ({
    default: m.SessionsPage,
  })),
);
const RateLimitPage = lazy(() =>
  import("@dashboards/admin/RateLimitPage").then((m) => ({
    default: m.RateLimitPage,
  })),
);

// Lazy load super admin pages
const SuperAdminResources = lazy(() =>
  import("@pages/superadmin/SuperAdminResources").then((m) => ({
    default: m.SuperAdminResources,
  })),
);
// DEPRECATED: Admin approval process removed
// const SuperAdminApprovals = lazy(() =>
//   import("@pages/superadmin/SuperAdminApprovals").then((m) => ({
//     default: m.SuperAdminApprovals,
//   })),
// );
const SuperAdminUniversities = lazy(() =>
  import("@pages/superadmin/SuperAdminUniversities").then((m) => ({
    default: m.SuperAdminUniversities,
  })),
);
const SuperAdminAdmins = lazy(() =>
  import("@pages/superadmin/SuperAdminAdmins").then((m) => ({
    default: m.SuperAdminAdmins,
  })),
);
const SuperAdminUsers = lazy(() =>
  import("@pages/superadmin/SuperAdminUsers").then((m) => ({
    default: m.SuperAdminUsers,
  })),
);
const SuperAdminAnalytics = lazy(() =>
  import("@pages/superadmin/SuperAdminAnalytics").then((m) => ({
    default: m.SuperAdminAnalytics,
  })),
);
const SuperAdminSystem = lazy(() =>
  import("@pages/superadmin/SuperAdminSystem").then((m) => ({
    default: m.SuperAdminSystem,
  })),
);
const SuperAdminVisualization = lazy(() =>
  import("@pages/superadmin/SuperAdminVisualization").then((m) => ({
    default: m.SuperAdminVisualization,
  })),
);
const SuperAdminSystemSettings = lazy(() =>
  import("@pages/superadmin/SuperAdminSystemSettings").then((m) => ({
    default: m.SuperAdminSystemSettings,
  })),
);
const SuperAdminAboutProject = lazy(() =>
  import("@pages/superadmin/SuperAdminAboutProject").then((m) => ({
    default: m.SuperAdminAboutProject,
  })),
);

// Lazy load public pages
const About = lazy(() =>
  import("@pages/About").then((m) => ({ default: m.About })),
);
const Contact = lazy(() =>
  import("@pages/Contact").then((m) => ({ default: m.Contact })),
);
const PrivacyPolicy = lazy(() =>
  import("@pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })),
);
const TermsOfService = lazy(() =>
  import("@pages/TermsOfService").then((m) => ({ default: m.TermsOfService })),
);

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredRole?: string;
}> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const getDashboard = (user: any) => {
  if (import.meta.env.DEV) {
    console.log("🔍 getDashboard called with user:", user);
  }

  if (user?.role === "admin") {
    return <AdminDashboard />;
  }
  if (user?.role === "super_admin") {
    return <SuperAdminDashboard />;
  }
  if (user?.role === "student") {
    if (user?.studentType === "high_school") {
      return <HighSchoolDashboard />;
    }
    if (user?.studentType === "university") {
      return <UniversityDashboard />;
    }
  }
  return <Navigate to="/login" replace />;
};

export const App: React.FC = () => {
  const { isInitialized, initialize } = useAuthStore();

  // Initialize auth on app load
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Initialize silently without showing loading screen
  if (!isInitialized) {
    return null;
  }

  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const toast = useToast();
  const [showSessionWarning, setShowSessionWarning] = useState(false);

  // Initialize global error handler
  useApiErrorHandler(toast);

  // Initialize session management for authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      // Start session monitoring
      sessionManager.start(
        () => {
          // Show warning when session is about to expire
          setShowSessionWarning(true);
        },
        async () => {
          // Auto logout on session timeout
          await logout();
          toast.error('Your session has expired. Please log in again.');
          window.location.href = '/login?reason=session_expired';
        }
      );

      return () => {
        // Stop session monitoring when user logs out
        sessionManager.stop();
      };
    }
  }, [isAuthenticated, logout, toast]);

  const handleExtendSession = () => {
    sessionManager.extendSession();
    setShowSessionWarning(false);
    toast.success('Session extended successfully');
  };

  const handleLogoutNow = async () => {
    setShowSessionWarning(false);
    await logout();
    window.location.href = '/login';
  };

  return (
    <>
      <PerformanceMonitor />
      
      {/* Session Timeout Warning Modal */}
      <SessionTimeoutWarning
        isOpen={showSessionWarning}
        onExtend={handleExtendSession}
        onLogout={handleLogoutNow}
      />
      
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Layout>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  isAuthenticated ? <Navigate to="/dashboard" /> : <Home />
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route
                path="/resend-verification"
                element={<ResendVerification />}
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/oauth-callback" element={<OAuthCallback />} />
              <Route path="/oauth-register" element={<OAuthRegister />} />
              <Route path="/complete-profile" element={<CompleteProfile />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={<ProtectedRoute>{getDashboard(user)}</ProtectedRoute>}
              />

              {/* High School Student Routes */}
              <Route
                path="/highschool/dashboard"
                element={
                  <ProtectedRoute requiredRole="student">
                    <HighSchoolDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/resources"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentResources />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/ai-companion"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentAICompanion />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/quizzes"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentQuizzes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/progress"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentProgress />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/promotions"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentPromotions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/profile"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/payments"
                element={
                  <ProtectedRoute requiredRole="student">
                    <StudentPayments />
                  </ProtectedRoute>
                }
              />

              {/* University Student Routes */}
              <Route
                path="/university/dashboard"
                element={
                  <ProtectedRoute requiredRole="student">
                    <UniversityDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Learning Center Deep Links (embedded in dashboard layout) */}
              <Route
                path="/student/learning-center/:subject/:chapterId"
                element={
                  <ProtectedRoute requiredRole="student">
                    <UniversityLearningCenterRoute />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/university/course-viewer/:subject"
                element={
                  <ProtectedRoute requiredRole="student">
                    <UniversityCourseViewer />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/resources"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminResources />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/students"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminStudents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/quizzes"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminQuizzes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/promotion"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <PromotionPage />
                  </ProtectedRoute>
                }
              />

              {/* Super Admin Routes */}
              <Route
                path="/superadmin/dashboard"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SuperAdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/superadmin/resources"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SuperAdminResources />
                  </ProtectedRoute>
                }
              />
              {/* DEPRECATED: Admin approval route removed */}
              {/* <Route
                path="/superadmin/approvals"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SuperAdminApprovals />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="/superadmin/universities"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SuperAdminUniversities />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/superadmin/admins"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SuperAdminAdmins />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/superadmin/users"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SuperAdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/superadmin/analytics"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SuperAdminAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/superadmin/system"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SuperAdminSystem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/superadmin/visualization"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SuperAdminVisualization />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/superadmin/settings"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SuperAdminSystemSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/superadmin/about"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SuperAdminAboutProject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/superadmin/promotion"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <PromotionPage />
                  </ProtectedRoute>
                }
              />

              {/* Security Dashboard Routes */}
              <Route
                path="/admin/security"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SecurityDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/security/audit-logs"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <AuditLogsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/security/failed-logins"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <FailedLoginsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/security/sessions"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SessionsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/security/rate-limits"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <RateLimitPage />
                  </ProtectedRoute>
                }
              />

              {/* Error Routes */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </>
  );
};
export default App;
