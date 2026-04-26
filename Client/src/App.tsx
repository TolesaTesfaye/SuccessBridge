import React, { lazy, Suspense, useEffect } from "react";
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
import { preloadDashboardRoutes } from "@utils/routePreloader";

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
const UniversityCourseViewer = lazy(() =>
  import("@pages/student/UniversityCourseViewer").then((m) => ({
    default: m.UniversityCourseViewer,
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

// Lazy load super admin pages
const SuperAdminResources = lazy(() =>
  import("@pages/superadmin/SuperAdminResources").then((m) => ({
    default: m.SuperAdminResources,
  })),
);
const SuperAdminApprovals = lazy(() =>
  import("@pages/superadmin/SuperAdminApprovals").then((m) => ({
    default: m.SuperAdminApprovals,
  })),
);
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

  // Show loading while initializing
  if (!isInitialized) {
    return <LoadingOverlay />;
  }

  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const toast = useToast();

  // Initialize global error handler
  useApiErrorHandler(toast);

  // Preload dashboard routes based on user role
  useEffect(() => {
    if (isAuthenticated && user) {
      // Delay preloading to not block initial render
      const timer = setTimeout(() => {
        preloadDashboardRoutes(user.role, user.studentType);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <PerformanceMonitor />
      <Router>
        <Layout>
          <Suspense fallback={<LoadingOverlay message="Loading page..." />}>
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
              <Route path="/resend-verification" element={<ResendVerification />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/oauth-callback" element={<OAuthCallback />} />
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

              {/* University Student Routes */}
              <Route
                path="/university/dashboard"
                element={
                  <ProtectedRoute requiredRole="student">
                    <UniversityDashboard />
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
              <Route
                path="/superadmin/approvals"
                element={
                  <ProtectedRoute requiredRole="super_admin">
                    <SuperAdminApprovals />
                  </ProtectedRoute>
                }
              />
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
