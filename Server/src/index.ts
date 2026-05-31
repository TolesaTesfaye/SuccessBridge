import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import { Op } from "sequelize";
import sequelize, { testMainConnection } from "./config/database.js";
import {
  shouldAlterSchema,
  syncModelsWithRetry,
} from "./config/syncDatabase.js";
import { connectRedis } from "./config/redis.js";
import { seedSuperAdmin } from "./config/seedAdmin.js";
import { seedSettings } from "./config/seedSettings.js";
import { seedEducationData } from "./config/seedEducationData.js";
import { setupSwagger } from "./config/swagger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { auditMiddleware } from "./middleware/auditLogger.js";
import { logger } from "./utils/logger.js";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import resourceRoutes from "./routes/resources.js";
import userRoutes from "./routes/users.js";
import subjectsRoutes from "./routes/subjects.js";
import quizzesRoutes from "./routes/quizzes.js";
import universitiesRoutes from "./routes/universities.js";
import departmentsRoutes from "./routes/departments.js";
import studentRoutes from "./routes/student.js";
import settingsRoutes from "./routes/settings.js";
import gradesRoutes from "./routes/grades.js";
import streamsRoutes from "./routes/streams.js";
import systemRoutes from "./routes/system.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import diagnosticRoutes from "./routes/diagnostic.js";
import auditRoutes from "./routes/audit.js";
import securityRoutes from "./routes/securityRoutes.js";
import managementRoutes from "./routes/managementRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import aiRoutes from "./routes/ai.js";
import resourceTypesRoutes from "./routes/resourceTypes.js";

// Import all models to ensure they are registered with Sequelize
import User from "./models/User.js";
import AdminRequest from "./models/AdminRequest.js";
import PendingUser from "./models/PendingUser.js";
import Resource from "./models/Resource.js";
import Subject from "./models/Subject.js";
import Quiz from "./models/Quiz.js";
import QuizResult from "./models/QuizResult.js";
import University from "./models/University.js";
import Grade from "./models/Grade.js";
import Stream from "./models/Stream.js";
import Department from "./models/Department.js";
import StudentProgress from "./models/StudentProgress.js";
import ResourceAccess from "./models/ResourceAccess.js";
import Payment from "./models/Payment.js";
import SubjectAccess from "./models/SubjectAccess.js";
import Notification from "./models/Notification.js";
import AuditLog from "./models/AuditLog.js";
import ResourceType from "./models/ResourceType.js";
import { setupAssociations } from "./models/index.js";
import { cacheMiddleware } from "./middleware/cacheMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy - Required for Render and other cloud platforms
// This allows Express to trust the X-Forwarded-For header from reverse proxies
app.set("trust proxy", 1);

// Security and Performance Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        fontSrc: ["'self'", "data:"],
        // Allow both HTTP and HTTPS for local network development
        connectSrc: [
          "'self'",
          "http:",
          "https:",
          "ws:",
          "wss:",
          "http://localhost:*",
          "http://127.0.0.1:*",
          "http://192.168.*:*",
          "http://192.168.0.114:5000",
        ],
        frameSrc: ["'self'", "blob:", "data:"], // Allow iframes for PDF previews
        frameAncestors: [
          "'self'",
          "http://localhost:*",
          "http://127.0.0.1:*",
          "http://192.168.*:*",
        ],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  }),
);

// Additional security headers
app.use((req, res, next) => {
  // X-Frame-Options - Prevent clickjacking (set via header, not meta)
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  // X-Content-Type-Options - Prevent MIME sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // X-XSS-Protection
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Increased limit to 500 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) =>
    req.method === "OPTIONS" ||
    req.originalUrl.startsWith("/api/auth/login") ||
    req.originalUrl.startsWith("/api/auth/register") ||
    req.originalUrl.startsWith("/api/auth/forgot-password") ||
    req.originalUrl.startsWith("/api/auth/reset-password") ||
    req.originalUrl.startsWith("/api/payments"), // Skip rate limiting for payment routes
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// Middleware

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://successbridge.pages.dev",
      "http://192.168.0.114:3000/",
    ].filter(Boolean);

    // In development, allow all localhost/127.0.0.1 origins
    const isDevelopment =
      process.env.NODE_ENV === "development" || !process.env.NODE_ENV;
    const isLocalhost =
      origin && (origin.includes("localhost") || origin.includes("127.0.0.1"));

    // Allow requests with no origin (like mobile apps, curl) or if origin is in allowed list
    // Also allow: Cloudflare Pages (.pages.dev), Vercel (.vercel.app), Netlify (.netlify.app), GitHub Pages (.github.io)
    const isAllowedDomain =
      origin &&
      (origin.endsWith(".pages.dev") ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".netlify.app") ||
        origin.includes(".github.io"));

    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      isAllowedDomain ||
      (isDevelopment && isLocalhost)
    ) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
};

app.use(cors(corsOptions));
app.options("/api/*", cors(corsOptions));

// Apply rate limiting to API requests after CORS so preflight responses keep the headers
app.use("/api/", limiter);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(passport.initialize());
app.use(auditMiddleware);

// Apply caching middleware for GET requests (5 minute TTL)
app.use(
  "/api/",
  cacheMiddleware({
    ttl: 300,
    exclude: ["/auth", "/notifications", "/payments", "/user/preferences"],
  }),
);

// Setup Swagger documentation (only in development)
if (process.env.NODE_ENV === "development") {
  setupSwagger(app);
}

// Static files - ensure upload directory exists
const setupUploads = () => {
  const uploadDir = process.env.UPLOAD_DIR || "./uploads";
  const resolvedUploadDir = path.resolve(uploadDir);

  console.log("🗂️ Setting up uploads directory:", resolvedUploadDir);

  try {
    if (!fs.existsSync(resolvedUploadDir)) {
      fs.mkdirSync(resolvedUploadDir, { recursive: true });
      console.log("✅ Created uploads directory:", resolvedUploadDir);
    } else {
      console.log("✅ Uploads directory exists:", resolvedUploadDir);
    }

    // Serve static files from uploads directory
    app.use("/uploads", express.static(resolvedUploadDir));
    console.log(
      "✅ Static file serving configured for /uploads ->",
      resolvedUploadDir,
    );
  } catch (error) {
    console.error("❌ Upload directory setup failed:", error);
  }
};

setupUploads();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/quizzes", quizzesRoutes);
app.use("/api/universities", universitiesRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/grades", gradesRoutes);
app.use("/api/streams", streamsRoutes);
app.use("/api/system", systemRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/diagnostic", diagnosticRoutes);
app.use("/api/admin", auditRoutes);
app.use("/api/admin/security", securityRoutes);
app.use("/api/admin/management", managementRoutes);
app.use("/api/admin/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/resource-types", resourceTypesRoutes);

// Health check
app.get("/health", async (req, res) => {
  try {
    // Test database connection
    await sequelize.authenticate();
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      database: "connected",
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    res.status(503).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: "Database connection failed",
    });
  }
});

// Error handling
app.use(errorHandler);

// Database connection and server start
const startServer = async () => {
  let dbSyncOk: boolean | undefined;

  try {
    logger.info("Starting SuccessBridge server...");

    // Setup model associations
    setupAssociations();

    // Test database connection with enhanced handling
    const connectionSuccess = await testMainConnection();

    if (!connectionSuccess) {
      logger.warn(
        "⚠️  Database connection failed, starting server in limited mode",
      );
      logger.warn("   - Health check will show database as disconnected");
      logger.warn("   - Some features may not work properly");
      logger.warn("   - Fix database connection and restart server");
    } else {
      // Only sync and seed if database connection is successful
      const useAlter = shouldAlterSchema();

      try {
        // Safe by default: create missing tables only. Set DB_SYNC_ALTER=true to migrate columns.
        await syncModelsWithRetry(sequelize, { alter: useAlter });
        logger.database(
          useAlter ? "Models synced (alter mode)" : "Models synced",
        );

        const pendingAlter = useAlter && process.env.NODE_ENV === "development";
        try {
          await PendingUser.sync({ alter: pendingAlter });
          logger.database("PendingUser table verified/created");
        } catch (pendingUserError) {
          logger.error("Failed to sync PendingUser table:", pendingUserError);
        }

        try {
          await AuditLog.sync({ alter: pendingAlter });
          logger.database("AuditLog table verified/created");
        } catch (auditLogError) {
          logger.error("Failed to sync AuditLog table:", auditLogError);
        }

        await seedSuperAdmin();
        logger.info("Super admin checked/seeded");

        // Seed default system settings if empty
        try {
          await seedSettings();
        } catch (settingsError) {
          logger.error("Failed to seed system settings:", settingsError);
        }

        // Seed education hierarchy data (grades, streams, subjects, universities)
        try {
          await seedEducationData();
        } catch (educationError) {
          logger.error("Failed to seed education data:", educationError);
        }
        dbSyncOk = true;
      } catch (syncError) {
        dbSyncOk = false;
        logger.error("Database sync/seed failed:", syncError);
        logger.warn("Server will start but database operations may fail");
        if (useAlter) {
          logger.warn(
            "Tip: unset DB_SYNC_ALTER or use Supabase direct connection (port 5432) for migrations",
          );
        }
      }
    }

    // Connect to Redis (optional, don't fail if Redis is unavailable)
    try {
      await connectRedis();
    } catch (redisError) {
      logger.warn("Redis connection failed, continuing without Redis");
    }

    // Start the server regardless of database status
    app.listen(PORT, () => {
      logger.server(`Server running on port ${PORT}`);
      if (process.env.NODE_ENV === "development") {
        logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
      }
      logger.info(`🔍 Health check: http://localhost:${PORT}/health`);

      if (connectionSuccess && dbSyncOk !== false) {
        logger.success(
          dbSyncOk
            ? "SuccessBridge server started successfully with database!"
            : "SuccessBridge server started (database connected; sync had warnings)",
        );

        // Start periodic cleanup of expired pending users (every hour)
        setInterval(
          async () => {
            try {
              const result = await PendingUser.destroy({
                where: {
                  verificationExpires: {
                    [Op.lt]: new Date(),
                  },
                },
              });
              if (result > 0) {
                logger.info(`🧹 Cleaned up ${result} expired pending user(s)`);
              }
            } catch (error) {
              logger.error("Error cleaning up pending users:", error);
            }
          },
          60 * 60 * 1000,
        ); // Run every hour
      } else {
        logger.warn(
          "SuccessBridge server started in limited mode (no database)",
        );
        logger.info(
          "Fix database connection and restart for full functionality",
        );
      }
    });
  } catch (error) {
    logger.error("Failed to start server:", error);

    // Try to start server without database as last resort
    try {
      logger.warn("Attempting to start server without database...");
      app.listen(PORT, () => {
        logger.server(`Server running on port ${PORT} (NO DATABASE)`);
        logger.warn(
          "Fix database connection and restart for full functionality",
        );
      });
    } catch (finalError) {
      logger.error("Complete server startup failure:", finalError);
      process.exit(1);
    }
  }
};

startServer();

// Graceful shutdown
process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, shutting down gracefully");
  try {
    await sequelize.close();
    logger.info("Database connection closed");
    process.exit(0);
  } catch (error) {
    logger.error("Error during shutdown:", error);
    process.exit(1);
  }
});

process.on("SIGINT", async () => {
  logger.info("SIGINT received, shutting down gracefully");
  try {
    await sequelize.close();
    logger.info("Database connection closed");
    process.exit(0);
  } catch (error) {
    logger.error("Error during shutdown:", error);
    process.exit(1);
  }
});

export default app;
