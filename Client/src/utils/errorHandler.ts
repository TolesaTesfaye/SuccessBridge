import { AxiosError } from 'axios'

export interface ErrorResponse {
  success: false
  message: string
  error?: string
  code?: string
  details?: any
}

export interface UserFriendlyError {
  title: string
  message: string
  type: 'error' | 'warning' | 'info'
  duration?: number
}

// Map of backend error codes/messages to user-friendly messages
const ERROR_MESSAGES: Record<string, UserFriendlyError> = {
  // Authentication Errors
  'INVALID_CREDENTIALS': {
    title: 'Login Failed',
    message: 'The email or password you entered is incorrect. Please check your credentials and try again.',
    type: 'error',
    duration: 6000
  },
  'USER_NOT_FOUND': {
    title: 'Account Not Found',
    message: 'No account found with this email address. Please check your email or create a new account.',
    type: 'error',
    duration: 6000
  },
  'INCORRECT_PASSWORD': {
    title: 'Incorrect Password',
    message: 'The password you entered is incorrect. Please try again or reset your password.',
    type: 'error',
    duration: 6000
  },
  'ACCOUNT_LOCKED': {
    title: 'Account Locked',
    message: 'Your account has been temporarily locked due to multiple failed login attempts. Please try again later.',
    type: 'warning',
    duration: 8000
  },
  'EMAIL_NOT_VERIFIED': {
    title: 'Email Not Verified',
    message: 'Please verify your email address before logging in. Check your inbox for a verification link.',
    type: 'warning',
    duration: 8000
  },
  'TOKEN_EXPIRED': {
    title: 'Session Expired',
    message: 'Your session has expired. Please log in again to continue.',
    type: 'info',
    duration: 5000
  },
  'INVALID_TOKEN': {
    title: 'Invalid Session',
    message: 'Your session is invalid. Please log in again.',
    type: 'error',
    duration: 5000
  },

  // Registration Errors
  'EMAIL_ALREADY_EXISTS': {
    title: 'Email Already Registered',
    message: 'An account with this email address already exists. Please use a different email or try logging in.',
    type: 'error',
    duration: 6000
  },
  'USER_ALREADY_EXISTS': {
    title: 'Account Already Exists',
    message: 'An account with this email already exists. Please try logging in instead, or use the "Forgot Password" option if you need to reset your password.',
    type: 'error',
    duration: 8000
  },
  'REGISTRATION_PENDING': {
    title: 'Registration In Progress',
    message: 'You already started registration with this email. Please check your email for the verification code. If you didn\'t receive it, use the "Resend Code" option.',
    type: 'warning',
    duration: 10000
  },
  'VERIFICATION_TOKEN_INVALID': {
    title: 'Invalid Verification Link',
    message: 'The verification link is invalid or has expired. Please request a new verification email.',
    type: 'error',
    duration: 6000,
  },
  'EMAIL_ALREADY_VERIFIED': {
    title: 'Already Verified',
    message: 'Your email address has already been verified. You can now access all features.',
    type: 'info',
    duration: 5000,
  },
  'WEAK_PASSWORD': {
    title: 'Password Too Weak',
    message: 'Your password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.',
    type: 'warning',
    duration: 7000
  },
  'INVALID_EMAIL_FORMAT': {
    title: 'Invalid Email',
    message: 'Please enter a valid email address (e.g., user@example.com).',
    type: 'error',
    duration: 5000
  },
  'REGISTRATION_FAILED': {
    title: 'Registration Failed',
    message: 'Unable to create your account at this time. Please check your information and try again.',
    type: 'error',
    duration: 6000
  },

  // Network & Server Errors
  'NETWORK_ERROR': {
    title: 'Connection Problem',
    message: 'Unable to connect to our servers. Please check your internet connection and try again.',
    type: 'error',
    duration: 6000
  },
  'SERVER_ERROR': {
    title: 'Server Error',
    message: 'Something went wrong on our end. Our team has been notified. Please try again in a few minutes.',
    type: 'error',
    duration: 7000
  },
  'SERVICE_UNAVAILABLE': {
    title: 'Service Temporarily Unavailable',
    message: 'Our service is temporarily unavailable for maintenance. Please try again in a few minutes.',
    type: 'warning',
    duration: 8000
  },
  'TIMEOUT': {
    title: 'Request Timeout',
    message: 'The request took too long to complete. Please check your connection and try again.',
    type: 'warning',
    duration: 6000
  },
  'REGISTRATION_TIMEOUT': {
    title: 'Registration In Progress',
    message: 'Your registration is being processed. Please check your email for a verification code, or try logging in if you already have an account.',
    type: 'info',
    duration: 8000
  },

  // Permission & Access Errors
  'UNAUTHORIZED': {
    title: 'Access Denied',
    message: 'You don\'t have permission to access this resource. Please log in with appropriate credentials.',
    type: 'error',
    duration: 6000
  },
  'FORBIDDEN': {
    title: 'Access Forbidden',
    message: 'You don\'t have the required permissions to perform this action.',
    type: 'error',
    duration: 6000
  },
  'ACCOUNT_SUSPENDED': {
    title: 'Account Suspended',
    message: 'Your account has been suspended. Please contact support for assistance.',
    type: 'error',
    duration: 8000
  },
  'ADMIN_PENDING_APPROVAL': {
    title: 'Account Pending Approval',
    message: 'Your admin account is pending approval from super admin. Please wait for approval before logging in.',
    type: 'warning',
    duration: 8000
  },
  'ADMIN_ACCOUNT_REJECTED': {
    title: 'Account Rejected',
    message: 'Your admin account has been rejected. Please contact support for more information.',
    type: 'error',
    duration: 8000
  },

  // Validation Errors
  'VALIDATION_ERROR': {
    title: 'Invalid Information',
    message: 'Please check the information you entered and make sure all required fields are filled correctly.',
    type: 'warning',
    duration: 6000
  },
  'MISSING_REQUIRED_FIELDS': {
    title: 'Missing Information',
    message: 'Please fill in all required fields before continuing.',
    type: 'warning',
    duration: 5000
  },
  'INVALID_FILE_TYPE': {
    title: 'Invalid File Type',
    message: 'The file type you selected is not supported. Please choose a different file.',
    type: 'error',
    duration: 6000
  },
  'FILE_TOO_LARGE': {
    title: 'File Too Large',
    message: 'The file you selected is too large. Please choose a smaller file (max 10MB).',
    type: 'error',
    duration: 6000
  },

  // Resource Errors
  'RESOURCE_NOT_FOUND': {
    title: 'Not Found',
    message: 'The requested resource could not be found. It may have been moved or deleted.',
    type: 'error',
    duration: 6000
  },
  'RESOURCE_ALREADY_EXISTS': {
    title: 'Already Exists',
    message: 'A resource with this name already exists. Please choose a different name.',
    type: 'warning',
    duration: 6000
  },

  // Default fallback
  'UNKNOWN_ERROR': {
    title: 'Something Went Wrong',
    message: 'An unexpected error occurred. Please try again or contact support if the problem persists.',
    type: 'error',
    duration: 6000
  }
}

// Common HTTP status code mappings
const HTTP_STATUS_MESSAGES: Record<number, UserFriendlyError> = {
  400: {
    title: 'Invalid Request',
    message: 'The information you provided is invalid. Please check your input and try again.',
    type: 'warning',
    duration: 6000
  },
  401: {
    title: 'Authentication Required',
    message: 'Please log in to access this feature.',
    type: 'error',
    duration: 5000
  },
  403: {
    title: 'Access Denied',
    message: 'You don\'t have permission to perform this action.',
    type: 'error',
    duration: 6000
  },
  404: {
    title: 'Not Found',
    message: 'The requested resource could not be found.',
    type: 'error',
    duration: 5000
  },
  408: {
    title: 'Request Timeout',
    message: 'The request took too long. Your registration may have been created. Please check your email or try logging in.',
    type: 'info',
    duration: 8000
  },
  409: {
    title: 'Conflict',
    message: 'This action conflicts with existing data. Please refresh and try again.',
    type: 'warning',
    duration: 6000
  },
  422: {
    title: 'Validation Error',
    message: 'Please check the information you entered and correct any errors.',
    type: 'warning',
    duration: 6000
  },
  429: {
    title: 'Too Many Requests',
    message: 'You\'re making requests too quickly. Please wait a moment and try again.',
    type: 'warning',
    duration: 7000
  },
  500: {
    title: 'Server Error',
    message: 'Something went wrong on our end. Please try again in a few minutes.',
    type: 'error',
    duration: 7000
  },
  502: {
    title: 'Service Unavailable',
    message: 'Our service is temporarily unavailable. Please try again shortly.',
    type: 'error',
    duration: 7000
  },
  503: {
    title: 'Maintenance Mode',
    message: 'Our service is temporarily down for maintenance. Please try again later.',
    type: 'warning',
    duration: 8000
  }
}

/**
 * Parse error from API response and return user-friendly message
 * Provides clear, actionable error messages for all API errors
 */
export function parseApiError(error: any): UserFriendlyError {
  // Handle Axios errors
  if (error?.isAxiosError || error?.response) {
    const axiosError = error as AxiosError<ErrorResponse>
    const response = axiosError.response
    const data = response?.data

    // Check for specific error codes from backend
    if (data?.code && ERROR_MESSAGES[data.code]) {
      return ERROR_MESSAGES[data.code]
    }

    // PRIORITY: Check for backend error message first (before HTTP status codes)
    if (data?.error || data?.message) {
      const backendMessage = data.error || data.message
      const message = backendMessage.toLowerCase()
      
      // Map common backend messages to error codes
      if (message.includes('invalid credentials') || message.includes('incorrect password')) {
        return ERROR_MESSAGES['INVALID_CREDENTIALS']
      }
      if (message.includes('user already exists') || message.includes('user with this email already exists')) {
        return {
          title: 'Account Already Exists',
          message: 'An account with this email already exists. Please try logging in instead, or use a different email address.',
          type: 'error',
          duration: 8000
        }
      }
      if (message.includes('registration pending') || message.includes('pending. please check your email')) {
        return {
          title: 'Verification Code Sent',
          message: 'A new verification code has been sent to your email. Please check your inbox and enter the code to complete registration. The code expires in 15 minutes.',
          type: 'info',
          duration: 10000
        }
      }
      if (message.includes('pending approval') || message.includes('being processed')) {
        return ERROR_MESSAGES['ADMIN_PENDING_APPROVAL']
      }
      if (message.includes('rejected')) {
        return ERROR_MESSAGES['ADMIN_ACCOUNT_REJECTED']
      }
      if (message.includes('user not found') || message.includes('account not found')) {
        return ERROR_MESSAGES['USER_NOT_FOUND']
      }
      if (message.includes('verify your email') || message.includes('email address before logging')) {
        return {
          title: 'Email Not Verified',
          message: backendMessage,
          type: 'warning',
          duration: 8000
        }
      }
      if (message.includes('email already exists') || message.includes('already registered')) {
        return ERROR_MESSAGES['EMAIL_ALREADY_EXISTS']
      }
      if (message.includes('email not verified')) {
        return ERROR_MESSAGES['EMAIL_NOT_VERIFIED']
      }
      if (message.includes('verification token') || message.includes('verification link')) {
        return ERROR_MESSAGES['VERIFICATION_TOKEN_INVALID']
      }
      if (message.includes('already verified')) {
        return ERROR_MESSAGES['EMAIL_ALREADY_VERIFIED']
      }
      if (message.includes('password') && message.includes('weak')) {
        return ERROR_MESSAGES['WEAK_PASSWORD']
      }
      if (message.includes('email') && message.includes('invalid')) {
        return ERROR_MESSAGES['INVALID_EMAIL_FORMAT']
      }
      if (message.includes('token expired') || message.includes('session expired')) {
        return ERROR_MESSAGES['TOKEN_EXPIRED']
      }
      if (message.includes('unauthorized') || message.includes('access denied')) {
        return ERROR_MESSAGES['UNAUTHORIZED']
      }
      if (message.includes('validation') || message.includes('required')) {
        return ERROR_MESSAGES['VALIDATION_ERROR']
      }
      if (message.includes('database') || message.includes('connection')) {
        return {
          title: 'Database Error',
          message: 'We\'re experiencing technical difficulties. Please try again in a few moments.',
          type: 'error',
          duration: 7000
        }
      }
      if (message.includes('timeout') || message.includes('taking longer than expected')) {
        return {
          title: 'Registration In Progress',
          message: 'Your registration is being processed. Please check your email for a verification code in a few moments, or try the "Resend Code" option.',
          type: 'info',
          duration: 8000
        }
      }
      if (message.includes('network') || message.includes('timeout')) {
        return {
          title: 'Connection Timeout',
          message: 'The request took too long. Please check your internet connection and try again.',
          type: 'error',
          duration: 6000
        }
      }
      if (message.includes('duplicate') || message.includes('unique constraint')) {
        return {
          title: 'Duplicate Entry',
          message: 'This information is already in use. Please use different details.',
          type: 'error',
          duration: 6000
        }
      }
      
      // If we have a backend message but no specific match, return it directly
      // This ensures specific backend messages (like email verification) are shown
      if (response?.status === 400) {
        return {
          title: 'Invalid Request',
          message: backendMessage,
          type: 'warning',
          duration: 8000
        }
      }
      if (response?.status === 403) {
        return {
          title: 'Access Denied',
          message: backendMessage,
          type: 'warning',
          duration: 8000
        }
      }
    }

    // Check HTTP status codes (only if no specific backend message)
    if (response?.status && HTTP_STATUS_MESSAGES[response.status]) {
      return HTTP_STATUS_MESSAGES[response.status]
    }

    // Handle network errors
    if (axiosError.code === 'NETWORK_ERROR' || axiosError.message?.includes('Network Error')) {
      return ERROR_MESSAGES['NETWORK_ERROR']
    }
    if (axiosError.code === 'ECONNABORTED' || axiosError.message?.includes('timeout')) {
      return ERROR_MESSAGES['TIMEOUT']
    }
  }

  // Handle JavaScript errors
  if (error instanceof Error) {
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return ERROR_MESSAGES['NETWORK_ERROR']
    }
  }

  // Default fallback
  return ERROR_MESSAGES['UNKNOWN_ERROR']
}

/**
 * Get user-friendly error message by error code
 */
export function getErrorMessage(code: string): UserFriendlyError {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES['UNKNOWN_ERROR']
}

/**
 * Format validation errors from backend
 */
export function formatValidationErrors(errors: Record<string, string[]>): string {
  const messages = Object.entries(errors)
    .map(([field, fieldErrors]) => {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')
      return `${fieldName}: ${fieldErrors.join(', ')}`
    })
    .join('\n')
  
  return messages || 'Please check your input and try again.'
}

/**
 * Create success messages for common actions
 */
export const SUCCESS_MESSAGES = {
  LOGIN: 'Welcome back! You have successfully logged in.',
  LOGOUT: 'You have been logged out successfully.',
  REGISTER: 'Account created successfully! Welcome to SuccessBridge.',
  EMAIL_VERIFIED: 'Email verified successfully! You can now access all features.',
  VERIFICATION_EMAIL_SENT: 'Verification email sent! Please check your inbox.',
  PASSWORD_RESET: 'Password reset link has been sent to your email.',
  PASSWORD_CHANGED: 'Your password has been updated successfully.',
  PROFILE_UPDATED: 'Your profile has been updated successfully.',
  RESOURCE_UPLOADED: 'Resource uploaded successfully!',
  RESOURCE_DELETED: 'Resource deleted successfully.',
  QUIZ_SUBMITTED: 'Quiz submitted successfully! Check your results.',
  SETTINGS_SAVED: 'Settings saved successfully.',
} as const