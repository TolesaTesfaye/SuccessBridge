/**
 * Security Utilities Index
 * Central export point for all security-related utilities
 */

// XSS Protection
export {
  sanitizeHTML,
  getSanitizedHTML,
  sanitizeURL,
  escapeHTML,
  isContentSafe,
} from "./xssProtection";

// Secure Logger
export {
  secureLogger,
  sanitizeForLogging,
  isSensitiveField,
} from "./secureLogger";

// Session Management
export {
  initSessionManager,
  checkSessionActive,
  getSessionTimeRemaining,
  getSessionTimeout,
  extendSession,
  endSession,
  cleanupSessionManager,
} from "./sessionManager";

// Password Validation
export {
  passwordSchema,
  PASSWORD_REQUIREMENTS,
  PasswordStrength,
  isCommonPassword,
  calculatePasswordStrength,
  validatePassword,
  generateStrongPassword,
} from "./passwordValidation";

// CSRF Protection
export {
  getCSRFToken,
  clearCSRFToken,
  getCSRFHeader,
  validateCSRFToken,
  withCSRF,
  initCSRFProtection,
  CSRFProtectedAPI,
} from "./csrfProtection";

// Import functions for initializeSecurity and cleanupSecurity
import { initSessionManager, cleanupSessionManager } from "./sessionManager";
import { initCSRFProtection, clearCSRFToken } from "./csrfProtection";

/**
 * Initialize all security features
 * Call this on app startup after successful authentication
 */
export function initializeSecurity(options?: {
  onSessionExpire?: () => void;
  onSessionWarning?: (remainingSeconds: number) => void;
}) {
  // Initialize session management
  initSessionManager({
    onExpire: options?.onSessionExpire,
    onWarning: options?.onSessionWarning,
  });

  // Initialize CSRF protection
  initCSRFProtection();

  console.info("[Security] All security features initialized");
}

/**
 * Clean up all security features
 * Call this on logout
 */
export function cleanupSecurity() {
  cleanupSessionManager();
  clearCSRFToken();
  console.info("[Security] All security features cleaned up");
}
