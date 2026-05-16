/**
 * Session Management Utility
 * Implements session timeout with inactivity tracking
 */

// Session timeout configuration (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
const WARNING_BEFORE_TIMEOUT = 5 * 60 * 1000; // Warn 5 minutes before timeout

// Session state
let sessionTimer: ReturnType<typeof setTimeout> | null = null;
let warningTimer: ReturnType<typeof setTimeout> | null = null;
let lastActivity = Date.now();
let sessionActive = true;
let onSessionExpireCallback: (() => void) | null = null;
let onSessionWarningCallback: ((remainingSeconds: number) => void) | null =
  null;

// Events to track user activity
const ACTIVITY_EVENTS = [
  "mousedown",
  "mousemove",
  "keypress",
  "scroll",
  "touchstart",
  "click",
  "wheel",
];

/**
 * Initialize session management
 * Call this on app startup after successful login
 */
export function initSessionManager(options?: {
  onExpire?: () => void;
  onWarning?: (remainingSeconds: number) => void;
  timeout?: number;
}) {
  if (options?.onExpire) {
    onSessionExpireCallback = options.onExpire;
  }
  if (options?.onWarning) {
    onSessionWarningCallback = options.onWarning;
  }

  // Reset last activity time
  lastActivity = Date.now();
  sessionActive = true;

  // Add event listeners for activity tracking
  ACTIVITY_EVENTS.forEach((event) => {
    window.addEventListener(event, handleActivity);
  });

  // Start the session timer
  resetSessionTimer();

  console.info(
    `[Session] Session management initialized with ${SESSION_TIMEOUT / 60000} minute timeout`,
  );
}

/**
 * Handle user activity
 */
function handleActivity() {
  if (!sessionActive) return;

  lastActivity = Date.now();
  resetSessionTimer();
}

/**
 * Reset the session timer
 */
function resetSessionTimer() {
  // Clear existing timers
  if (sessionTimer) {
    clearTimeout(sessionTimer);
  }
  if (warningTimer) {
    clearTimeout(warningTimer);
  }

  // Set warning timer (if callback provided)
  if (onSessionWarningCallback) {
    const callback = onSessionWarningCallback;
    warningTimer = setTimeout(() => {
      if (sessionActive && callback) {
        const remainingSeconds = Math.ceil(
          (SESSION_TIMEOUT - WARNING_BEFORE_TIMEOUT) / 1000,
        );
        callback(remainingSeconds);
      }
    }, SESSION_TIMEOUT - WARNING_BEFORE_TIMEOUT);
  }

  // Set session expiration timer
  sessionTimer = setTimeout(() => {
    expireSession();
  }, SESSION_TIMEOUT);
}

/**
 * Expire the current session
 */
function expireSession() {
  sessionActive = false;

  // Clear timers
  if (sessionTimer) {
    clearTimeout(sessionTimer);
    sessionTimer = null;
  }
  if (warningTimer) {
    clearTimeout(warningTimer);
    warningTimer = null;
  }

  // Remove event listeners
  ACTIVITY_EVENTS.forEach((event) => {
    window.removeEventListener(event, handleActivity);
  });

  // Call expiration callback
  if (onSessionExpireCallback) {
    onSessionExpireCallback();
  }

  console.warn("[Session] Session expired due to inactivity");
}

/**
 * Check if session is active
 */
export function checkSessionActive(): boolean {
  return sessionActive;
}

/**
 * Get time until session expires (in seconds)
 */
export function getSessionTimeRemaining(): number {
  if (!sessionActive) return 0;
  const elapsed = Date.now() - lastActivity;
  const remaining = SESSION_TIMEOUT - elapsed;
  return Math.max(0, Math.ceil(remaining / 1000));
}

/**
 * Get session timeout duration (in milliseconds)
 */
export function getSessionTimeout(): number {
  return SESSION_TIMEOUT;
}

/**
 * Extend the session (reset timeout)
 * Useful when user performs actions that should extend the session
 */
export function extendSession() {
  if (sessionActive) {
    lastActivity = Date.now();
    resetSessionTimer();
    console.info("[Session] Session extended");
  }
}

/**
 * Manually end the session
 */
export function endSession() {
  expireSession();
}

/**
 * Cleanup session manager (call on logout)
 */
export function cleanupSessionManager() {
  // Clear timers
  if (sessionTimer) {
    clearTimeout(sessionTimer);
    sessionTimer = null;
  }
  if (warningTimer) {
    clearTimeout(warningTimer);
    warningTimer = null;
  }

  // Remove event listeners
  ACTIVITY_EVENTS.forEach((event) => {
    window.removeEventListener(event, handleActivity);
  });

  sessionActive = false;
  onSessionExpireCallback = null;
  onSessionWarningCallback = null;

  console.info("[Session] Session manager cleaned up");
}

/**
 * Session manager API object for external use
 */
export const sessionManager = {
  /**
   * Start session monitoring
   * @param onWarning - Callback when session is about to expire
   * @param onExpire - Callback when session expires
   */
  start: (
    onWarning?: (remainingSeconds: number) => void,
    onExpire?: () => void,
  ) => {
    initSessionManager({
      onWarning,
      onExpire,
    });
  },

  /**
   * Stop session monitoring
   */
  stop: () => {
    cleanupSessionManager();
  },

  /**
   * Extend the current session
   */
  extendSession: () => {
    extendSession();
  },

  /**
   * Check if session is active
   */
  isSessionActive: () => {
    return checkSessionActive();
  },

  /**
   * Get time remaining until session expires (in seconds)
   */
  getTimeRemaining: () => {
    return getSessionTimeRemaining();
  },
};
