import { useAuthStore } from "@store/authStore";
import { authService } from "@services/authService";
import { useState } from "react";
import { useToast } from "@components/common/Toast";
import { SUCCESS_MESSAGES } from "@utils/errorHandler";

export const useAuth = () => {
  const { user, isAuthenticated, setUser, setToken, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const login = async (email: string, password: string) => {
    console.log("🔐 Login attempt for:", email);
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      console.log("📋 Login response:", response);

      if (response.success && response.data) {
        console.log("✅ Login successful, user data:", response.data.user);
        setUser(response.data.user);
        setToken(response.data.token);
        toast.success(SUCCESS_MESSAGES.LOGIN);
      } else {
        const errorMsg = response.error || "Login failed";
        console.error("❌ Login failed:", errorMsg);
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err: any) {
      console.error("❌ Login error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        userFriendlyError: err.userFriendlyError,
      });

      const userError = err.userFriendlyError;
      if (userError) {
        setError(userError.message);
        toast.showToast(userError.type, userError.message, userError.duration);
      } else {
        const fallbackMsg =
          err.response?.data?.error || err.message || "Login failed";
        setError(fallbackMsg);
        toast.error(fallbackMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    userData: any,
  ): Promise<{ success: boolean; requiresVerification: boolean } | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      if (response.success && response.data) {
        const data = response.data as any;
        if (userData.role === "admin") {
          return { success: true, requiresVerification: false }; // Don't auto-login for admins
        } else {
          // Student registration
          if (data.requiresVerification) {
            toast.success(
              "🎉 Registration initiated!\n\n📧 Please check your email for a 6-digit verification code to activate your account.\n\n⚠️ You must verify your email before you can log in.",
              8000,
            );
            return { success: true, requiresVerification: true };
          } else {
            // Email verification disabled: student registered and automatically authenticated
            if (data.user && data.token) {
              setUser(data.user);
              setToken(data.token);
            }
            toast.success(
              "🎉 Registration successful! Welcome to SuccessBridge.",
              5000,
            );
            return { success: true, requiresVerification: false };
          }
        }
      }
      const errorMsg = response.error || (response as any).message || "Registration failed";
      setError(errorMsg);
      toast.error(errorMsg);
    } catch (err: any) {
      const userError = err.userFriendlyError;
      if (userError) {
        setError(userError.message);
        toast.showToast(userError.type, userError.message, userError.duration);
      } else {
        const fallbackMsg =
          err.response?.data?.error || err.message || "Registration failed";
        setError(fallbackMsg);
        toast.error(fallbackMsg);
      }
    } finally {
      setLoading(false);
    }
    return null;
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(SUCCESS_MESSAGES.LOGOUT);
    } catch (err: any) {
      // Even if logout API fails, we still clear local state
      await logout();
      toast.info("You have been logged out");
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: handleLogout,
  };
};
