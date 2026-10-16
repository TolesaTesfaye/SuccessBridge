/**
 * Input Validation Middleware for Telegram Bot
 * Protects against injection attacks, malformed data, and malicious inputs
 */

import { ValidationError } from '../handlers/errors/index.js';

/**
 * Validation rules and constraints
 */
export const ValidationRules = {
  // Callback data
  CALLBACK_DATA_MAX_LENGTH: 64,
  CALLBACK_DATA_PATTERN: /^[a-z0-9_|\-:.\s]+$/i,

  // Text input
  MESSAGE_MAX_LENGTH: 4096, // Telegram limit
  USERNAME_PATTERN: /^[a-zA-Z0-9_]{3,32}$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // File upload
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'image/jpeg',
    'image/png',
  ],
  ALLOWED_FILE_EXTENSIONS: ['.pdf', '.ppt', '.pptx', '.doc', '.docx', '.jpg', '.jpeg', '.png'],

  // Resource type
  VALID_RESOURCE_TYPES: [
    'lecture-slide',
    'lecture_slide',
    'handout',
    'note',
    'module',
    'modules',
    'reference-book',
    'reference_books',
    'mid-exam',
    'mid_exam',
    'final-exam',
    'final_exam',
    'last-year-exam',
    'last_year_exam',
  ],

  // Education levels
  VALID_LEVELS: ['high_school', 'university'],
  VALID_GRADES: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'Freshman', 'Remedial'],
  VALID_STREAMS: ['natural', 'social'],

  // User roles
  VALID_ROLES: ['student', 'admin', 'super_admin', 'content_manager'],
};

/**
 * Sanitize text input to prevent injection attacks
 */
export function sanitizeText(text: string, maxLength?: number): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // Trim whitespace
  let sanitized = text.trim();

  // Apply max length if specified
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  // Remove control characters (except newline and tab)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Escape HTML/Markdown special characters for safe display
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  return sanitized;
}

/**
 * Validate callback query data
 */
export function validateCallbackData(data: string): void {
  if (!data || typeof data !== 'string') {
    throw new ValidationError('Invalid callback data format');
  }

  if (data.length > ValidationRules.CALLBACK_DATA_MAX_LENGTH) {
    throw new ValidationError(
      `Callback data too long (max ${ValidationRules.CALLBACK_DATA_MAX_LENGTH} characters)`
    );
  }

  if (!ValidationRules.CALLBACK_DATA_PATTERN.test(data)) {
    throw new ValidationError('Callback data contains invalid characters');
  }
}

/**
 * Validate text message
 */
export function validateTextMessage(text: string, maxLength?: number): string {
  if (!text || typeof text !== 'string') {
    throw new ValidationError('Text message is required');
  }

  const length = maxLength || ValidationRules.MESSAGE_MAX_LENGTH;
  
  if (text.length > length) {
    throw new ValidationError(`Message too long (max ${length} characters)`);
  }

  return sanitizeText(text, length);
}

/**
 * Validate email address
 */
export function validateEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    throw new ValidationError('Email is required');
  }

  const sanitized = email.trim().toLowerCase();

  if (!ValidationRules.EMAIL_PATTERN.test(sanitized)) {
    throw new ValidationError('Please provide a valid email address (e.g., user@example.com)');
  }

  if (sanitized.length > 255) {
    throw new ValidationError('Email is too long (max 255 characters)');
  }

  return sanitized;
}

/**
 * Validate username
 */
export function validateUsername(username: string): string {
  if (!username || typeof username !== 'string') {
    throw new ValidationError('Username is required');
  }

  const sanitized = username.trim();

  if (!ValidationRules.USERNAME_PATTERN.test(sanitized)) {
    throw new ValidationError(
      'Username must be 3-32 characters long and contain only letters, numbers, and underscores'
    );
  }

  return sanitized;
}

/**
 * Validate file upload
 */
export function validateFile(file: any): void {
  if (!file) {
    throw new ValidationError('No file provided');
  }

  // Check file size
  if (file.file_size && file.file_size > ValidationRules.MAX_FILE_SIZE) {
    const sizeMB = (file.file_size / (1024 * 1024)).toFixed(2);
    throw new ValidationError(
      `File too large (${sizeMB}MB). Maximum size is 50MB.`
    );
  }

  // Check MIME type
  if (file.mime_type && !ValidationRules.ALLOWED_MIME_TYPES.includes(file.mime_type)) {
    throw new ValidationError(
      'Invalid file type. Allowed: PDF, PowerPoint, Word, JPEG, PNG'
    );
  }

  // Check file extension
  if (file.file_name) {
    const ext = file.file_name.toLowerCase().match(/\.[^.]+$/)?.[0];
    if (ext && !ValidationRules.ALLOWED_FILE_EXTENSIONS.includes(ext)) {
      throw new ValidationError(
        `Invalid file extension. Allowed: ${ValidationRules.ALLOWED_FILE_EXTENSIONS.join(', ')}`
      );
    }

    // Check for suspicious filenames
    if (file.file_name.includes('..') || file.file_name.includes('/') || file.file_name.includes('\\')) {
      throw new ValidationError('Invalid filename');
    }
  }
}

/**
 * Validate resource type
 */
export function validateResourceType(type: string): string {
  if (!type || typeof type !== 'string') {
    throw new ValidationError('Resource type is required');
  }

  const sanitized = type.trim().toLowerCase();

  if (!ValidationRules.VALID_RESOURCE_TYPES.includes(sanitized)) {
    throw new ValidationError(
      'Invalid resource type. Allowed: lecture-slide, handout, note, module, reference-book, exams'
    );
  }

  return sanitized;
}

/**
 * Validate education level
 */
export function validateLevel(level: string): string {
  if (!level || typeof level !== 'string') {
    throw new ValidationError('Education level is required');
  }

  const sanitized = level.trim().toLowerCase();

  if (!ValidationRules.VALID_LEVELS.includes(sanitized)) {
    throw new ValidationError('Invalid education level. Must be: high_school or university');
  }

  return sanitized;
}

/**
 * Validate grade
 */
export function validateGrade(grade: string): string {
  if (!grade || typeof grade !== 'string') {
    throw new ValidationError('Grade is required');
  }

  const sanitized = grade.trim();

  if (!ValidationRules.VALID_GRADES.includes(sanitized)) {
    throw new ValidationError(
      'Invalid grade. Allowed: Grade 9, Grade 10, Grade 11, Grade 12, Freshman, Remedial'
    );
  }

  return sanitized;
}

/**
 * Validate stream
 */
export function validateStream(stream: string): string {
  if (!stream || typeof stream !== 'string') {
    throw new ValidationError('Stream is required');
  }

  const sanitized = stream.trim().toLowerCase();

  if (!ValidationRules.VALID_STREAMS.includes(sanitized)) {
    throw new ValidationError('Invalid stream. Must be: natural or social');
  }

  return sanitized;
}

/**
 * Validate user role
 */
export function validateRole(role: string): string {
  if (!role || typeof role !== 'string') {
    throw new ValidationError('Role is required');
  }

  const sanitized = role.trim().toLowerCase();

  if (!ValidationRules.VALID_ROLES.includes(sanitized)) {
    throw new ValidationError(
      'Invalid role. Allowed: student, admin, super_admin, content_manager'
    );
  }

  return sanitized;
}

/**
 * Validate UUID
 */
export function validateUUID(id: string, fieldName: string = 'ID'): string {
  if (!id || typeof id !== 'string') {
    throw new ValidationError(`${fieldName} is required`);
  }

  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  if (!uuidPattern.test(id)) {
    throw new ValidationError(`Invalid ${fieldName} format`);
  }

  return id;
}

/**
 * Validate numeric ID
 */
export function validateNumericId(id: string | number, fieldName: string = 'ID'): number {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;

  if (isNaN(numId) || numId <= 0) {
    throw new ValidationError(`Invalid ${fieldName}`);
  }

  return numId;
}

/**
 * Validate pagination parameters
 */
export function validatePagination(page?: string | number, limit?: string | number): {
  page: number;
  limit: number;
  offset: number;
} {
  const pageNum = page ? validateNumericId(page, 'page number') : 1;
  const limitNum = limit ? validateNumericId(limit, 'limit') : 10;

  if (pageNum < 1) {
    throw new ValidationError('Page number must be at least 1');
  }

  if (limitNum < 1 || limitNum > 100) {
    throw new ValidationError('Limit must be between 1 and 100');
  }

  return {
    page: pageNum,
    limit: limitNum,
    offset: (pageNum - 1) * limitNum,
  };
}

/**
 * Validate date string
 */
export function validateDate(dateStr: string, fieldName: string = 'Date'): Date {
  if (!dateStr || typeof dateStr !== 'string') {
    throw new ValidationError(`${fieldName} is required`);
  }

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    throw new ValidationError(`Invalid ${fieldName} format`);
  }

  return date;
}

/**
 * Check for SQL injection patterns
 */
export function detectSQLInjection(input: string): void {
  if (!input || typeof input !== 'string') {
    return;
  }

  const sqlPatterns = [
    /(\bUNION\b.*\bSELECT\b)/i,
    /(\bSELECT\b.*\bFROM\b)/i,
    /(\bINSERT\b.*\bINTO\b)/i,
    /(\bUPDATE\b.*\bSET\b)/i,
    /(\bDELETE\b.*\bFROM\b)/i,
    /(\bDROP\b.*\bTABLE\b)/i,
    /(\bEXEC\b|\bEXECUTE\b)/i,
    /(--|\#|\/\*)/,
    /(\bOR\b.*=.*)/i,
    /('|\"|;)/,
  ];

  for (const pattern of sqlPatterns) {
    if (pattern.test(input)) {
      console.warn('⚠️ Potential SQL injection attempt detected:', input.substring(0, 50));
      throw new ValidationError('Invalid input detected');
    }
  }
}

/**
 * Check for XSS patterns
 */
export function detectXSS(input: string): void {
  if (!input || typeof input !== 'string') {
    return;
  }

  const xssPatterns = [
    /<script\b[^>]*>/i,
    /<iframe\b[^>]*>/i,
    /javascript:/i,
    /on\w+\s*=/i, // onclick=, onerror=, etc.
    /<embed\b[^>]*>/i,
    /<object\b[^>]*>/i,
  ];

  for (const pattern of xssPatterns) {
    if (pattern.test(input)) {
      console.warn('⚠️ Potential XSS attempt detected:', input.substring(0, 50));
      throw new ValidationError('Invalid input detected');
    }
  }
}

/**
 * Comprehensive input validation for messages
 */
export function validateUserInput(input: string, maxLength?: number): string {
  if (!input || typeof input !== 'string') {
    throw new ValidationError('Input is required');
  }

  // Check for injection attempts
  detectSQLInjection(input);
  detectXSS(input);

  // Sanitize and validate
  const sanitized = sanitizeText(input, maxLength);

  if (sanitized.length === 0) {
    throw new ValidationError('Input cannot be empty');
  }

  return sanitized;
}

/**
 * Middleware wrapper for callback queries
 */
export function validateCallbackQuery(handler: Function) {
  return async (bot: any, query: any) => {
    try {
      // Validate callback data
      if (query.data) {
        validateCallbackData(query.data);
      }

      // Execute handler
      await handler(bot, query);
    } catch (error) {
      // Error will be caught by global error handler
      throw error;
    }
  };
}

/**
 * Middleware wrapper for text messages
 */
export function validateTextInput(handler: Function, maxLength?: number) {
  return async (bot: any, msg: any) => {
    try {
      // Validate text if present
      if (msg.text) {
        msg.text = validateUserInput(msg.text, maxLength);
      }

      // Execute handler
      await handler(bot, msg);
    } catch (error) {
      // Error will be caught by global error handler
      throw error;
    }
  };
}

/**
 * Middleware wrapper for file uploads
 */
export function validateFileUpload(handler: Function) {
  return async (bot: any, msg: any) => {
    try {
      // Validate file if present
      if (msg.document) {
        validateFile(msg.document);
      } else if (msg.photo) {
        // Photos are always valid (Telegram already validated)
        const photo = msg.photo[msg.photo.length - 1]; // Largest size
        if (photo.file_size > ValidationRules.MAX_FILE_SIZE) {
          throw new ValidationError('Image too large (max 50MB)');
        }
      }

      // Execute handler
      await handler(bot, msg);
    } catch (error) {
      throw error;
    }
  };
}

/**
 * Rate limiting check (simple in-memory implementation)
 */
class SimpleRateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 20, windowSeconds: number = 60) {
    this.maxRequests = maxRequests;
    this.windowMs = windowSeconds * 1000;

    // Cleanup old entries every minute
    setInterval(() => {
      const now = Date.now();
      for (const [key, timestamps] of this.requests.entries()) {
        const recent = timestamps.filter(t => now - t < this.windowMs);
        if (recent.length === 0) {
          this.requests.delete(key);
        } else {
          this.requests.set(key, recent);
        }
      }
    }, 60000);
  }

  check(userId: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];

    // Remove old requests outside the window
    const recentRequests = userRequests.filter(
      time => now - time < this.windowMs
    );

    if (recentRequests.length >= this.maxRequests) {
      return false; // Rate limit exceeded
    }

    recentRequests.push(now);
    this.requests.set(userId, recentRequests);
    return true;
  }

  reset(userId: string): void {
    this.requests.delete(userId);
  }
}

// Export singleton rate limiter
export const rateLimiter = new SimpleRateLimiter(20, 60); // 20 requests per minute

/**
 * Rate limiting middleware
 */
export function withRateLimit(handler: Function) {
  return async (bot: any, msgOrQuery: any) => {
    const userId = msgOrQuery.from?.id?.toString();
    
    if (!userId) {
      throw new ValidationError('Unable to identify user');
    }

    const allowed = rateLimiter.check(userId);
    
    if (!allowed) {
      throw new ValidationError(
        '⏳ Too many requests. Please wait a moment before trying again.'
      );
    }

    await handler(bot, msgOrQuery);
  };
}

export default {
  sanitizeText,
  validateCallbackData,
  validateTextMessage,
  validateEmail,
  validateUsername,
  validateFile,
  validateResourceType,
  validateLevel,
  validateGrade,
  validateStream,
  validateRole,
  validateUUID,
  validateNumericId,
  validatePagination,
  validateDate,
  validateUserInput,
  detectSQLInjection,
  detectXSS,
  validateCallbackQuery,
  validateTextInput,
  validateFileUpload,
  withRateLimit,
  rateLimiter,
  ValidationRules,
};
