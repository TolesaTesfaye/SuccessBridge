/**
 * Client-side Rate Limiter
 * Prevents API abuse by limiting request frequency
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  message?: string;
}

interface RequestRecord {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RequestRecord> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = {
      maxRequests: config.maxRequests || 10,
      windowMs: config.windowMs || 60000, // 1 minute default
      message: config.message || 'Too many requests. Please try again later.',
    };

    // Clean up old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  /**
   * Check if request is allowed
   */
  public checkLimit(key: string): { allowed: boolean; retryAfter?: number; message?: string } {
    const now = Date.now();
    const record = this.requests.get(key);

    // No previous requests or window expired
    if (!record || now >= record.resetTime) {
      this.requests.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs,
      });
      return { allowed: true };
    }

    // Within rate limit
    if (record.count < this.config.maxRequests) {
      record.count++;
      return { allowed: true };
    }

    // Rate limit exceeded
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return {
      allowed: false,
      retryAfter,
      message: `${this.config.message} Retry after ${retryAfter} seconds.`,
    };
  }

  /**
   * Reset rate limit for a specific key
   */
  public reset(key: string): void {
    this.requests.delete(key);
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.requests.entries()) {
      if (now >= record.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  /**
   * Get remaining requests for a key
   */
  public getRemaining(key: string): number {
    const record = this.requests.get(key);
    if (!record || Date.now() >= record.resetTime) {
      return this.config.maxRequests;
    }
    return Math.max(0, this.config.maxRequests - record.count);
  }
}

// Create rate limiters for different endpoints
export const loginRateLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many login attempts.',
});

export const registerRateLimiter = new RateLimiter({
  maxRequests: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many registration attempts.',
});

export const apiRateLimiter = new RateLimiter({
  maxRequests: 100,
  windowMs: 60 * 1000, // 1 minute
  message: 'Too many API requests.',
});

export const uploadRateLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
  message: 'Too many upload requests.',
});

/**
 * Rate limit error class
 */
export class RateLimitError extends Error {
  public retryAfter: number;

  constructor(message: string, retryAfter: number) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

/**
 * Helper function to check rate limit and throw error if exceeded
 */
export const checkRateLimit = (
  limiter: RateLimiter,
  key: string,
): void => {
  const result = limiter.checkLimit(key);
  if (!result.allowed) {
    throw new RateLimitError(
      result.message || 'Rate limit exceeded',
      result.retryAfter || 60,
    );
  }
};
