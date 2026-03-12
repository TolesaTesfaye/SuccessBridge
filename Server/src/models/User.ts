import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'
import { IUser } from '../types/index.js'

class User extends Model<IUser> implements IUser {
  public id!: string
  public email!: string
  public name!: string
  public password!: string
  public role!: 'student' | 'admin' | 'super_admin'
  public studentType?: 'high_school' | 'university'
  public highSchoolGrade?: 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12'
  public highSchoolStream?: 'natural' | 'social'
  public universityLevel?: 'remedial' | 'freshman' | 'senior' | 'gc'
  public university?: string
  public department?: string
  public universityId?: string
  public departmentId?: string
  public gradeId?: string
  public streamId?: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('student', 'admin', 'super_admin'),
      defaultValue: 'student',
    },
    studentType: {
      type: DataTypes.ENUM('high_school', 'university'),
      allowNull: true,
    },
    highSchoolGrade: {
      type: DataTypes.ENUM('grade_9', 'grade_10', 'grade_11', 'grade_12'),
      allowNull: true,
    },
    highSchoolStream: {
      type: DataTypes.ENUM('natural', 'social'),
      allowNull: true,
    },
    universityLevel: {
      type: DataTypes.ENUM('remedial', 'freshman', 'senior', 'gc'),
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
  } as any,
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  },
)

export default User
