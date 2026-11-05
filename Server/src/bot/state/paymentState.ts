/**
 * Payment Flow State Management
 * Centralized state for multi-step payment submissions
 */

export interface PaymentFlowState {
  userId: string;
  telegramId: string;
  step: 'waiting_for_screenshot' | 'completed';
  studentCategory?: string;
  amount?: number;
  currency?: string;
  timestamp: number;
}

class PaymentStateManager {
  private states: Map<string, PaymentFlowState>;
  private readonly TTL = 30 * 60 * 1000; // 30 minutes

  constructor() {
    this.states = new Map();
    
    // Cleanup expired states every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Start a payment flow for a user
   */
  async startPaymentFlow(
    telegramId: string,
    userId: string,
    studentCategory?: string,
    amount?: number,
    currency?: string
  ): Promise<void> {
    this.states.set(telegramId, {
      userId,
      telegramId,
      step: 'waiting_for_screenshot',
      studentCategory,
      amount,
      currency,
      timestamp: Date.now(),
    });
    
    console.log(`💳 Payment flow started for user ${telegramId}`);
  }

  /**
   * Check if user is waiting for screenshot
   */
  async isWaitingForScreenshot(telegramId: string): Promise<boolean> {
    const state = this.states.get(telegramId);
    
    if (!state) return false;
    
    // Check if expired
    if (Date.now() - state.timestamp > this.TTL) {
      this.states.delete(telegramId);
      return false;
    }
    
    return state.step === 'waiting_for_screenshot';
  }

  /**
   * Get payment flow state
   */
  async getState(telegramId: string): Promise<PaymentFlowState | null> {
    const state = this.states.get(telegramId);
    
    if (!state) return null;
    
    // Check if expired
    if (Date.now() - state.timestamp > this.TTL) {
      this.states.delete(telegramId);
      return null;
    }
    
    return state;
  }

  /**
   * Update payment flow step
   */
  async updateStep(
    telegramId: string,
    step: 'waiting_for_screenshot' | 'completed'
  ): Promise<void> {
    const state = this.states.get(telegramId);
    
    if (state) {
      state.step = step;
      state.timestamp = Date.now();
    }
  }

  /**
   * Complete and clean up payment flow
   */
  async completePaymentFlow(telegramId: string): Promise<void> {
    this.states.delete(telegramId);
    console.log(`✅ Payment flow completed for user ${telegramId}`);
  }

  /**
   * Cancel payment flow
   */
  async cancelPaymentFlow(telegramId: string): Promise<void> {
    this.states.delete(telegramId);
    console.log(`❌ Payment flow cancelled for user ${telegramId}`);
  }

  /**
   * Get all active payment flows (for monitoring)
   */
  async getActiveFlows(): Promise<number> {
    return this.states.size;
  }

  /**
   * Cleanup expired states
   */
  private cleanup(): void {
    const now = Date.now();
    let expired = 0;

    for (const [telegramId, state] of this.states.entries()) {
      if (now - state.timestamp > this.TTL) {
        this.states.delete(telegramId);
        expired++;
      }
    }

    if (expired > 0) {
      console.log(`🧹 Cleaned up ${expired} expired payment states`);
    }
  }
}

// Export singleton instance
export const paymentState = new PaymentStateManager();
