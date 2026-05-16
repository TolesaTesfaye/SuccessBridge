/**
 * CSRF Protection Utility
 * Implements CSRF token management for state-changing operations
 */

// CSRF token storage key
const CSRF_TOKEN_KEY = "csrf_token";
const CSRF_TOKEN_HEADER = "X-CSRF-Token";

// In-memory token cache
let cachedToken: string | null = null;

/**
 * Get CSRF token from storage or fetch a new one
 */
export async function getCSRFToken(): Promise<string | null> {
  // Return cached token if available
  if (cachedToken) {
    return cachedToken;
  }

  // Try to get from session storage
  const storedToken = sessionStorage.getItem(CSRF_TOKEN_KEY);
  if (storedToken) {
    cachedToken = storedToken;
    return storedToken;
  }

  // Fetch new token from server
  try {
    const response = await fetch("/api/auth/csrf-token", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;

      // Cache and store token
      cachedToken = token;
      sessionStorage.setItem(CSRF_TOKEN_KEY, token);

      return token;
    }
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }

  return null;
}

/**
 * Clear CSRF token (call on logout)
 */
export function clearCSRFToken() {
  cachedToken = null;
  sessionStorage.removeItem(CSRF_TOKEN_KEY);
}

/**
 * Get CSRF token header for API requests
 */
export function getCSRFHeader(): { [key: string]: string } {
  if (cachedToken) {
    return { [CSRF_TOKEN_HEADER]: cachedToken };
  }
  return {};
}

/**
 * Validate that a CSRF token is present and valid
 */
export function validateCSRFToken(token: string | null | undefined): boolean {
  if (!token || !cachedToken) {
    return false;
  }
  return token === cachedToken;
}

/**
 * Middleware function to add CSRF token to fetch requests
 * Usage: fetch(url, withCSRF({ method: 'POST', body: data }))
 */
export async function withCSRF(
  options: RequestInit & { headers?: Record<string, string> } = {},
): Promise<RequestInit> {
  const token = await getCSRFToken();

  return {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { [CSRF_TOKEN_HEADER]: token } : {}),
    },
  };
}

/**
 * Initialize CSRF protection
 * Call this on app startup
 */
export function initCSRFProtection() {
  // Pre-fetch token on initialization
  getCSRFToken().then((token) => {
    if (token) {
      console.info("[CSRF] Protection initialized");
    } else {
      console.warn("[CSRF] Could not initialize token");
    }
  });
}

/**
 * CSRF-protected API call wrapper
 */
export class CSRFProtectedAPI {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Make a CSRF-protected POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const token = await getCSRFToken();

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { [CSRF_TOKEN_HEADER]: token } : {}),
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Make a CSRF-protected PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    const token = await getCSRFToken();

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { [CSRF_TOKEN_HEADER]: token } : {}),
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Make a CSRF-protected DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    const token = await getCSRFToken();

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        ...(token ? { [CSRF_TOKEN_HEADER]: token } : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Make a standard GET request (no CSRF token needed)
   */
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    let url = `${this.baseURL}${endpoint}`;

    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}
