import User from './User'
import Resource from './Resource'
import Subject from './Subject'
import Quiz from './Quiz'
import QuizResult from './QuizResult'
import University from './University'
import Grade from './Grade'
import Stream from './Stream'
import Department from './Department'
import StudentProgress from './StudentProgress'
import ResourceAccess from './ResourceAccess'

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
}

export {
  User,
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
}
