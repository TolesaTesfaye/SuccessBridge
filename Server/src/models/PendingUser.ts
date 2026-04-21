import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

interface IPendingUser {
  id?: string;
  email: string;
  name: string;
  password: string;
  role: 'student' | 'admin';
  studentType?: 'high_school' | 'university';
  highSchoolGrade?: 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12';
  highSchoolStream?: 'natural' | 'social';
  universityLevel?: 'remedial' | 'freshman' | 'senior' | 'gc';
  university?: string;
  department?: string;
  verificationCode: string;
  verificationExpires: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

class PendingUser extends Model<IPendingUser> implements IPendingUser {
  public id!: string;
  public email!: string;
  public name!: string;
  public password!: string;
  public role!: 'student' | 'admin';
  public studentType?: 'high_school' | 'university';
  public highSchoolGrade?: 'grade_9' | 'grade_10' | 'grade_11' | 'grade_12';
  public highSchoolStream?: 'natural' | 'social';
  public universityLevel?: 'remedial' | 'freshman' | 'senior' | 'gc';
  public university?: string;
  public department?: string;
  public verificationCode!: string;
  public verificationExpires!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PendingUser.init(
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
      type: DataTypes.ENUM('student', 'admin'),
      allowNull: false,
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
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verificationExpires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'pending_users',
    timestamps: true,
  }
);

export default PendingUser;
