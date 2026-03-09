import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

interface IQuizResult {
  id: string
  quizId: string
  studentId: string
  score: number
  totalPoints: number
  timeSpent: number
  answers: Record<string, string>
  passed: boolean
}

class QuizResult extends Model<IQuizResult> implements IQuizResult {
  public id!: string
  public quizId!: string
  public studentId!: string
  public score!: number
  public totalPoints!: number
  public timeSpent!: number
  public answers!: Record<string, string>
  public passed!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

QuizResult.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quizId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeSpent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    answers: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    passed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'quiz_results',
    timestamps: true,
  },
)

export default QuizResult
