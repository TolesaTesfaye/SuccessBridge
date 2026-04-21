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

// Create sequelize instance with fallback
const createSequelizeInstance = () => {
  const logging = process.env.NODE_ENV === "development" ? console.log : false;

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

  // HARDCODED SUPABASE CONNECTION (TEMPORARY FIX)
  // This ensures the connection works even if env vars aren't loading
  const SUPABASE_URL = "postgresql://postgres.oxnntnvtkngfoorkleay:702512Tol_Database@aws-1-eu-west-1.pooler.supabase.com:5432/postgres";
  
  // Try DATABASE_URL first, then fall back to hardcoded Supabase
  const databaseUrl = process.env.DATABASE_URL || SUPABASE_URL;
  
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
