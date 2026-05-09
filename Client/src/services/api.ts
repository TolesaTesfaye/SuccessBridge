import axios, { AxiosInstance, AxiosError } from "axios";
import { useAuthStore } from "@store/authStore";
import { parseApiError } from "@utils/errorHandler";

const API_BASE_URL =
  (window as any).__VITE_API_URL__ ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 60 second timeout (Render free tier can take 30-50s to wake up)
});

const inFlightGetRequests = new Map<string, Promise<any>>();

const originalGet = api.get.bind(api);

api.get = ((url: string, config: any = {}) => {
  const paramsKey = JSON.stringify(config?.params ?? {});
  const headersKey = JSON.stringify(config?.headers ?? {});
  const requestKey = `${url}?${paramsKey}&${headersKey}`;

  const existingRequest = inFlightGetRequests.get(requestKey);
  if (existingRequest) {
    return existingRequest;
  }

  const request = originalGet(url, config).finally(() => {
    inFlightGetRequests.delete(requestKey);
  });

  inFlightGetRequests.set(requestKey, request);
  return request;
}) as AxiosInstance["get"];

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData - let axios set it with boundary
    if (config.data instanceof FormData) {
      // Remove Content-Type if it was set, axios will add it with boundary
      delete config.headers['Content-Type'];
    }

    // Log requests only in development
    if (import.meta.env.DEV) {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
        {
          params: config.params,
          data: config.data instanceof FormData ? 'FormData' : config.data,
          hasAuth: !!config.headers.Authorization,
          authHeader: config.headers.Authorization ? 'Bearer ***' : 'None',
          contentType: config.headers['Content-Type'] || 'auto',
        },
      );
    }

    return config;
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.error("❌ Request Error:", error);
    }
    return Promise.reject(error);
  },
);

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds

// Helper function to check if error is retryable
const isRetryableError = (error: AxiosError): boolean => {
  // Retry on network errors, timeouts, and 5xx server errors
  return (
    !error.response || // Network error
    error.code === 'ECONNABORTED' || // Timeout
    error.code === 'ERR_NETWORK' || // Network error
    (error.response.status >= 500 && error.response.status < 600) // Server error
  );
};

// Helper function to delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Response interceptor for error handling with retry logic
api.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (import.meta.env.DEV) {
      console.log(
        `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
        response.data,
      );
    }
    return response;
  },
  async (error: AxiosError) => {
    const config = error.config as any;

    // Initialize retry count
    if (!config.__retryCount) {
      config.__retryCount = 0;
    }

    // Check if we should retry
    if (config.__retryCount < MAX_RETRIES && isRetryableError(error)) {
      config.__retryCount += 1;

      console.log(
        `🔄 Retrying request (${config.__retryCount}/${MAX_RETRIES}): ${config.method?.toUpperCase()} ${config.url}`
      );

      // Wait before retrying
      await delay(RETRY_DELAY * config.__retryCount);

      // Retry the request
      return api.request(config);
    }

    // Better error logging (only in development)
    if (import.meta.env.DEV) {
      if (error.response) {
        console.error("❌ API Error:", {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          url: config?.url,
        });
      } else if (error.request) {
        console.error("❌ Network Error:", {
          message: error.message,
          code: error.code,
          url: config?.url,
        });
      } else {
        console.error("❌ Request Setup Error:", error.message);
      }
    }

    // Parse error for user-friendly message
    const userError = parseApiError(error);

    // Handle 401 errors (but not during auth initialization)
    if (
      error.response?.status === 401 &&
      !config?.url?.includes("/auth/me")
    ) {
      // Clear auth state and redirect to login
      const { logout } = useAuthStore.getState();
      await logout();

      // Only redirect if not already on login/register page
      if (
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/register")
      ) {
        window.location.href = "/login";
      }
    }

    // Attach user-friendly error to the error object
    (error as any).userFriendlyError = userError;

    return Promise.reject(error);
  },
);

export default api;
