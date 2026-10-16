/**
 * API Client for Telegram Bot
 * Makes HTTP requests to the existing backend API endpoints
 * This ensures bot uses same logic as the web app
 */

import { config } from '../../config/environment.js';

const API_BASE_URL = `http://localhost:${config.port || 5000}`;

interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}

/**
 * Generic API request handler
 */
async function apiRequest(
  endpoint: string,
  method: string = 'GET',
  body?: any,
  token?: string
): Promise<ApiResponse> {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorData: any = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.error(`API Error (${endpoint}):`, error);
    return {
      success: false,
      error: error.message || 'Request failed',
    };
  }
}

/**
 * Resource API calls
 */
export const ResourceAPI = {
  /**
   * Get resources with filters
   */
  async getResources(filters: {
    subjectId?: string;
    type?: string;
    educationLevel?: string;
    grade?: string;
    stream?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    return apiRequest(`/api/resources?${queryParams.toString()}`);
  },

  /**
   * Get single resource by ID
   */
  async getResourceById(resourceId: string): Promise<ApiResponse> {
    return apiRequest(`/api/resources/${resourceId}`);
  },

  /**
   * Get resource download URL
   */
  async getDownloadUrl(resourceId: string): Promise<ApiResponse> {
    return apiRequest(`/api/resources/${resourceId}/download`);
  },

  /**
   * Get resource preview URL
   */
  async getPreviewUrl(resourceId: string): Promise<ApiResponse> {
    return apiRequest(`/api/resources/${resourceId}/preview`);
  },

  /**
   * Get resource statistics
   */
  async getStats(): Promise<ApiResponse> {
    return apiRequest('/api/resources/stats');
  },
};

/**
 * Subject API calls
 */
export const SubjectAPI = {
  /**
   * Get all subjects with filters
   */
  async getSubjects(filters: {
    gradeId?: string;
    streamId?: string;
    educationLevel?: string;
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    return apiRequest(`/api/subjects?${queryParams.toString()}`);
  },

  /**
   * Get single subject by ID
   */
  async getSubjectById(subjectId: string): Promise<ApiResponse> {
    return apiRequest(`/api/subjects/${subjectId}`);
  },
};

/**
 * User API calls
 */
export const UserAPI = {
  /**
   * Get user by ID
   */
  async getUserById(userId: string, token: string): Promise<ApiResponse> {
    return apiRequest(`/api/users/${userId}`, 'GET', undefined, token);
  },

  /**
   * Get user statistics
   */
  async getUserStats(token: string): Promise<ApiResponse> {
    return apiRequest('/api/users/stats', 'GET', undefined, token);
  },
};

/**
 * System API calls
 */
export const SystemAPI = {
  /**
   * Get system statistics
   */
  async getStats(): Promise<ApiResponse> {
    return apiRequest('/api/system/stats');
  },

  /**
   * Health check
   */
  async healthCheck(): Promise<ApiResponse> {
    return apiRequest('/health');
  },
};
