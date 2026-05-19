import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Test connection function
export const testConnection = async (
  sequelize: Sequelize,
  connectionName: string,
) => {
  try {
    console.log(`🔍 Testing ${connectionName} connection...`);
    console.log(`📍 Host: ${process.env.DB_HOST}`);
    console.log(`🔌 Port: ${process.env.DB_PORT}`);
    console.log(`🗄️  Database: ${process.env.DB_NAME}`);
    console.log(`👤 User: ${process.env.DB_USER}`);
    console.log(
      `🔐 Password: ${process.env.DB_PASSWORD ? "[SET]" : "[NOT SET]"}`,
    );

    await sequelize.authenticate();
    console.log(`✅ ${connectionName} connection successful!`);
    return true;
  } catch (error: any) {
    console.error(`❌ ${connectionName} connection failed:`, error.message);
    console.error("🔍 Error details:", {
      code: error.code,
      errno: error.errno,
      syscall: error.syscall,
      hostname: error.hostname,
    });
    return false;
  }
};

// Custom logging function - only logs essential information
const createLoggingFunction = () => {
  const debugMode = process.env.DEBUG_SQL === "true";

  return (msg: string) => {
    // Only log in development and if debug mode is enabled
    if (process.env.NODE_ENV !== "development" || !debugMode) {
      return; // Suppress logs
    }

    // Filter out repetitive Sequelize queries
    const skipPatterns = [
      /^Executing \(default\):/, // Suppress "Executing (default): SELECT..."
      /^SELECT/, // Suppress raw SELECT queries
      /^Deprecated:/, // Skip deprecation warnings
    ];

    // Only show if it matches important patterns
    const importantPatterns = [
      /CREATE TABLE/,
      /DROP TABLE/,
      /ALTER TABLE/,
      /INSERT INTO/,
      /UPDATE/,
      /DELETE FROM/,
      /ERROR/,
      /error/,
    ];

    // Skip if matches any skip pattern
    if (skipPatterns.some((pattern) => pattern.test(msg))) {
      return;
    }

    // Only log if it's an important operation or debug mode shows everything
    if (importantPatterns.some((pattern) => pattern.test(msg)) || debugMode) {
      console.log(`[DB] ${msg}`);
    }
  };
};

// Create sequelize instance with fallback
const createSequelizeInstance = () => {
  const logging =
    process.env.NODE_ENV === "development" ? createLoggingFunction() : false;

  const isSupabaseHost = (host?: string) => (host ?? "").includes("supabase");
  const isSupabaseUrl = (url?: string) => (url ?? "").includes("supabase");

  const buildDialectOptions = (useSsl: boolean) => ({
    ssl: useSsl
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : false,
    family: 4, // Force IPv4
    connectTimeout: 10000, // 10 seconds timeout
  });

  const commonOptions = {
    logging,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    retry: {
      match: [
        /ECONNRESET/,
        /ENOTFOUND/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
      ],
      max: 3,
    },
  };

  // Use DATABASE_URL from environment variables
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("❌ DATABASE_URL is not defined in environment variables!");
    throw new Error("DATABASE_URL is required for database connection");
  }

  console.log("🔄 Attempting database connection...");
  console.log(`📍 Using URL: ${databaseUrl.substring(0, 30)}...`);

  return new Sequelize(databaseUrl, {
    dialect: "postgres",
    dialectOptions: buildDialectOptions(true), // Always use SSL for Supabase
    ...commonOptions,
  });
};

// Create the sequelize instance
const sequelize = createSequelizeInstance();

// Enhanced test function for the main instance
export const testMainConnection = async () => {
  console.log("🔍 Testing database connection...");

  const success = await testConnection(sequelize, "Supabase PostgreSQL");

  if (!success) {
    console.log("❌ Database connection failed");
    console.log("🔄 This might be due to:");
    console.log("   1. Network connectivity issues");
    console.log("   2. Incorrect credentials");
    console.log("   3. Database not accessible from this region");
  } else {
    console.log("✅ Database connection successful!");
  }

  return success;
};

export default sequelize;
