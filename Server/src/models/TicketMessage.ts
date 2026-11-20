import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

export interface ITicketMessage {
  id: string
  ticketId: string
  senderId: string
  content: string
  isStaff: boolean
  createdAt: Date
  updatedAt: Date
}

class TicketMessage extends Model<ITicketMessage> implements ITicketMessage {
  public id!: string
  public ticketId!: string
  public senderId!: string
  public content!: string
  public isStaff!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

TicketMessage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ticketId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'communication_tickets',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isStaff: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: 'communication_ticket_messages',
    timestamps: true,
    indexes: [
      {
        fields: ['ticketId', 'createdAt'],
      },
      {
        fields: ['senderId'],
      },
    ],
  },
)

export default TicketMessage
