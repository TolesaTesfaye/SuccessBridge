import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'
import { IUser } from '../types/index.js'

class User extends Model<IUser> implements IUser {
  public id!: string
  public email!: string
  public name!: string
  public fatherName?: string
  public password?: string
  public googleId?: string
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
  public documents?: string[] // Array of document URLs/paths
  public isApproved?: boolean
  public approvalStatus?: 'pending' | 'approved' | 'rejected'
  public approvedBy?: string
  public approvedAt?: Date
  public rejectionReason?: string
  public isEmailVerified?: boolean
  public emailVerificationToken?: string
  public emailVerificationExpires?: Date
  public passwordResetToken?: string
  public passwordResetExpires?: Date
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
    fatherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null for OAuth users
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    microsoftId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
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
    universityId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'universities',
        key: 'id'
      }
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'departments',
        key: 'id'
      }
    },
    gradeId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'grades',
        key: 'id'
      }
    },
    streamId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'streams',
        key: 'id'
      }
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Students are auto-approved, admins need approval
    },
    approvalStatus: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'approved', // Students are auto-approved
    },
    approvedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    approvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rejectionReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    documents: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailVerificationExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  } as any,
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        fields: ['role']
      },
      {
        fields: ['studentType']
      },
      {
        fields: ['universityId']
      },
      {
        fields: ['departmentId']
      },
      {
        fields: ['approvalStatus']
      },
      {
        fields: ['isApproved']
      },
      {
        fields: ['googleId']
      },
      {
        fields: ['microsoftId']
      }
    ]
  },
)

export default User
