import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high'

export interface ISupportTicket {
  id: string
  userId: string
  subject: string
  description: string
  category?: string | null
  priority: TicketPriority
  status: TicketStatus
  lastReplyAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

class SupportTicket extends Model<ISupportTicket> implements ISupportTicket {
  public id!: string
  public userId!: string
  public subject!: string
  public description!: string
  public category?: string | null
  public priority!: TicketPriority
  public status!: TicketStatus
  public lastReplyAt?: Date | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

SupportTicket.init(
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
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'medium',
    },
    status: {
      type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
      allowNull: false,
      defaultValue: 'open',
    },
    lastReplyAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: 'communication_tickets',
    timestamps: true,
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['lastReplyAt'],
      },
    ],
  },
)

export default SupportTicket
