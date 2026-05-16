/**
 * Session Management Utility
 * Handles session timeout, inactivity detection, and automatic logout
 */

import { useAuthStore } from '@store/authStore';

export interface SessionConfig {
  timeoutMs: number; // Session timeout in milliseconds
  warningMs: number; // Show warning before timeout
  checkIntervalMs: number; // How often to check for inactivity
}

class SessionManager {
  private config: SessionConfig;
  private lastActivityTime: number = Date.now();
  private timeoutTimer: NodeJS.Timeout | null = null;
  private warningTimer: NodeJS.Timeout | null = null;
  private checkInterval: NodeJS.Timeout | null = null;
  private warningCallback: (() => void) | null = null;
  private logoutCallback: (() => void) | null = null;
  private isActive: boolean = false;

  constructor(config: Partial<SessionConfig> = {}) {
    this.config = {
      timeoutMs: config.timeoutMs || 30 * 60 * 1000, // 30 minutes default
      warningMs: config.warningMs || 5 * 60 * 1000, // 5 minutes warning
      checkIntervalMs: config.checkIntervalMs || 1000, // Check every second
    };
  }

  /**
   * Start session monitoring
   */
  public start(
    onWarning?: () => void,
    onLogout?: () => void,
  ): void {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.warningCallback = onWarning || null;
    this.logoutCallback = onLogout || null;
    this.lastActivityTime = Date.now();

    // Set up activity listeners
    this.setupActivityListeners();

    // Start checking for inactivity
    this.startInactivityCheck();

    console.log('✅ Session manager started');
  }

  /**
   * Stop session monitoring
   */
  public stop(): void {
    this.isActive = false;
    this.removeActivityListeners();
    this.clearTimers();
    console.log('🛑 Session manager stopped');
  }

  /**
   * Reset session timer (called on user activity)
   */
  public resetTimer(): void {
    this.lastActivityTime = Date.now();
    this.clearTimers();
  }

  /**
   * Extend session (called when user dismisses warning)
   */
  public extendSession(): void {
    this.resetTimer();
    console.log('⏰ Session extended');
  }

  /**
   * Get remaining session time in seconds
   */
  public getRemainingTime(): number {
    const elapsed = Date.now() - this.lastActivityTime;
    const remaining = this.config.timeoutMs - elapsed;
    return Math.max(0, Math.floor(remaining / 1000));
  }

  /**
   * Check if session is about to expire
   */
  public isNearExpiry(): boolean {
    const remaining = this.getRemainingTime();
    return remaining <= this.config.warningMs / 1000;
  }

  /**
   * Set up activity listeners
   */
  private setupActivityListeners(): void {
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    events.forEach((event) => {
      window.addEventListener(event, this.handleActivity, { passive: true });
    });
  }

  /**
   * Remove activity listeners
   */
  private removeActivityListeners(): void {
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    events.forEach((event) => {
      window.removeEventListener(event, this.handleActivity);
    });
  }

  /**
   * Handle user activity
   */
  private handleActivity = (): void => {
    if (!this.isActive) return;
    this.resetTimer();
  };

  /**
   * Start checking for inactivity
   */
  private startInactivityCheck(): void {
    this.checkInterval = setInterval(() => {
      if (!this.isActive) return;

      const elapsed = Date.now() - this.lastActivityTime;
      const remaining = this.config.timeoutMs - elapsed;

      // Show warning
      if (
        remaining <= this.config.warningMs &&
        remaining > 0 &&
        this.warningCallback
      ) {
        this.warningCallback();
      }

      // Logout on timeout
      if (remaining <= 0) {
        this.handleTimeout();
      }
    }, this.config.checkIntervalMs);
  }

  /**
   * Handle session timeout
   */
  private handleTimeout(): void {
    console.warn('⏰ Session timeout - logging out');
    this.stop();

    if (this.logoutCallback) {
      this.logoutCallback();
    } else {
      // Default logout behavior
      const { logout } = useAuthStore.getState();
      logout();
    }
  }

  /**
   * Clear all timers
   */
  private clearTimers(): void {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    if (this.warningTimer) {
      clearTimeout(this.warningTimer);
      this.warningTimer = null;
    }
  }
}

// Export singleton instance
export const sessionManager = new SessionManager({
  timeoutMs: 30 * 60 * 1000, // 30 minutes
  warningMs: 5 * 60 * 1000, // 5 minutes warning
  checkIntervalMs: 1000, // Check every second
});

/**
 * React hook for session management
 */
export const useSessionManager = () => {
  const { logout } = useAuthStore();

  const startSession = (onWarning?: () => void) => {
    sessionManager.start(
      onWarning,
      async () => {
        await logout();
        window.location.href = '/login?reason=session_expired';
      },
    );
  };

  const stopSession = () => {
    sessionManager.stop();
  };

  const extendSession = () => {
    sessionManager.extendSession();
  };

  const getRemainingTime = () => {
    return sessionManager.getRemainingTime();
  };

  return {
    startSession,
    stopSession,
    extendSession,
    getRemainingTime,
    isNearExpiry: sessionManager.isNearExpiry(),
  };
};
