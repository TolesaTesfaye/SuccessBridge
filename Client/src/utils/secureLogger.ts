/**
 * Secure Logger Utility
 * Prevents sensitive data from being logged in production
 */

// List of sensitive field names to sanitize
const SENSITIVE_FIELDS = [
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "secret",
  "apiKey",
  "apiSecret",
  "authorization",
  "cookie",
  "session",
  "email",
  "phone",
  "address",
  "ssn",
  "creditCard",
  "cvv",
];

// Check if running in production
const isProduction = import.meta.env.PROD;

/**
 * Sanitize data by removing sensitive fields
 */
function sanitizeData(data: any, depth = 0): any {
  // Prevent infinite recursion
  if (depth > 5) return "[MAX_DEPTH]";

  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === "string") {
    // Truncate very long strings
    return data.length > 1000 ? data.substring(0, 1000) + "..." : data;
  }

  if (typeof data === "object" && !Array.isArray(data)) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      if (SENSITIVE_FIELDS.some((field) => lowerKey.includes(field))) {
        sanitized[key] = "[SANITIZED]";
      } else {
        sanitized[key] = sanitizeData(value, depth + 1);
      }
    }
    return sanitized;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item, depth + 1));
  }

  return data;
}

/**
 * Secure logger that sanitizes sensitive data
 */
export const secureLogger = {
  /**
   * Log a message with optional data (sanitized in production)
   */
  log(message: string, data?: any) {
    if (isProduction) {
      console.log(`[SuccessBridge] ${message}`, data ? sanitizeData(data) : "");
    } else {
      console.log(`[SuccessBridge] ${message}`, data || "");
    }
  },

  /**
   * Log a warning with optional data (sanitized in production)
   */
  warn(message: string, data?: any) {
    if (isProduction) {
      console.warn(
        `[SuccessBridge] WARNING: ${message}`,
        data ? sanitizeData(data) : "",
      );
    } else {
      console.warn(`[SuccessBridge] WARNING: ${message}`, data || "");
    }
  },

  /**
   * Log an error with optional data (sanitized in production)
   */
  error(message: string, error?: any) {
    if (isProduction) {
      console.error(
        `[SuccessBridge] ERROR: ${message}`,
        error ? sanitizeData(error) : "",
      );
    } else {
      console.error(`[SuccessBridge] ERROR: ${message}`, error || "");
    }
  },

  /**
   * Log info message (always shown)
   */
  info(message: string) {
    console.info(`[SuccessBridge] INFO: ${message}`);
  },

  /**
   * Log debug message (only in development)
   */
  debug(message: string, data?: any) {
    if (!isProduction) {
      console.debug(`[SuccessBridge] DEBUG: ${message}`, data || "");
    }
  },
};

/**
 * Create a sanitized copy of an object for logging
 */
export function sanitizeForLogging(data: any): any {
  return sanitizeData(data);
}

/**
 * Check if a field name is sensitive
 */
export function isSensitiveField(fieldName: string): boolean {
  const lower = fieldName.toLowerCase();
  return SENSITIVE_FIELDS.some((field) => lower.includes(field));
}
