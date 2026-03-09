import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

interface IStudentProgress {
  id: string
  studentId: string
  subjectId: string
  resourcesCompleted: number
  quizzesCompleted: number
  averageScore: number
  lastAccessedAt: Date
}

class StudentProgress extends Model<IStudentProgress> implements IStudentProgress {
  public id!: string
  public studentId!: string
  public subjectId!: string
  public resourcesCompleted!: number
  public quizzesCompleted!: number
  public averageScore!: number
  public lastAccessedAt!: Date
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

StudentProgress.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    resourcesCompleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    quizzesCompleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    averageScore: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    lastAccessedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'student_progress',
    timestamps: true,
  },
)

export default StudentProgress
