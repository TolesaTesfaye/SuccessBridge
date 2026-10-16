/**
 * Logger Middleware for Telegram Bot
 * Logs all interactions, commands, and errors
 */

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  CRITICAL = 'critical',
}

/**
 * Logger class
 */
export class BotLogger {
  private static instance: BotLogger;

  private constructor() {}

  public static getInstance(): BotLogger {
    if (!BotLogger.instance) {
      BotLogger.instance = new BotLogger();
    }
    return BotLogger.instance;
  }

  /**
   * Format log message
   */
  private formatLog(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const emoji = this.getEmoji(level);
    
    const logObject = {
      timestamp,
      level,
      message,
      ...(meta && { meta }),
    };

    // Console output with emoji
    console.log(`${emoji} [${level.toUpperCase()}] ${message}`);
    
    // Return JSON for log aggregation
    return JSON.stringify(logObject);
  }

  /**
   * Get emoji for log level
   */
  private getEmoji(level: LogLevel): string {
    const emojis: Record<LogLevel, string> = {
      [LogLevel.DEBUG]: '🔍',
      [LogLevel.INFO]: 'ℹ️',
      [LogLevel.WARN]: '⚠️',
      [LogLevel.ERROR]: '❌',
      [LogLevel.CRITICAL]: '🔴',
    };
    return emojis[level] || '📝';
  }

  /**
   * Debug log
   */
  debug(message: string, meta?: any): void {
    this.formatLog(LogLevel.DEBUG, message, meta);
  }

  /**
   * Info log
   */
  info(message: string, meta?: any): void {
    this.formatLog(LogLevel.INFO, message, meta);
  }

  /**
   * Warning log
   */
  warn(message: string, meta?: any): void {
    this.formatLog(LogLevel.WARN, message, meta);
  }

  /**
   * Error log
   */
  error(message: string, error?: Error, meta?: any): void {
    this.formatLog(LogLevel.ERROR, message, {
      error: error?.message,
      stack: error?.stack,
      ...meta,
    });
  }

  /**
   * Critical log
   */
  critical(message: string, error?: Error, meta?: any): void {
    this.formatLog(LogLevel.CRITICAL, message, {
      error: error?.message,
      stack: error?.stack,
      ...meta,
    });
  }

  /**
   * Log command execution
   */
  logCommand(command: string, userId: string, username?: string, chatId?: number): void {
    this.info(`Command: ${command}`, {
      type: 'command',
      command,
      userId,
      username,
      chatId,
    });
  }

  /**
   * Log callback query
   */
  logCallback(data: string, userId: string, username?: string, chatId?: number): void {
    this.info(`Callback: ${data}`, {
      type: 'callback',
      data,
      userId,
      username,
      chatId,
    });
  }

  /**
   * Log message
   */
  logMessage(text: string, userId: string, username?: string, chatId?: number): void {
    this.info(`Message: ${text.substring(0, 50)}...`, {
      type: 'message',
      userId,
      username,
      chatId,
    });
  }

  /**
   * Log admin action
   */
  logAdminAction(action: string, adminId: string, targetId?: string, meta?: any): void {
    this.info(`Admin action: ${action}`, {
      type: 'admin_action',
      action,
      adminId,
      targetId,
      ...meta,
    });
  }

  /**
   * Log file upload
   */
  logFileUpload(fileName: string, fileSize: number, userId: string, mimeType?: string): void {
    this.info(`File upload: ${fileName}`, {
      type: 'file_upload',
      fileName,
      fileSize,
      mimeType,
      userId,
    });
  }

  /**
   * Log resource access
   */
  logResourceAccess(resourceId: string, userId: string, action: 'view' | 'download'): void {
    this.info(`Resource ${action}: ${resourceId}`, {
      type: 'resource_access',
      resourceId,
      userId,
      action,
    });
  }
}

// Export singleton instance
export const logger = BotLogger.getInstance();

/**
 * Middleware to log all interactions
 */
export function logInteraction(handler: Function) {
  return async (bot: any, msgOrQuery: any) => {
    const isQuery = msgOrQuery.message !== undefined; // It's a callback query
    
    if (isQuery) {
      // Log callback query
      logger.logCallback(
        msgOrQuery.data,
        msgOrQuery.from?.id?.toString(),
        msgOrQuery.from?.username,
        msgOrQuery.message?.chat?.id
      );
    } else {
      // Log message or command
      const text = msgOrQuery.text || msgOrQuery.caption || '[media]';
      const isCommand = text.startsWith('/');
      
      if (isCommand) {
        logger.logCommand(
          text.split(' ')[0],
          msgOrQuery.from?.id?.toString(),
          msgOrQuery.from?.username,
          msgOrQuery.chat?.id
        );
      } else {
        logger.logMessage(
          text,
          msgOrQuery.from?.id?.toString(),
          msgOrQuery.from?.username,
          msgOrQuery.chat?.id
        );
      }
    }

    // Execute handler
    await handler(bot, msgOrQuery);
  };
}

export default logger;
