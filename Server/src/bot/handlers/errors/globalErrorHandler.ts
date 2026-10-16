/**
 * Global Error Handler for Telegram Bot
 * Centralizes error handling, logging, and user notifications
 */

import { config } from '../../../config/environment.js';

// Custom Error Types
export class BotError extends Error {
  constructor(
    message: string,
    public readonly type: ErrorType,
    public readonly context?: ErrorContext,
    public readonly isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends BotError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 'validation', context);
  }
}

export class PermissionError extends BotError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 'permission', context);
  }
}

export class ResourceNotFoundError extends BotError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 'not_found', context);
  }
}

export class RateLimitError extends BotError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 'rate_limit', context);
  }
}

export class DatabaseError extends BotError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 'database', context, false); // Not operational
  }
}

export class ExternalServiceError extends BotError {
  constructor(message: string, context?: ErrorContext) {
    super(message, 'external_service', context, false); // Not operational
  }
}

// Types
export type ErrorType = 
  | 'validation' 
  | 'permission' 
  | 'not_found' 
  | 'rate_limit' 
  | 'database' 
  | 'external_service' 
  | 'unknown';

export interface ErrorContext {
  chatId?: number;
  userId?: string;
  username?: string;
  command?: string;
  callbackData?: string;
  action?: string;
  metadata?: Record<string, any>;
}

interface ErrorLog {
  timestamp: string;
  level: 'error' | 'warn' | 'critical';
  type: ErrorType;
  message: string;
  stack?: string;
  context?: ErrorContext;
  userNotified: boolean;
  adminNotified: boolean;
}

/**
 * Global Error Handler Class
 */
export class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private errorCount: Map<string, number> = new Map();
  private readonly ERROR_THRESHOLD = 10; // Alert after 10 errors in 5 minutes
  private readonly TIME_WINDOW = 5 * 60 * 1000; // 5 minutes
  private lastAdminNotification: number = 0;
  private readonly ADMIN_ALERT_COOLDOWN = 60 * 1000; // 1 minute cooldown between admin alerts

  private constructor() {
    // Clean up error counts periodically
    setInterval(() => {
      this.errorCount.clear();
    }, this.TIME_WINDOW);
  }

  public static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  /**
   * Main error handling method
   */
  async handle(error: Error, bot: any, context: ErrorContext = {}): Promise<void> {
    try {
      // Track error frequency
      this.trackError(context.userId || 'system');

      // Determine error severity
      const severity = this.getSeverity(error);
      
      // Log the error
      this.logError(error, context, severity);

      // Notify user if chatId is available
      let userNotified = false;
      if (context.chatId) {
        userNotified = await this.notifyUser(bot, context.chatId, error);
      }

      // Notify admins for critical/non-operational errors
      let adminNotified = false;
      if (this.shouldNotifyAdmins(error, context)) {
        adminNotified = await this.notifyAdmins(bot, error, context);
      }

      // Log to persistent storage (optional - can be implemented later)
      await this.persistError({
        timestamp: new Date().toISOString(),
        level: severity,
        type: this.getErrorType(error),
        message: error.message,
        stack: error.stack,
        context,
        userNotified,
        adminNotified,
      });

      // Check if error rate is too high
      if (this.isErrorRateTooHigh(context.userId || 'system')) {
        await this.handleHighErrorRate(bot, context);
      }

    } catch (handlerError) {
      // Last resort: log to console if error handler itself fails
      console.error('❌ Error handler failed:', handlerError);
      console.error('❌ Original error:', error);
    }
  }

  /**
   * Notify user about the error
   */
  private async notifyUser(bot: any, chatId: number, error: Error): Promise<boolean> {
    try {
      let message: string;

      if (error instanceof ValidationError) {
        message = `⚠️ ${error.message}`;
      } else if (error instanceof PermissionError) {
        message = `⛔ ${error.message || 'You don\'t have permission to perform this action.'}`;
      } else if (error instanceof ResourceNotFoundError) {
        message = `❌ ${error.message || 'Resource not found.'}`;
      } else if (error instanceof RateLimitError) {
        message = `⏳ ${error.message || 'Too many requests. Please wait a moment and try again.'}`;
      } else if (error instanceof DatabaseError) {
        message = '❌ Database error. Our team has been notified. Please try again later.';
      } else if (error instanceof ExternalServiceError) {
        message = '❌ External service unavailable. Please try again later.';
      } else {
        message = '❌ Something went wrong. Please try again or contact support if the issue persists.';
      }

      // Add help button for non-validation errors
      const keyboard = error instanceof ValidationError ? undefined : {
        inline_keyboard: [
          [{ text: '❓ Get Help', callback_data: 'help_support' }],
          [{ text: '🔙 Main Menu', callback_data: 'main_menu' }],
        ],
      };

      await bot.sendMessage(chatId, message, {
        parse_mode: 'Markdown',
        reply_markup: keyboard,
      });

      return true;
    } catch (notifyError) {
      console.error('Failed to notify user:', notifyError);
      return false;
    }
  }

  /**
   * Notify admins about critical errors
   */
  private async notifyAdmins(bot: any, error: Error, context: ErrorContext): Promise<boolean> {
    try {
      const superAdminTelegramId = '2123391764'; // Your Telegram ID

      const message = `
🚨 *Critical Error Alert*

*Type:* ${this.getErrorType(error)}
*Message:* ${error.message}

*Context:*
${context.userId ? `• User ID: ${context.userId}` : ''}
${context.username ? `• Username: @${context.username}` : ''}
${context.command ? `• Command: ${context.command}` : ''}
${context.callbackData ? `• Callback: ${context.callbackData}` : ''}
${context.action ? `• Action: ${context.action}` : ''}

*Time:* ${new Date().toLocaleString()}

${error.stack ? `\`\`\`\n${error.stack.substring(0, 500)}\n\`\`\`` : ''}
      `.trim();

      this.lastAdminNotification = Date.now();
      await bot.sendMessage(superAdminTelegramId, message, {
        parse_mode: 'Markdown',
      });

      return true;
    } catch (notifyError) {
      console.error('Failed to notify admins:', notifyError);
      return false;
    }
  }

  /**
   * Log error to console with formatting
   */
  private logError(error: Error, context: ErrorContext, severity: 'error' | 'warn' | 'critical'): void {
    const emoji = severity === 'critical' ? '🔴' : severity === 'error' ? '❌' : '⚠️';
    
    console.error(`${emoji} [${severity.toUpperCase()}] ${error.name}: ${error.message}`);
    
    if (context.userId) {
      console.error(`   User: ${context.userId} (@${context.username || 'unknown'})`);
    }
    
    if (context.command) {
      console.error(`   Command: ${context.command}`);
    }
    
    if (context.callbackData) {
      console.error(`   Callback: ${context.callbackData}`);
    }
    
    if (context.action) {
      console.error(`   Action: ${context.action}`);
    }

    if (context.metadata) {
      console.error(`   Metadata:`, JSON.stringify(context.metadata, null, 2));
    }
    
    if (error.stack && severity === 'critical') {
      console.error(`   Stack:\n${error.stack}`);
    }
  }

  /**
   * Determine error severity
   */
  private getSeverity(error: Error): 'error' | 'warn' | 'critical' {
    if (error instanceof ValidationError || error instanceof RateLimitError) {
      return 'warn';
    }
    
    if (error instanceof DatabaseError || error instanceof ExternalServiceError) {
      return 'critical';
    }

    if (error instanceof BotError && !error.isOperational) {
      return 'critical';
    }

    return 'error';
  }

  /**
   * Get error type
   */
  private getErrorType(error: Error): ErrorType {
    if (error instanceof BotError) {
      return error.type;
    }
    return 'unknown';
  }

  /**
   * Check if admins should be notified
   */
  private shouldNotifyAdmins(error: Error, context: ErrorContext): boolean {
    // Never notify admins for polling/internal network disconnects
    if (
      context.action === 'polling' ||
      error.message?.includes('getUpdates') ||
      error.message?.includes('Conflict') ||
      error.message?.includes('EFATAL') ||
      error.message?.includes('ETIMEDOUT')
    ) {
      return false;
    }

    // Cooldown check to prevent rate-limit flooding
    const now = Date.now();
    if (now - this.lastAdminNotification < this.ADMIN_ALERT_COOLDOWN) {
      return false;
    }

    // Always notify for critical errors
    if (this.getSeverity(error) === 'critical') {
      return true;
    }

    // Notify for database errors
    if (error instanceof DatabaseError) {
      return true;
    }

    // Notify for external service errors
    if (error instanceof ExternalServiceError) {
      return true;
    }

    // Don't notify for user errors (validation, permission)
    if (error instanceof ValidationError || error instanceof PermissionError) {
      return false;
    }

    // Notify for unknown errors
    if (!(error instanceof BotError)) {
      return true;
    }

    return false;
  }

  /**
   * Track error frequency per user
   */
  private trackError(userId: string): void {
    const count = this.errorCount.get(userId) || 0;
    this.errorCount.set(userId, count + 1);
  }

  /**
   * Check if error rate is too high
   */
  private isErrorRateTooHigh(userId: string): boolean {
    const count = this.errorCount.get(userId) || 0;
    return count >= this.ERROR_THRESHOLD;
  }

  /**
   * Handle high error rate (possible abuse or system issue)
   */
  private async handleHighErrorRate(bot: any, context: ErrorContext): Promise<void> {
    console.error(`🚨 High error rate detected for user: ${context.userId}`);
    
    if (context.chatId) {
      await bot.sendMessage(
        context.chatId,
        '⚠️ We\'ve detected multiple errors in your recent actions. ' +
        'Please wait a moment before trying again. If this issue persists, contact support.',
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: '💬 Contact Support', url: 'https://success-bridge-ten.vercel.app/contact' }],
            ],
          },
        }
      );
    }

    // Notify admins about potential abuse
    await this.notifyAdmins(bot, new Error(`High error rate for user ${context.userId}`), context);
  }

  /**
   * Persist error to database (implement later if needed)
   */
  private async persistError(log: ErrorLog): Promise<void> {
    // TODO: Store in database for analytics
    // For now, just log to console in JSON format for log aggregation
    console.log(JSON.stringify({
      type: 'error_log',
      ...log,
    }));
  }
}

/**
 * Convenience function for error handling
 */
export async function handleError(
  error: Error,
  bot: any,
  context: ErrorContext = {}
): Promise<void> {
  const handler = GlobalErrorHandler.getInstance();
  await handler.handle(error, bot, context);
}

/**
 * Middleware wrapper for handlers
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<void>>(
  handler: T,
  getContext?: (...args: Parameters<T>) => ErrorContext
): T {
  return (async (...args: Parameters<T>) => {
    try {
      await handler(...args);
    } catch (error) {
      const bot = args[0]; // First argument is always bot
      const context = getContext ? getContext(...args) : {};
      await handleError(error as Error, bot, context);
    }
  }) as T;
}

export default GlobalErrorHandler;
