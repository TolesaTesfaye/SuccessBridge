import React, { useState, useEffect, useRef } from "react";
import {
  useNavigate,
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { FormInput } from "@components/forms/FormInput";
import { AppLogo } from "@components/common/AppLogo";
import { ThemeToggle } from "@components/common/ThemeToggle";
import { useToast } from "@components/common/Toast";
import { Spinner } from "@components/common/Spinner";
import { LogIn, AlertCircle } from "lucide-react";

const OAUTH_ERR_DEDUPE_KEY = "sb_login_oauth_err";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const toast = useToast();
  const { login, loading } = useAuth();
  const lastToastMessageRef = useRef<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Show message from navigation state (e.g., from registration)
  useEffect(() => {
    const state = location.state as any;
    if (state?.message && lastToastMessageRef.current !== state.message) {
      lastToastMessageRef.current = state.message;
      if (state.type === "info") {
        toast.info(state.message, 8000);
      } else {
        toast.success(state.message);
      }
      // Clear the state to prevent showing message again on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, toast, navigate, location.pathname]);

  // OAuth / Google redirect errors (e.g. account already exists)
  useEffect(() => {
    const error = searchParams.get("error");
    if (!error) {
      try {
        sessionStorage.removeItem(OAUTH_ERR_DEDUPE_KEY);
      } catch {
        /* ignore */
      }
      return;
    }

    const messages: Record<string, string> = {
      account_exists:
        "This Google account is already registered. Please sign in with your email and password, or use Google sign-in from the login page if available.",
      redirect_uri_mismatch:
        "Google sign-in failed: redirect URL mismatch. Check BACKEND_URL / GOOGLE_CALLBACK_URL and Google Console redirect URIs.",
      invalid_grant:
        "Google sign-in failed: the authorization expired or was reused. Please try again.",
      oauth_failed: "Google sign-in failed. Please try again.",
    };

    const msg = messages[error] || messages.oauth_failed;

    const clearQuery = () =>
      navigate({ pathname: location.pathname, search: "" }, { replace: true });

    // Strict Mode remount + any re-entrancy before the URL clears: at most one toast per burst.
    try {
      const raw = sessionStorage.getItem(OAUTH_ERR_DEDUPE_KEY);
      if (raw) {
        const { code, at } = JSON.parse(raw) as { code: string; at: number };
        if (code === error && Date.now() - at < 4000) {
          setFormError(msg);
          clearQuery();
          return;
        }
      }
      sessionStorage.setItem(
        OAUTH_ERR_DEDUPE_KEY,
        JSON.stringify({ code: error, at: Date.now() }),
      );
    } catch {
      /* ignore */
    }

    if (error === "account_exists") {
      toast.info(msg, 8000);
      setFormError(msg);
    } else {
      toast.error(msg, 8000);
      setFormError(msg);
    }

    clearQuery();
  }, [searchParams, navigate, location.pathname, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setFormError("Please fill in all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      setFormError("Please enter a valid email address");
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      // Error handling is now done in useAuth hook with toast notifications
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-center py-6 md:py-12 bg-slate-50 dark:bg-[#0a0f1c]">
      {/* Background Decorative Elements - Same as Home Page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 blur-[100px] rounded-full mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500 to-blue-500 blur-[100px] rounded-full mix-blend-screen opacity-50"></div>
      </div>

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="w-full mx-auto max-w-md relative z-10 px-3 md:px-0">
        <div className="flex justify-center mb-3 md:mb-6 animate-fade-in">
          <AppLogo size="md" className="md:scale-125" />
        </div>
        <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white transition-colors text-center animate-fade-in-up">
          Welcome back
        </h2>
        <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-600 dark:text-slate-400 transition-colors text-center animate-fade-in-up delay-100">
          Log in to continue your learning journey
        </p>
      </div>

      <div className="mt-4 md:mt-8 w-full mx-auto max-w-md relative z-10 px-3 md:px-0 animate-fade-in-up delay-200">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl py-4 md:py-8 px-3 md:px-10 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl md:rounded-3xl transition-all hover:shadow-3xl shadow-blue-500/20 dark:shadow-blue-500/30 hover:shadow-blue-500/40 dark:hover:shadow-blue-500/50">
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {formError && (
              <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-red-200 dark:border-red-500/20 flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="space-y-3 md:space-y-4">
              <FormInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

              <div className="space-y-2">
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  showPasswordToggle={true}
                  required
                />
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 md:py-3 px-4 border border-transparent rounded-lg md:rounded-xl shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-blue-600/30"
              >
                <LogIn className="w-4 h-4" />
                {loading ? "Authenticating..." : "Sign In"}
              </button>
              {loading && (
                <div className="flex justify-center items-center gap-2 py-3">
                  <Spinner size="md" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Signing in...
                  </span>
                </div>
              )}
            </div>
          </form>

          <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-slate-200 dark:border-slate-600 text-center transition-colors">
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Create a free account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
