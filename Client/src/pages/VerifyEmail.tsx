import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@store/authStore";
import { AppLogo } from "@components/common/AppLogo";
import { ThemeToggle } from "@components/common/ThemeToggle";
import {
  CheckCircle,
  XCircle,
  Loader,
  Mail,
  ArrowLeft,
  Clock,
} from "lucide-react";
import api from "@services/api";

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setToken } = useAuthStore();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState(location.state?.email || "");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode(newCode);
      // Focus last input
      const lastInput = document.getElementById("code-5");
      lastInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const verificationCode = code.join("");

    if (!email) {
      setStatus("error");
      setMessage("Email address is required");
      return;
    }

    if (verificationCode.length !== 6) {
      setStatus("error");
      setMessage("Please enter the complete 6-digit code");
      return;
    }

    setIsSubmitting(true);
    setStatus("loading");

    try {
      const response = await api.post("/auth/verify-email", {
        email,
        code: verificationCode,
      });

      if (response.data.success) {
        setStatus("success");
        setMessage(response.data.message || "Email verified successfully!");

        // Auto-login user after verification
        if (response.data.data?.user && response.data.data?.token) {
          setUser(response.data.data.user);
          setToken(response.data.data.token);

          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      } else {
        setStatus("error");
        setMessage(response.data.error || "Verification failed");
        setIsSubmitting(false);
      }
    } catch (error: any) {
      setStatus("error");
      setMessage(
        error.response?.data?.error ||
          "Verification failed. The code may be invalid or expired.",
      );
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    try {
      const response = await api.post("/auth/resend-verification", { email });
      if (response.data.success) {
        setMessage("New verification code sent! Please check your email.");
        setStatus("idle");
        setCode(["", "", "", "", "", ""]);
        setTimeLeft(120); // Reset timer to 2 minutes
        setIsExpired(false);
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Failed to resend code");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-violet-600 dark:to-indigo-600 blur-[100px] rounded-full mix-blend-screen transition-colors"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="flex justify-center mb-6">
          <AppLogo size="xl" />
        </div>

        <div className="bg-white dark:bg-slate-900/50 py-8 px-4 shadow-2xl dark:shadow-none border border-slate-200 dark:border-white/10 sm:rounded-3xl sm:px-10 backdrop-blur-xl transition-all">
          {status === "success" ? (
            <div className="text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-green-100 dark:bg-green-500/20 rounded-full">
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Email Verified!
                </h2>
                <p className="text-slate-600 dark:text-slate-400">{message}</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  Redirecting to your dashboard...
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-full">
                    <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Verify Your Email
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Enter the 6-digit code sent to your email
                </p>

                {/* Countdown Timer */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Clock
                    className={`w-4 h-4 ${isExpired ? "text-red-500" : timeLeft <= 30 ? "text-orange-500" : "text-slate-500 dark:text-slate-400"}`}
                  />
                  <span
                    className={`text-sm font-mono font-semibold ${isExpired ? "text-red-500" : timeLeft <= 30 ? "text-orange-500" : "text-slate-600 dark:text-slate-400"}`}
                  >
                    {isExpired ? "Code Expired" : formatTime(timeLeft)}
                  </span>
                </div>
                {isExpired && (
                  <p className="text-xs text-red-500 mt-1">
                    Your verification code has expired. Please request a new
                    one.
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Code Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Verification Code
                  </label>
                  <div
                    className="flex gap-2 justify-center"
                    onPaste={handlePaste}
                  >
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-14 text-center text-2xl font-bold border-2 border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                      />
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {status === "error" && message && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {message}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    isSubmitting || code.join("").length !== 6 || isExpired
                  }
                  className="w-full py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </button>

                {/* Resend Code */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Didn't receive the code? Resend
                  </button>
                </div>

                {/* Back to Login */}
                <div className="text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
