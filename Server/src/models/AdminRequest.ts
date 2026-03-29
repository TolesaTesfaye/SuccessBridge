import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

export interface IAdminRequest {
  id: string
  name: string
  email: string
  password?: string // hashed password
  invitationToken?: string
  invitationExpires?: Date
  university: string
  department: string
  documents?: string[]
  status: 'pending' | 'approved' | 'rejected'
  rejectionReason?: string
  reviewedBy?: string
  reviewedAt?: Date
  createdAt: Date
  updatedAt: Date
}

class AdminRequest extends Model<IAdminRequest> implements IAdminRequest {
  public id!: string
  public name!: string
  public email!: string
  public password?: string
  public invitationToken?: string
  public invitationExpires?: Date
  public university!: string
  public department!: string
  public documents?: string[]
  public status!: 'pending' | 'approved' | 'rejected'
  public rejectionReason?: string
  public reviewedBy?: string
  public reviewedAt?: Date
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

AdminRequest.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Optional in new workflow (set via invitation)
    },
    invitationToken: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    invitationExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    university: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    documents: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
    rejectionReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reviewedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      // Remove foreign key constraint to avoid sync issues
      // references: {
      //   model: 'users',
      //   key: 'id'
      // }
    },
    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  } as any,
  {
    sequelize,
    tableName: 'admin_requests',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        fields: ['status']
      }
    ]
  },
)

export default AdminRequest