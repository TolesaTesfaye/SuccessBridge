import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import { StudentCategory } from './StudentCategoryAccess.js';

export interface IAccessPackage {
  id: string;
  name: string;
  studentCategory: StudentCategory;
  price: number;
  currency: string;
  durationDays?: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class AccessPackage extends Model<IAccessPackage> implements IAccessPackage {
  public id!: string;
  public name!: string;
  public studentCategory!: StudentCategory;
  public price!: number;
  public currency!: string;
  public durationDays?: number;
  public description?: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AccessPackage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentCategory: {
      type: DataTypes.ENUM('GRADE_9', 'GRADE_10', 'GRADE_11', 'GRADE_12', 'REMEDIAL', 'FRESHMAN'),
      allowNull: false,
      field: 'student_category',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'ETB',
    },
    durationDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'duration_days',
      comment: 'Null means lifetime access',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
    },
  },
  {
    sequelize,
    tableName: 'access_packages',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['student_category'],
      },
      {
        fields: ['is_active'],
      },
    ],
  }
);

export default AccessPackage;
