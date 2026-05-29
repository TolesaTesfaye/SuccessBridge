import SystemSetting from "../models/SystemSetting.js";
import { logger } from "../utils/logger.js";

export const DEFAULT_SETTINGS = [
  // ==================== GENERAL SETTINGS ====================
  {
    settingKey: "platform_name",
    settingValue: "SuccessBridge",
    description: "The display name of the platform",
    category: "general",
  },
  {
    settingKey: "platform_tagline",
    settingValue: "Your Bridge to Academic Success",
    description: "Platform tagline/subtitle",
    category: "general",
  },
  {
    settingKey: "platform_email",
    settingValue: "support@successbridge.com",
    description: "Default FROM email address for system messages",
    category: "general",
  },
  {
    settingKey: "platform_language",
    settingValue: "en",
    description: "Default language for the platform",
    category: "general",
  },
  {
    settingKey: "platform_timezone",
    settingValue: "UTC",
    description: "Default timezone for the platform",
    category: "general",
  },
  {
    settingKey: "platform_url",
    settingValue: "",
    description: "Public-facing URL of the platform",
    category: "general",
  },
  {
    settingKey: "maintenance_mode",
    settingValue: false,
    description: "Enable maintenance mode (blocks all non-admin access)",
    category: "general",
  },
  {
    settingKey: "maintenance_message",
    settingValue:
      "We are currently performing scheduled maintenance. Please check back shortly.",
    description: "Message shown to users during maintenance",
    category: "general",
  },

  // ==================== SECURITY SETTINGS ====================
  {
    settingKey: "max_login_attempts",
    settingValue: 5,
    description: "Maximum failed login attempts before account lockout",
    category: "security",
  },
  {
    settingKey: "lockout_duration_minutes",
    settingValue: 30,
    description:
      "Duration (in minutes) for account lockout after too many failed attempts",
    category: "security",
  },
  {
    settingKey: "password_min_length",
    settingValue: 8,
    description: "Minimum password length requirement",
    category: "security",
  },
  {
    settingKey: "password_require_special",
    settingValue: true,
    description: "Require special characters in passwords",
    category: "security",
  },
  {
    settingKey: "password_require_number",
    settingValue: true,
    description: "Require numbers in passwords",
    category: "security",
  },
  {
    settingKey: "password_require_uppercase",
    settingValue: true,
    description: "Require uppercase letters in passwords",
    category: "security",
  },
  {
    settingKey: "session_timeout_minutes",
    settingValue: 60,
    description: "Session inactivity timeout in minutes",
    category: "security",
  },
  {
    settingKey: "require_email_verification",
    settingValue: true,
    description:
      "Require users to verify their email before accessing the platform",
    category: "security",
  },
  {
    settingKey: "allow_oauth_login",
    settingValue: true,
    description: "Allow login via OAuth providers (Google, Microsoft)",
    category: "security",
  },
  {
    settingKey: "cors_allowed_origins",
    settingValue: ["http://localhost:5173", "http://localhost:3000"],
    description: "Allowed CORS origins (comma-separated)",
    category: "security",
  },
  {
    settingKey: "rate_limit_window_ms",
    settingValue: 900000,
    description: "Rate limit window in milliseconds (default: 15 minutes)",
    category: "security",
  },
  {
    settingKey: "rate_limit_max_requests",
    settingValue: 500,
    description: "Maximum requests per rate limit window",
    category: "security",
  },

  // ==================== FEATURES SETTINGS ====================
  {
    settingKey: "enable_notifications",
    settingValue: true,
    description: "Enable platform notifications",
    category: "features",
  },
  {
    settingKey: "enable_email_notifications",
    settingValue: true,
    description: "Send email notifications for important events",
    category: "features",
  },
  {
    settingKey: "enable_analytics",
    settingValue: true,
    description: "Enable analytics tracking",
    category: "features",
  },
  {
    settingKey: "enable_recommendations",
    settingValue: true,
    description: "Enable AI-powered content recommendations",
    category: "features",
  },
  {
    settingKey: "enable_ai_tutor",
    settingValue: true,
    description: "Enable the AI tutor / chatbot feature",
    category: "features",
  },
  {
    settingKey: "enable_quizzes",
    settingValue: true,
    description: "Enable quiz and assessment features",
    category: "features",
  },
  {
    settingKey: "enable_resource_uploads",
    settingValue: true,
    description: "Allow users to upload resources (documents, images)",
    category: "features",
  },
  {
    settingKey: "auto_approve_resources",
    settingValue: false,
    description: "Auto-approve uploaded resources without admin review",
    category: "features",
  },
  {
    settingKey: "enable_student_progress_tracking",
    settingValue: true,
    description: "Enable student progress tracking and reporting",
    category: "features",
  },
  {
    settingKey: "enable_forum",
    settingValue: false,
    description: "Enable discussion forum feature",
    category: "features",
  },
  {
    settingKey: "enable_live_classes",
    settingValue: false,
    description: "Enable live/virtual classroom feature",
    category: "features",
  },
  {
    settingKey: "enable_certificates",
    settingValue: false,
    description: "Enable course completion certificates",
    category: "features",
  },

  // ==================== REGISTRATION SETTINGS ====================
  {
    settingKey: "allow_registration",
    settingValue: true,
    description: "Allow new user registrations",
    category: "registration",
  },
  {
    settingKey: "registration_requires_approval",
    settingValue: false,
    description: "New registrations require admin approval before access",
    category: "registration",
  },
  {
    settingKey: "student_registration_open",
    settingValue: true,
    description: "Allow student account registration",
    category: "registration",
  },
  {
    settingKey: "admin_registration_open",
    settingValue: false,
    description: "Allow admin account registration (typically disabled)",
    category: "registration",
  },
  {
    settingKey: "allowed_domains_for_registration",
    settingValue: [],
    description:
      "Restrict registration to specific email domains (empty = all domains allowed)",
    category: "registration",
  },
  {
    settingKey: "max_users",
    settingValue: 0,
    description: "Maximum number of users allowed (0 = unlimited)",
    category: "registration",
  },

  // ==================== CONTENT SETTINGS ====================
  {
    settingKey: "max_upload_size_mb",
    settingValue: 100,
    description: "Maximum file upload size in MB",
    category: "content",
  },
  {
    settingKey: "allowed_file_types",
    settingValue: [
      "pdf",
      "doc",
      "docx",
      "ppt",
      "pptx",
      "xls",
      "xlsx",
      "jpg",
      "jpeg",
      "png",
      "gif",
      "mp4",
      "mp3",
    ],
    description: "Allowed file types for upload",
    category: "content",
  },
  {
    settingKey: "default_resource_visibility",
    settingValue: "public",
    description:
      "Default visibility for new resources (public/private/restricted)",
    category: "content",
  },
  {
    settingKey: "max_resources_per_subject",
    settingValue: 50,
    description: "Maximum number of resources per subject",
    category: "content",
  },
  {
    settingKey: "enable_content_moderation",
    settingValue: true,
    description: "Enable content moderation for uploaded resources",
    category: "content",
  },
  {
    settingKey: "content_moderation_type",
    settingValue: "manual",
    description: "Content moderation type: manual, auto, or hybrid",
    category: "content",
  },

  // ==================== PAYMENT SETTINGS ====================
  {
    settingKey: "enable_payments",
    settingValue: false,
    description: "Enable payment/subscription features",
    category: "payments",
  },
  {
    settingKey: "currency",
    settingValue: "ETB",
    description: "Default currency for payments",
    category: "payments",
  },
  {
    settingKey: "payment_provider",
    settingValue: "",
    description: "Payment provider (e.g., chapa, stripe, paypal)",
    category: "payments",
  },
  {
    settingKey: "subscription_price_monthly",
    settingValue: 0,
    description: "Monthly subscription price",
    category: "payments",
  },
  {
    settingKey: "subscription_price_yearly",
    settingValue: 0,
    description: "Yearly subscription price (annual discount)",
    category: "payments",
  },
  {
    settingKey: "trial_days",
    settingValue: 7,
    description: "Free trial duration in days (0 = no trial)",
    category: "payments",
  },

  // ==================== AI SETTINGS ====================
  {
    settingKey: "ai_model",
    settingValue: "llama-3.1-8b-instant",
    description: "AI model used for the AI tutor feature",
    category: "ai",
  },
  {
    settingKey: "ai_temperature",
    settingValue: 0.7,
    description: "AI response creativity/randomness (0-1)",
    category: "ai",
  },
  {
    settingKey: "ai_max_tokens",
    settingValue: 2048,
    description: "Maximum tokens per AI response",
    category: "ai",
  },
  {
    settingKey: "ai_enable_personalized_learning",
    settingValue: true,
    description: "Enable personalized learning paths",
    category: "ai",
  },
  {
    settingKey: "ai_enable_quiz_generation",
    settingValue: true,
    description: "Enable AI-generated quiz questions",
    category: "ai",
  },
  {
    settingKey: "ai_daily_requests_per_user",
    settingValue: 50,
    description: "Daily AI request limit per user",
    category: "ai",
  },

  // ==================== NOTIFICATION SETTINGS ====================
  {
    settingKey: "notification_retention_days",
    settingValue: 90,
    description: "Number of days to retain notifications",
    category: "notifications",
  },
  {
    settingKey: "email_daily_digest",
    settingValue: false,
    description: "Send daily email digest of platform activity",
    category: "notifications",
  },
  {
    settingKey: "email_weekly_digest",
    settingValue: true,
    description: "Send weekly email digest of platform activity",
    category: "notifications",
  },
  {
    settingKey: "notify_on_new_resource",
    settingValue: true,
    description: "Notify users when new resources are added to their subjects",
    category: "notifications",
  },
  {
    settingKey: "notify_on_quiz_result",
    settingValue: true,
    description: "Notify users when quiz results are available",
    category: "notifications",
  },
  {
    settingKey: "notify_on_announcement",
    settingValue: true,
    description: "Notify users when announcements are published",
    category: "notifications",
  },
  {
    settingKey: "notify_admin_on_new_user",
    settingValue: true,
    description: "Notify admins when new users register",
    category: "notifications",
  },
  {
    settingKey: "notify_admin_on_ticket",
    settingValue: true,
    description: "Notify admins when support tickets are created",
    category: "notifications",
  },

  // ==================== CACHE SETTINGS ====================
  {
    settingKey: "cache_enabled",
    settingValue: true,
    description: "Enable response caching",
    category: "cache",
  },
  {
    settingKey: "cache_ttl_seconds",
    settingValue: 300,
    description: "Default cache TTL in seconds (default: 5 minutes)",
    category: "cache",
  },
  {
    settingKey: "cache_max_size_mb",
    settingValue: 50,
    description: "Maximum cache size in MB",
    category: "cache",
  },

  // ==================== INTEGRATION SETTINGS ====================
  {
    settingKey: "enable_backblaze_b2",
    settingValue: true,
    description: "Enable Backblaze B2 cloud storage for file uploads",
    category: "integrations",
  },
  {
    settingKey: "enable_groq_ai",
    settingValue: true,
    description: "Enable Groq AI for the AI tutor",
    category: "integrations",
  },
  {
    settingKey: "enable_google_oauth",
    settingValue: true,
    description: "Enable Google OAuth login",
    category: "integrations",
  },
  {
    settingKey: "enable_microsoft_oauth",
    settingValue: true,
    description: "Enable Microsoft OAuth login",
    category: "integrations",
  },
  {
    settingKey: "enable_smtp_email",
    settingValue: true,
    description: "Enable SMTP email sending",
    category: "integrations",
  },

  // ==================== THEME SETTINGS ====================
  {
    settingKey: "default_theme",
    settingValue: "light",
    description: "Default theme for new users (light/dark/system)",
    category: "theme",
  },
  {
    settingKey: "primary_color",
    settingValue: "#6366F1",
    description: "Primary brand color (hex)",
    category: "theme",
  },
  {
    settingKey: "secondary_color",
    settingValue: "#8B5CF6",
    description: "Secondary brand color (hex)",
    category: "theme",
  },
  {
    settingKey: "logo_url",
    settingValue: "",
    description: "URL to the platform logo image",
    category: "theme",
  },
  {
    settingKey: "favicon_url",
    settingValue: "",
    description: "URL to the favicon",
    category: "theme",
  },
  {
    settingKey: "custom_css",
    settingValue: "",
    description: "Custom CSS to inject into the platform",
    category: "theme",
  },

  // ==================== SOCIAL / SEO SETTINGS ====================
  {
    settingKey: "meta_description",
    settingValue:
      "SuccessBridge - Your Bridge to Academic Success. Access educational resources, quizzes, and AI-powered tutoring.",
    description: "Default SEO meta description",
    category: "seo",
  },
  {
    settingKey: "meta_keywords",
    settingValue:
      "education, learning, academic success, resources, quizzes, AI tutor",
    description: "Default SEO meta keywords",
    category: "seo",
  },
  {
    settingKey: "social_facebook_url",
    settingValue: "",
    description: "Facebook page URL",
    category: "seo",
  },
  {
    settingKey: "social_twitter_url",
    settingValue: "",
    description: "Twitter/X profile URL",
    category: "seo",
  },
  {
    settingKey: "social_linkedin_url",
    settingValue: "",
    description: "LinkedIn page URL",
    category: "seo",
  },
  {
    settingKey: "social_telegram_url",
    settingValue: "",
    description: "Telegram channel URL",
    category: "seo",
  },
  {
    settingKey: "social_youtube_url",
    settingValue: "",
    description: "YouTube channel URL",
    category: "seo",
  },
];

export const seedSettings = async (): Promise<void> => {
  try {
    const count = await SystemSetting.count();
    if (count > 0) {
      logger.info(`System settings already seeded (${count} settings found)`);
      return;
    }

    logger.info("Seeding system settings...");

    for (const setting of DEFAULT_SETTINGS) {
      await SystemSetting.findOrCreate({
        where: { settingKey: setting.settingKey },
        defaults: setting,
      });
    }

    const seededCount = await SystemSetting.count();
    logger.success(`Seeded ${seededCount} system settings successfully`);
  } catch (error) {
    logger.error("Error seeding system settings:", error);
    throw error;
  }
};
