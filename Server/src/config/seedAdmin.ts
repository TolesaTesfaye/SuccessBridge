import bcrypt from "bcryptjs";
import User from "../models/User.js";
import AdminRequest from "../models/AdminRequest.js";

export const seedSuperAdmin = async () => {
  try {
    // Super Admin Credentials
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;
    const superAdminName = process.env.SUPER_ADMIN_NAME || "Super Admin";

    if (!superAdminEmail || !superAdminPassword) {
      console.warn(
        "⚠️  SUPER_ADMIN_EMAIL/SUPER_ADMIN_PASSWORD not set; skipping super admin seeding",
      );
      return;
    }

    // Check if super admin already exists
    const existingAdmin = await User.findOne({
      where: { email: superAdminEmail },
    });

    if (existingAdmin) {
      console.log("✅ Super admin already exists:", superAdminEmail);
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

      // Create super admin
      await User.create({
        email: superAdminEmail,
        name: superAdminName,
        password: hashedPassword,
        role: "super_admin",
        isApproved: true,
        approvalStatus: "approved",
        approvedAt: new Date(),
      } as any);

      console.log(`✅ Super admin created: ${superAdminEmail}`);
    }
    // NOTE: Admin requests are created via the normal registration flow.
    // Avoid creating shared/standard credentials in code.
  } catch (error) {
    console.error("❌ Error seeding admins:", error);
  }
};
