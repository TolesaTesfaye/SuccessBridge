import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

interface IQuestion {
  id: string
  text: string
  type: 'multiple_choice' | 'short_answer' | 'essay'
  options?: string[]
  correctAnswer: string
  points: number
}

interface IQuiz {
  id: string
  title: string
  description: string
  subjectId: string
  educationLevel: 'high_school' | 'university'
  /** High school: grade_9–12; university: remedial | freshman | senior | gc */
  grade?: string
  stream?: string
  /** University name (matches User.university) */
  university?: string
  /** Department name for senior/gc (matches User.department) */
  department?: string
  questions: IQuestion[]
  timeLimit: number
  passingScore: number
  createdBy: string
  isAiGenerated?: boolean
}

class Quiz extends Model<IQuiz> implements IQuiz {
  public id!: string
  public title!: string
  public description!: string
  public subjectId!: string
  public educationLevel!: 'high_school' | 'university'
  public grade?: string
  public stream?: string
  public university?: string
  public department?: string
  public questions!: IQuestion[]
  public timeLimit!: number
  public passingScore!: number
  public createdBy!: string
  public isAiGenerated!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Quiz.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    educationLevel: {
      type: DataTypes.ENUM('high_school', 'university'),
      defaultValue: 'high_school',
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stream: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    university: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    questions: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    timeLimit: {
      type: DataTypes.INTEGER,
      defaultValue: 30,
    },
    passingScore: {
      type: DataTypes.INTEGER,
      defaultValue: 60,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isAiGenerated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'quizzes',
    timestamps: true,
  },
)

export default Quiz
