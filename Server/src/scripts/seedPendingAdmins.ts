import bcrypt from "bcryptjs";
import User from "../models/User.js";
import sequelize from "../config/database.js";

const sampleAdmins = [
  {
    name: "Demo Admin One",
    email: "admin.one@example.com",
    password: "ChangeMe123!",
    university: "Demo University",
    department: "Computer Science",
    documents: [
      "CV.pdf",
      "Degree_Certificate.pdf",
      "ID_Card.pdf",
      "Teaching_License.pdf",
    ],
  },
  {
    name: "Demo Admin Two",
    email: "admin.two@example.com",
    password: "ChangeMe123!",
    university: "Demo University",
    department: "Mathematics",
    documents: ["CV.pdf", "Degree_Certificate.pdf", "ID_Card.pdf"],
  },
  {
    name: "Demo Admin Three",
    email: "admin.three@example.com",
    password: "ChangeMe123!",
    university: "Demo University",
    department: "Physics",
    documents: ["CV.pdf", "PhD_Certificate.pdf"],
  },
  {
    name: "Demo Admin Four",
    email: "admin.four@example.com",
    password: "ChangeMe123!",
    university: "Demo University",
    department: "Chemistry",
    documents: ["CV.pdf", "Masters_Certificate.pdf", "Recommendation.pdf"],
  },
];

async function seedPendingAdmins() {
  try {
    console.log("🌱 Seeding pending admin requests...");

    // Connect to database
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Create pending admin accounts
    for (const adminData of sampleAdmins) {
      const existingUser = await User.findOne({
        where: { email: adminData.email },
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        await User.create({
          name: adminData.name,
          email: adminData.email,
          password: hashedPassword,
          role: "admin",
          university: adminData.university,
          department: adminData.department,
          documents: adminData.documents,
          isApproved: false,
          approvalStatus: "pending",
        } as any);

        console.log(`✅ Created pending admin: ${adminData.name}`);
      } else {
        console.log(`⚠️  Admin already exists: ${adminData.name}`);
      }
    }

    console.log("🎉 Pending admin seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding pending admins:", error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedPendingAdmins();
}

export default seedPendingAdmins;
