import User from "./User.js";
import AdminRequest from "./AdminRequest.js";
import Resource from "./Resource.js";
import Subject from "./Subject.js";
import Quiz from "./Quiz.js";
import QuizResult from "./QuizResult.js";
import University from "./University.js";
import Grade from "./Grade.js";
import Stream from "./Stream.js";
import StudentProgress from "./StudentProgress.js";
import ResourceAccess from "./ResourceAccess.js";
import Payment from "./Payment.js";
import SubjectAccess from "./SubjectAccess.js";
import Notification from "./Notification.js";
import AuditLog from "./AuditLog.js";
import StudentCategoryAccess from "./StudentCategoryAccess.js";
import AccessPackage from "./AccessPackage.js";

// Define relationships
export const setupAssociations = () => {
  // User relationships
  User.belongsTo(University, {
    foreignKey: "universityId",
    as: "universityData",
    onDelete: "SET NULL",
  });
  User.belongsTo(Grade, { foreignKey: "gradeId", as: "grade", onDelete: "SET NULL" });
  User.belongsTo(Stream, { foreignKey: "streamId", as: "stream", onDelete: "SET NULL" });
  User.hasMany(Resource, { foreignKey: "uploadedBy", as: "uploadedResources" });
  User.hasMany(Quiz, { foreignKey: "createdBy", as: "createdQuizzes" });
  User.hasMany(QuizResult, { foreignKey: "studentId", as: "quizResults" });
  User.hasMany(StudentProgress, { foreignKey: "studentId", as: "progress" });
  User.hasMany(ResourceAccess, {
    foreignKey: "studentId",
    as: "resourceAccess",
  });
  User.hasMany(Payment, { foreignKey: "userId", as: "payments" });
  User.hasMany(SubjectAccess, { foreignKey: "userId", as: "subjectAccess" });
  User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });

  // University relationships
  University.hasMany(User, { foreignKey: "universityId", as: "users" });
  University.hasMany(Resource, { foreignKey: "universityId", as: "resources" });

  // Grade relationships
  Grade.hasMany(User, { foreignKey: "gradeId", as: "users" });
  Grade.hasMany(Stream, {
    foreignKey: "gradeId",
    as: "streams",
    onDelete: "CASCADE",
  });
  Grade.hasMany(Subject, {
    foreignKey: "gradeId",
    as: "subjects",
    onDelete: "CASCADE",
  });

  // Stream relationships
  Stream.belongsTo(Grade, { foreignKey: "gradeId", as: "grade", onDelete: "CASCADE" });
  Stream.hasMany(User, { foreignKey: "streamId", as: "users" });
  Stream.hasMany(Subject, {
    foreignKey: "streamId",
    as: "subjects",
    onDelete: "CASCADE",
  });

  // Subject relationships
  Subject.belongsTo(Grade, { foreignKey: "gradeId", as: "grade", onDelete: "CASCADE" });
  Subject.belongsTo(Stream, { foreignKey: "streamId", as: "stream", onDelete: "CASCADE" });
  Subject.hasMany(Quiz, { foreignKey: "subjectId", as: "quizzes" });
  Subject.hasMany(Resource, { foreignKey: "subjectId", as: "resources" });
  Subject.hasMany(StudentProgress, { foreignKey: "subjectId", as: "progress" });
  Subject.hasMany(Payment, { foreignKey: "subjectId", as: "payments" });
  Subject.hasMany(SubjectAccess, {
    foreignKey: "subjectId",
    as: "subjectAccess",
  });

  // Quiz relationships
  Quiz.belongsTo(Subject, { foreignKey: "subjectId", as: "subject", onDelete: "SET NULL" });
  Quiz.belongsTo(User, { foreignKey: "createdBy", as: "creator" });
  Quiz.hasMany(QuizResult, { foreignKey: "quizId", as: "results" });

  // QuizResult relationships
  QuizResult.belongsTo(Quiz, { foreignKey: "quizId", as: "quiz" });
  QuizResult.belongsTo(User, { foreignKey: "studentId", as: "student" });

  // Resource relationships
  Resource.belongsTo(Subject, { foreignKey: "subjectId", as: "subject", onDelete: "SET NULL" });
  Resource.belongsTo(University, {
    foreignKey: "universityId",
    as: "university",
    onDelete: "SET NULL",
  });
  Resource.belongsTo(User, { foreignKey: "uploadedBy", as: "uploader" });
  Resource.hasMany(ResourceAccess, { foreignKey: "resourceId", as: "access" });

  // StudentProgress relationships
  StudentProgress.belongsTo(User, { foreignKey: "studentId", as: "student" });
  StudentProgress.belongsTo(Subject, {
    foreignKey: "subjectId",
    as: "subject",
    onDelete: "SET NULL",
  });

  // ResourceAccess relationships
  ResourceAccess.belongsTo(User, { foreignKey: "studentId", as: "student" });
  ResourceAccess.belongsTo(Resource, {
    foreignKey: "resourceId",
    as: "resource",
    onDelete: "CASCADE",
  });

  // Payment relationships
  Payment.belongsTo(User, { foreignKey: "userId", as: "user" });
  Payment.belongsTo(Subject, {
    foreignKey: "subjectId",
    as: "subject",
    onDelete: "SET NULL",
  });
  Payment.belongsTo(User, { foreignKey: "approvedBy", as: "approver" });
  Payment.belongsTo(AccessPackage, {
    foreignKey: "packageId",
    as: "package",
    onDelete: "SET NULL",
  });
  Payment.hasOne(SubjectAccess, {
    foreignKey: "paymentId",
    as: "subjectAccess",
    onDelete: "CASCADE",
  });
  Payment.hasOne(StudentCategoryAccess, {
    foreignKey: "paymentId",
    as: "categoryAccess",
    onDelete: "CASCADE",
  });

  // SubjectAccess relationships
  SubjectAccess.belongsTo(User, { foreignKey: "userId", as: "user" });
  SubjectAccess.belongsTo(Subject, {
    foreignKey: "subjectId",
    as: "subject",
    onDelete: "CASCADE",
  });
  SubjectAccess.belongsTo(Payment, {
    foreignKey: "paymentId",
    as: "payment",
    onDelete: "CASCADE",
  });

  // StudentCategoryAccess relationships
  StudentCategoryAccess.belongsTo(User, { foreignKey: "userId", as: "user" });
  StudentCategoryAccess.belongsTo(Payment, {
    foreignKey: "paymentId",
    as: "payment",
    onDelete: "CASCADE",
  });
  StudentCategoryAccess.belongsTo(University, {
    foreignKey: "universityId",
    as: "university",
    onDelete: "SET NULL",
  });

  // AccessPackage relationships
  AccessPackage.hasMany(Payment, { foreignKey: "packageId", as: "payments" });

  // Notification relationships
  Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

  // AuditLog relationships
  AuditLog.belongsTo(User, { foreignKey: "userId", as: "user" });
};

export {
  User,
  AdminRequest,
  Resource,
  Subject,
  Quiz,
  QuizResult,
  University,
  Grade,
  Stream,
  StudentProgress,
  ResourceAccess,
  Payment,
  SubjectAccess,
  StudentCategoryAccess,
  AccessPackage,
  Notification,
  AuditLog,
};
