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
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    studentCategory: {
      type: DataTypes.ENUM('GRADE_9', 'GRADE_10', 'GRADE_11', 'GRADE_12', 'REMEDIAL', 'FRESHMAN'),
      allowNull: false,
      field: 'student_category',
    },
    universityId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'university_id',
      references: {
        model: 'universities',
        key: 'id',
      },
    },
    paymentId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'payment_id',
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
      field: 'granted_at',
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'expires_at',
      comment: 'Null means lifetime access',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
  } as any,
  {
    sequelize,
    tableName: 'student_category_access',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'student_category', 'university_id'],
        name: 'unique_user_category_university',
        where: {
          status: 'active',
        },
      },
      {
        fields: ['user_id'],
      },
      {
        fields: ['student_category'],
      },
      {
        fields: ['payment_id'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['expires_at'],
      },
    ],
  }
);

export default StudentCategoryAccess;
