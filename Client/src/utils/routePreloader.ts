/**
 * Route Preloader Utility
 * Prefetches route components on hover/focus for instant navigation
 */

type PreloadFunction = () => Promise<any>;

const preloadedRoutes = new Set<string>();

export const routePreloaders: Record<string, PreloadFunction> = {
  // Student routes
  '/student/quizzes': () => import('@pages/student/StudentQuizzes'),
  '/student/progress': () => import('@pages/student/StudentProgress'),
  '/student/profile': () => import('@pages/student/StudentProfile'),
  '/student/promotions': () => import('@pages/student/StudentPromotions'),
  '/student/resources': () => import('@pages/student/StudentResources'),
  
  // Admin routes
  '/admin/quizzes': () => import('@pages/admin/AdminQuizzes'),
  '/admin/analytics': () => import('@pages/admin/AdminAnalytics'),
  '/admin/settings': () => import('@pages/admin/AdminSettings'),
  '/admin/resources': () => import('@pages/admin/AdminResources'),
  '/admin/students': () => import('@pages/admin/AdminStudents'),
  
  // Super Admin routes
  '/superadmin/resources': () => import('@pages/superadmin/SuperAdminResources'),
  '/superadmin/universities': () => import('@pages/superadmin/SuperAdminUniversities'),
  '/superadmin/users': () => import('@pages/superadmin/SuperAdminUsers'),
  '/superadmin/admins': () => import('@pages/superadmin/SuperAdminAdmins'),
  '/superadmin/analytics': () => import('@pages/superadmin/SuperAdminAnalytics'),
  '/superadmin/system': () => import('@pages/superadmin/SuperAdminSystem'),
  '/superadmin/settings': () => import('@pages/superadmin/SuperAdminSystemSettings'),
  
  // Public routes
  '/about': () => import('@pages/About'),
  '/contact': () => import('@pages/Contact'),
  '/privacy-policy': () => import('@pages/PrivacyPolicy'),
  '/terms-of-service': () => import('@pages/TermsOfService'),
};

/**
 * Preload a route component
 */
export const preloadRoute = (path: string): void => {
  if (preloadedRoutes.has(path)) {
    return; // Already preloaded
  }

  const preloader = routePreloaders[path];
  if (preloader) {
    preloadedRoutes.add(path);
    preloader().catch((error) => {
      console.warn(`Failed to preload route: ${path}`, error);
      preloadedRoutes.delete(path); // Allow retry
    });
  }
};

/**
 * Preload multiple routes
 */
export const preloadRoutes = (paths: string[]): void => {
  paths.forEach(preloadRoute);
};

/**
 * Hook for link hover/focus preloading
 */
export const useLinkPreload = (path: string) => {
  return {
    onMouseEnter: () => preloadRoute(path),
    onFocus: () => preloadRoute(path),
  };
};

/**
 * Preload routes based on user role
 */
export const preloadDashboardRoutes = (role: string, studentType?: string): void => {
  if (role === 'student') {
    preloadRoutes([
      '/student/quizzes',
      '/student/progress',
      '/student/profile',
    ]);
  } else if (role === 'admin') {
    preloadRoutes([
      '/admin/quizzes',
      '/admin/analytics',
      '/admin/resources',
    ]);
  } else if (role === 'super_admin') {
    preloadRoutes([
      '/superadmin/resources',
      '/superadmin/universities',
      '/superadmin/users',
    ]);
  }
};
