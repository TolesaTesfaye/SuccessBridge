import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

export interface ISubjectAccess {
  id: string
  userId: string
  subjectId: string
  paymentId: string
  accessGrantedAt: Date
  expiresAt?: Date
  educationLevel: 'high_school' | 'university'
  grade?: string
  stream?: string
  universityId?: string
  departmentId?: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

class SubjectAccess extends Model<ISubjectAccess> implements ISubjectAccess {
  public id!: string
  public userId!: string
  public subjectId!: string
  public paymentId!: string
  public accessGrantedAt!: Date
  public expiresAt?: Date
  public educationLevel!: 'high_school' | 'university'
  public grade?: string
  public stream?: string
  public universityId?: string
  public departmentId?: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

SubjectAccess.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'id',
      },
    },
    paymentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'payments',
        key: 'id',
      },
    },
    accessGrantedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    educationLevel: {
      type: DataTypes.ENUM('high_school', 'university'),
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
    universityId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'universities',
        key: 'id',
      },
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'departments',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'subject_access',
    timestamps: true,
  }
)

export default SubjectAccess
