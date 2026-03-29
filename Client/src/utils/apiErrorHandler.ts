import { parseApiError, UserFriendlyError } from './errorHandler'

/**
 * Global API error handler that can be used throughout the application
 * Provides consistent error handling with toast notifications
 */
export class ApiErrorHandler {
  private static toastInstance: any = null

  static setToastInstance(toast: any) {
    this.toastInstance = toast
  }

  /**
   * Handle API errors with automatic toast notifications
   * @param error - The error object from API call
   * @param customMessage - Optional custom message to override default
   * @param showToast - Whether to show toast notification (default: true)
   * @returns UserFriendlyError object
   */
  static handle(error: any, customMessage?: string, showToast: boolean = true): UserFriendlyError {
    const userError = parseApiError(error)
    
    // Use custom message if provided
    if (customMessage) {
      userError.message = customMessage
    }

    // Show toast notification if toast instance is available and showToast is true
    if (this.toastInstance && showToast) {
      this.toastInstance.showToast(userError.type, userError.message, userError.duration)
    }

    // Log error for debugging
    console.error('API Error:', {
      originalError: error,
      userFriendlyError: userError,
      customMessage
    })

    return userError
  }

  /**
   * Handle API errors silently (no toast notification)
   * @param error - The error object from API call
   * @param customMessage - Optional custom message to override default
   * @returns UserFriendlyError object
   */
  static handleSilent(error: any, customMessage?: string): UserFriendlyError {
    return this.handle(error, customMessage, false)
  }

  /**
   * Handle network/connection errors specifically
   * @param error - The error object
   * @param showToast - Whether to show toast notification
   * @returns UserFriendlyError object
   */
  static handleNetworkError(error: any, showToast: boolean = true): UserFriendlyError {
    const networkError: UserFriendlyError = {
      title: 'Connection Problem',
      message: 'Unable to connect to our servers. Please check your internet connection and try again.',
      type: 'error',
      duration: 6000
    }

    if (this.toastInstance && showToast) {
      this.toastInstance.showToast(networkError.type, networkError.message, networkError.duration)
    }

    console.error('Network Error:', error)
    return networkError
  }

  /**
   * Handle validation errors from forms
   * @param errors - Validation errors object
   * @param showToast - Whether to show toast notification
   * @returns UserFriendlyError object
   */
  static handleValidationErrors(errors: Record<string, string[]>, showToast: boolean = true): UserFriendlyError {
    const firstError = Object.values(errors)[0]?.[0] || 'Please check your input and try again.'
    
    const validationError: UserFriendlyError = {
      title: 'Validation Error',
      message: firstError,
      type: 'warning',
      duration: 6000
    }

    if (this.toastInstance && showToast) {
      this.toastInstance.showToast(validationError.type, validationError.message, validationError.duration)
    }

    return validationError
  }

  /**
   * Show success message
   * @param message - Success message to display
   * @param duration - Duration to show the message
   */
  static showSuccess(message: string, duration: number = 5000) {
    if (this.toastInstance) {
      this.toastInstance.success(message, duration)
    }
  }

  /**
   * Show info message
   * @param message - Info message to display
   * @param duration - Duration to show the message
   */
  static showInfo(message: string, duration: number = 5000) {
    if (this.toastInstance) {
      this.toastInstance.info(message, duration)
    }
  }

  /**
   * Show warning message
   * @param message - Warning message to display
   * @param duration - Duration to show the message
   */
  static showWarning(message: string, duration: number = 6000) {
    if (this.toastInstance) {
      this.toastInstance.warning(message, duration)
    }
  }
}

/**
 * Hook to initialize the API error handler with toast instance
 * Should be called once in the app root
 */
export const useApiErrorHandler = (toast: any) => {
  ApiErrorHandler.setToastInstance(toast)
  return ApiErrorHandler
}