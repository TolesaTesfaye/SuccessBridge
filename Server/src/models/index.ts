import User from './User.js'
import AdminRequest from './AdminRequest.js'
import Resource from './Resource.js'
import Subject from './Subject.js'
import Quiz from './Quiz.js'
import QuizResult from './QuizResult.js'
import University from './University.js'
import Grade from './Grade.js'
import Stream from './Stream.js'
import Department from './Department.js'
import StudentProgress from './StudentProgress.js'
import ResourceAccess from './ResourceAccess.js'
import Payment from './Payment.js'
import SubjectAccess from './SubjectAccess.js'
import Notification from './Notification.js'
import AuditLog from './AuditLog.js'

// Define relationships
export const setupAssociations = () => {
  // User relationships
  User.belongsTo(University, { foreignKey: 'universityId', as: 'universityData' })
  User.belongsTo(Department, { foreignKey: 'departmentId', as: 'departmentData' })
  User.belongsTo(Grade, { foreignKey: 'gradeId', as: 'grade' })
  User.belongsTo(Stream, { foreignKey: 'streamId', as: 'stream' })
  User.hasMany(Resource, { foreignKey: 'uploadedBy', as: 'uploadedResources' })
  User.hasMany(Quiz, { foreignKey: 'createdBy', as: 'createdQuizzes' })
  User.hasMany(QuizResult, { foreignKey: 'studentId', as: 'quizResults' })
  User.hasMany(StudentProgress, { foreignKey: 'studentId', as: 'progress' })
  User.hasMany(ResourceAccess, { foreignKey: 'studentId', as: 'resourceAccess' })
  User.hasMany(Payment, { foreignKey: 'userId', as: 'payments' })
  User.hasMany(SubjectAccess, { foreignKey: 'userId', as: 'subjectAccess' })
  User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' })

  // University relationships
  University.hasMany(Department, { foreignKey: 'universityId', as: 'departments' })
  University.hasMany(User, { foreignKey: 'universityId', as: 'users' })
  University.hasMany(Resource, { foreignKey: 'universityId', as: 'resources' })

  // Department relationships
  Department.belongsTo(University, { foreignKey: 'universityId', as: 'university' })
  Department.hasMany(User, { foreignKey: 'departmentId', as: 'users' })
  Department.hasMany(Subject, { foreignKey: 'departmentId', as: 'subjects' })
  Department.hasMany(Resource, { foreignKey: 'departmentId', as: 'resources' })

  // Grade relationships
  Grade.hasMany(User, { foreignKey: 'gradeId', as: 'users' })
  Grade.hasMany(Stream, { foreignKey: 'gradeId', as: 'streams' })
  Grade.hasMany(Subject, { foreignKey: 'gradeId', as: 'subjects' })

  // Stream relationships
  Stream.belongsTo(Grade, { foreignKey: 'gradeId', as: 'grade' })
  Stream.hasMany(User, { foreignKey: 'streamId', as: 'users' })
  Stream.hasMany(Subject, { foreignKey: 'streamId', as: 'subjects' })

  // Subject relationships
  Subject.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' })
  Subject.belongsTo(Grade, { foreignKey: 'gradeId', as: 'grade' })
  Subject.belongsTo(Stream, { foreignKey: 'streamId', as: 'stream' })
  Subject.hasMany(Quiz, { foreignKey: 'subjectId', as: 'quizzes' })
  Subject.hasMany(Resource, { foreignKey: 'subjectId', as: 'resources' })
  Subject.hasMany(StudentProgress, { foreignKey: 'subjectId', as: 'progress' })
  Subject.hasMany(Payment, { foreignKey: 'subjectId', as: 'payments' })
  Subject.hasMany(SubjectAccess, { foreignKey: 'subjectId', as: 'subjectAccess' })

  // Quiz relationships
  Quiz.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' })
  Quiz.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' })
  Quiz.hasMany(QuizResult, { foreignKey: 'quizId', as: 'results' })

  // QuizResult relationships
  QuizResult.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz' })
  QuizResult.belongsTo(User, { foreignKey: 'studentId', as: 'student' })

  // Resource relationships
  Resource.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' })
  Resource.belongsTo(University, { foreignKey: 'universityId', as: 'university' })
  Resource.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' })
  Resource.belongsTo(User, { foreignKey: 'uploadedBy', as: 'uploader' })
  Resource.hasMany(ResourceAccess, { foreignKey: 'resourceId', as: 'access' })

  // StudentProgress relationships
  StudentProgress.belongsTo(User, { foreignKey: 'studentId', as: 'student' })
  StudentProgress.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' })

  // ResourceAccess relationships
  ResourceAccess.belongsTo(User, { foreignKey: 'studentId', as: 'student' })
  ResourceAccess.belongsTo(Resource, { foreignKey: 'resourceId', as: 'resource' })

  // Payment relationships
  Payment.belongsTo(User, { foreignKey: 'userId', as: 'user' })
  Payment.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' })
  Payment.belongsTo(User, { foreignKey: 'approvedBy', as: 'approver' })
  Payment.hasOne(SubjectAccess, { foreignKey: 'paymentId', as: 'subjectAccess' })

  // SubjectAccess relationships
  SubjectAccess.belongsTo(User, { foreignKey: 'userId', as: 'user' })
  SubjectAccess.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' })
  SubjectAccess.belongsTo(Payment, { foreignKey: 'paymentId', as: 'payment' })

  // Notification relationships
  Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' })
}

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
  Department,
  StudentProgress,
  ResourceAccess,
  Payment,
  SubjectAccess,
  Notification,
  AuditLog,
}
