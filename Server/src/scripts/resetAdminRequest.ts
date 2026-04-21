import AdminRequest from "../models/AdminRequest.js";
import User from "../models/User.js";
import sequelize from "../config/database.js";

const resetAdminRequest = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    const targetEmail = process.env.ADMIN_REQUEST_EMAIL;

    if (!targetEmail) {
      console.error("❌ ADMIN_REQUEST_EMAIL is required");
      process.exit(1);
    }

    // Remove any existing admin user with this email
    const existingUser = await User.findOne({ where: { email: targetEmail } });
    if (existingUser) {
      await existingUser.destroy();
      console.log(`🗑️  Removed existing user: ${targetEmail}`);
    }

    // Remove any existing admin request
    const existingRequest = await AdminRequest.findOne({
      where: { email: targetEmail },
    });
    if (existingRequest) {
      await existingRequest.destroy();
      console.log(`🗑️  Removed existing admin request: ${targetEmail}`);
    }

    await sequelize.close();
    console.log("✅ Database connection closed");
    console.log("🔄 Ready for new admin request workflow");
  } catch (error) {
    console.error("❌ Error resetting admin request:", error);
    process.exit(1);
  }
};

resetAdminRequest();
