/**
 * Pattern-Based Callback Router
 * Provides clean, maintainable routing for inline keyboard callbacks
 */

import { validateCallbackData } from '../middleware/validation.middleware.js';
import { logger } from '../middleware/logger.middleware.js';

/**
 * Callback handler function type
 */
export type CallbackHandler = (bot: any, query: any, params: CallbackParams) => Promise<void>;

/**
 * Parsed callback parameters
 */
export interface CallbackParams {
  [key: string]: string;
}

/**
 * Route definition
 */
interface CallbackRoute {
  pattern: RegExp;
  handler: CallbackHandler;
  description?: string;
}

/**
 * Callback Router Class
 */
export class CallbackRouter {
  private routes: CallbackRoute[] = [];

  /**
   * Register a route with a pattern
   * 
   * Patterns support:
   * - :param - named parameter (matches anything except |)
   * - * - wildcard (matches rest of string)
   * 
   * Examples:
   * - "level_:level" → matches "level_high_school", params: { level: "high_school" }
   * - "grade_:grade" → matches "grade_Grade 11", params: { grade: "Grade 11" }
   * - "download_:id" → matches "download_123", params: { id: "123" }
   * - "stream_:grade|:stream" → matches "stream_Grade 11|natural", params: { grade: "Grade 11", stream: "natural" }
   */
  register(pattern: string, handler: CallbackHandler, description?: string): void {
    const regex = this.patternToRegex(pattern);
    this.routes.push({ pattern: regex, handler, description });
  }

  /**
   * Register multiple routes at once
   */
  registerRoutes(routes: Array<{ pattern: string; handler: CallbackHandler; description?: string }>): void {
    routes.forEach(route => this.register(route.pattern, route.handler, route.description));
  }

  /**
   * Route a callback query to the appropriate handler
   */
  async route(bot: any, query: any): Promise<boolean> {
    const data = query.data;

    if (!data) {
      logger.warn('Callback query has no data', { queryId: query.id });
      return false;
    }

    // Validate callback data
    try {
      validateCallbackData(data);
    } catch (error) {
      logger.error('Invalid callback data', error as Error, { data });
      throw error;
    }

    // Log callback
    logger.logCallback(data, query.from?.id?.toString(), query.from?.username, query.message?.chat?.id);

    // Answer callback query to remove loading state
    await bot.answerCallbackQuery(query.id).catch(() => {});

    // Find matching route
    for (const route of this.routes) {
      const match = data.match(route.pattern);
      if (match) {
        const params = this.extractParams(match);
        
        logger.debug(`Callback routed: ${data}`, {
          pattern: route.description || route.pattern.source,
          params,
        });

        try {
          await route.handler(bot, query, params);
          return true;
        } catch (error) {
          // Error will be caught by global error handler
          throw error;
        }
      }
    }

    // No route matched
    logger.warn('No route matched for callback', { data });
    
    await bot.sendMessage(
      query.message?.chat?.id,
      '⚠️ Unknown action. Please try again or use /help.'
    );
    
    return false;
  }

  /**
   * Convert pattern string to regex with named groups
   */
  private patternToRegex(pattern: string): RegExp {
    // Escape special regex characters except : and *
    let regexStr = pattern
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '(.*)'); // Wildcard

    // Replace :param with named capture groups
    // Matches everything except | (pipe delimiter)
    regexStr = regexStr.replace(/:(\w+)/g, '(?<$1>[^|]+)');

    return new RegExp(`^${regexStr}$`);
  }

  /**
   * Extract named parameters from regex match
   */
  private extractParams(match: RegExpMatchArray): CallbackParams {
    return match.groups || {};
  }

  /**
   * List all registered routes (for debugging)
   */
  listRoutes(): Array<{ pattern: string; description?: string }> {
    return this.routes.map(route => ({
      pattern: route.pattern.source,
      description: route.description,
    }));
  }
}

// Export singleton instance
export const callbackRouter = new CallbackRouter();

export default CallbackRouter;
