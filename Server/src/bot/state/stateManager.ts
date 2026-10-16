/**
 * State Management for Multi-Step Flows
 * Handles conversation state for complex interactions like file uploads, registration, etc.
 */

import { logger } from '../middleware/logger.middleware.js';

/**
 * Flow types
 */
export type FlowType = 
  | 'resource_upload'
  | 'user_registration'
  | 'subject_creation'
  | 'broadcast_message'
  | 'user_search'
  | 'resource_search';

/**
 * State data structure
 */
export interface FlowState {
  flowType: FlowType;
  step: number;
  data: Record<string, any>;
  startedAt: Date;
  expiresAt: Date;
}

/**
 * State Manager Class
 */
export class StateManager {
  private static instance: StateManager;
  private states: Map<string, FlowState> = new Map();
  private readonly DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes

  private constructor() {
    // Clean up expired states every 5 minutes
    setInterval(() => {
      this.cleanupExpiredStates();
    }, 5 * 60 * 1000);
  }

  public static getInstance(): StateManager {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return StateManager.instance;
  }

  /**
   * Get state key
   */
  private getKey(userId: string, flowType: FlowType): string {
    return `${userId}:${flowType}`;
  }

  /**
   * Start a new flow
   */
  startFlow(
    userId: string,
    flowType: FlowType,
    initialData: Record<string, any> = {},
    ttlMs?: number
  ): FlowState {
    const key = this.getKey(userId, flowType);
    const now = new Date();
    const ttl = ttlMs || this.DEFAULT_TTL;

    const state: FlowState = {
      flowType,
      step: 1,
      data: initialData,
      startedAt: now,
      expiresAt: new Date(now.getTime() + ttl),
    };

    this.states.set(key, state);

    logger.info(`Flow started: ${flowType}`, {
      userId,
      flowType,
      step: 1,
    });

    return state;
  }

  /**
   * Get current flow state
   */
  getState(userId: string, flowType: FlowType): FlowState | null {
    const key = this.getKey(userId, flowType);
    const state = this.states.get(key);

    if (!state) {
      return null;
    }

    // Check if expired
    if (new Date() > state.expiresAt) {
      logger.warn(`Flow expired: ${flowType}`, { userId, flowType });
      this.states.delete(key);
      return null;
    }

    return state;
  }

  /**
   * Update flow data
   */
  updateData(
    userId: string,
    flowType: FlowType,
    newData: Record<string, any>
  ): FlowState | null {
    const state = this.getState(userId, flowType);

    if (!state) {
      logger.warn(`Attempted to update non-existent flow: ${flowType}`, { userId });
      return null;
    }

    state.data = { ...state.data, ...newData };
    
    const key = this.getKey(userId, flowType);
    this.states.set(key, state);

    logger.debug(`Flow data updated: ${flowType}`, {
      userId,
      flowType,
      step: state.step,
      dataKeys: Object.keys(newData),
    });

    return state;
  }

  /**
   * Advance to next step
   */
  nextStep(userId: string, flowType: FlowType, newData?: Record<string, any>): FlowState | null {
    const state = this.getState(userId, flowType);

    if (!state) {
      logger.warn(`Attempted to advance non-existent flow: ${flowType}`, { userId });
      return null;
    }

    state.step += 1;
    if (newData) {
      state.data = { ...state.data, ...newData };
    }

    const key = this.getKey(userId, flowType);
    this.states.set(key, state);

    logger.info(`Flow advanced: ${flowType}`, {
      userId,
      flowType,
      step: state.step,
    });

    return state;
  }

  /**
   * Go back to previous step
   */
  previousStep(userId: string, flowType: FlowType): FlowState | null {
    const state = this.getState(userId, flowType);

    if (!state) {
      return null;
    }

    if (state.step > 1) {
      state.step -= 1;
      
      const key = this.getKey(userId, flowType);
      this.states.set(key, state);

      logger.info(`Flow step back: ${flowType}`, {
        userId,
        flowType,
        step: state.step,
      });
    }

    return state;
  }

  /**
   * Complete and clear flow
   */
  completeFlow(userId: string, flowType: FlowType): FlowState | null {
    const state = this.getState(userId, flowType);

    if (!state) {
      return null;
    }

    const key = this.getKey(userId, flowType);
    this.states.delete(key);

    logger.info(`Flow completed: ${flowType}`, {
      userId,
      flowType,
      totalSteps: state.step,
      duration: Date.now() - state.startedAt.getTime(),
    });

    return state;
  }

  /**
   * Cancel and clear flow
   */
  cancelFlow(userId: string, flowType: FlowType): boolean {
    const key = this.getKey(userId, flowType);
    const existed = this.states.has(key);

    if (existed) {
      this.states.delete(key);
      
      logger.info(`Flow cancelled: ${flowType}`, {
        userId,
        flowType,
      });
    }

    return existed;
  }

  /**
   * Check if user has active flow
   */
  hasActiveFlow(userId: string, flowType: FlowType): boolean {
    return this.getState(userId, flowType) !== null;
  }

  /**
   * Get all active flows for user
   */
  getUserFlows(userId: string): FlowState[] {
    const flows: FlowState[] = [];

    for (const [key, state] of this.states.entries()) {
      if (key.startsWith(`${userId}:`)) {
        // Check if expired
        if (new Date() > state.expiresAt) {
          this.states.delete(key);
        } else {
          flows.push(state);
        }
      }
    }

    return flows;
  }

  /**
   * Clear all flows for user
   */
  clearUserFlows(userId: string): number {
    let count = 0;

    for (const key of this.states.keys()) {
      if (key.startsWith(`${userId}:`)) {
        this.states.delete(key);
        count++;
      }
    }

    if (count > 0) {
      logger.info(`Cleared all flows for user`, { userId, count });
    }

    return count;
  }

  /**
   * Clean up expired states
   */
  private cleanupExpiredStates(): void {
    const now = new Date();
    let cleaned = 0;

    for (const [key, state] of this.states.entries()) {
      if (now > state.expiresAt) {
        this.states.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      logger.debug(`Cleaned up expired states`, { count: cleaned });
    }
  }

  /**
   * Get total active states count
   */
  getActiveStatesCount(): number {
    return this.states.size;
  }

  /**
   * Get state statistics
   */
  getStats(): {
    totalStates: number;
    byFlowType: Record<string, number>;
    oldestState: Date | null;
  } {
    const byFlowType: Record<string, number> = {};
    let oldestState: Date | null = null;

    for (const state of this.states.values()) {
      // Count by flow type
      byFlowType[state.flowType] = (byFlowType[state.flowType] || 0) + 1;

      // Track oldest
      if (!oldestState || state.startedAt < oldestState) {
        oldestState = state.startedAt;
      }
    }

    return {
      totalStates: this.states.size,
      byFlowType,
      oldestState,
    };
  }
}

// Export singleton instance
export const stateManager = StateManager.getInstance();

/**
 * Helper function to get or start flow
 */
export function getOrStartFlow(
  userId: string,
  flowType: FlowType,
  initialData?: Record<string, any>
): FlowState {
  let state = stateManager.getState(userId, flowType);
  
  if (!state) {
    state = stateManager.startFlow(userId, flowType, initialData);
  }

  return state;
}

/**
 * Helper function to check if message is cancellation command
 */
export function isCancelCommand(text: string): boolean {
  const cancelCommands = ['/cancel', 'cancel', 'abort', 'stop', 'quit'];
  return cancelCommands.includes(text.toLowerCase().trim());
}

export default StateManager;
