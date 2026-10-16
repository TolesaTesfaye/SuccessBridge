/**
 * Error Handling Exports
 */

export {
  GlobalErrorHandler,
  handleError,
  withErrorHandling,
  BotError,
  ValidationError,
  PermissionError,
  ResourceNotFoundError,
  RateLimitError,
  DatabaseError,
  ExternalServiceError,
} from './globalErrorHandler.js';

export type { ErrorContext, ErrorType } from './globalErrorHandler.js';
