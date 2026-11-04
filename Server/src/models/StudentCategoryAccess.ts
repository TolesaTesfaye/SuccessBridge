import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

export type StudentCategory = 'GRADE_9' | 'GRADE_10' | 'GRADE_11' | 'GRADE_12' | 'REMEDIAL' | 'FRESHMAN';
export type AccessStatus = 'active' | 'expired' | 'revoked';

export interface IStudentCategoryAccess {
  id: string;
  userId: string;
  studentCategory: StudentCategory;
  universityId?: string;
  paymentId: string;
  status: AccessStatus;
  grantedAt: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

class StudentCategoryAccess extends Model<IStudentCategoryAccess> implements IStudentCategoryAccess {
  public id!: string;
  public userId!: string;
  public studentCategory!: StudentCategory;
  public universityId?: string;
  public paymentId!: string;
  public status!: AccessStatus;
  public grantedAt!: Date;
  public expiresAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StudentCategoryAccess.init(
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
      onDelete: 'CASCADE',
    },
    studentCategory: {
      type: DataTypes.ENUM('GRADE_9', 'GRADE_10', 'GRADE_11', 'GRADE_12', 'REMEDIAL', 'FRESHMAN'),
      allowNull: false,
    },
    universityId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'universities',
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
    status: {
      type: DataTypes.ENUM('active', 'expired', 'revoked'),
      allowNull: false,
      defaultValue: 'active',
    },
    grantedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Null means lifetime access',
    },
  },
  {
    sequelize,
    tableName: 'student_category_access',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'studentCategory', 'universityId'],
        name: 'unique_user_category_university',
        where: {
          status: 'active',
        },
      },
      {
        fields: ['userId'],
      },
      {
        fields: ['studentCategory'],
      },
      {
        fields: ['paymentId'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['expiresAt'],
      },
    ],
  }
);

export default StudentCategoryAccess;
