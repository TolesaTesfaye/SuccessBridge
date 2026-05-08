import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

export interface INotification {
  id: string
  userId: string
  type: 'payment_request' | 'payment_approved' | 'payment_rejected'
  title: string
  message: string
  data?: any // Additional data (payment ID, etc.)
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

class Notification extends Model<INotification> implements INotification {
  public id!: string
  public userId!: string
  public type!: 'payment_request' | 'payment_approved' | 'payment_rejected'
  public title!: string
  public message!: string
  public data?: any
  public isRead!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Notification.init(
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
    type: {
      type: DataTypes.ENUM('payment_request', 'payment_approved', 'payment_rejected'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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
    tableName: 'notifications',
    timestamps: true,
    indexes: [
      {
        fields: ['userId', 'isRead'],
      },
      {
        fields: ['createdAt'],
      },
    ],
  }
)

export default Notification
