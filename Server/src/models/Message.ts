import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

export type MessageType = 'text' | 'system'

export interface IMessage {
  id: string
  conversationId: string
  senderId: string
  content: string
  messageType: MessageType
  attachmentUrl?: string | null
  attachmentName?: string | null
  attachmentType?: string | null
  attachmentSize?: number | null
  createdAt: Date
  updatedAt: Date
}

class Message extends Model<IMessage> implements IMessage {
  public id!: string
  public conversationId!: string
  public senderId!: string
  public content!: string
  public messageType!: MessageType
  public attachmentUrl?: string | null
  public attachmentName?: string | null
  public attachmentType?: string | null
  public attachmentSize?: number | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'conversations',
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
    messageType: {
      type: DataTypes.ENUM('text', 'system'),
      allowNull: false,
      defaultValue: 'text',
    },
    attachmentUrl: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    attachmentName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    attachmentType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    attachmentSize: {
      type: DataTypes.INTEGER,
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
    tableName: 'messages',
    timestamps: true,
    indexes: [
      {
        fields: ['conversationId', 'createdAt'],
      },
      {
        fields: ['senderId'],
      },
    ],
  },
)

export default Message
