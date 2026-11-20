import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

export type ConversationType = 'direct' | 'group'

export interface IConversation {
  id: string
  title?: string | null
  type: ConversationType
  createdBy: string
  lastMessageAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

class Conversation extends Model<IConversation> implements IConversation {
  public id!: string
  public title?: string | null
  public type!: ConversationType
  public createdBy!: string
  public lastMessageAt?: Date | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Conversation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('direct', 'group'),
      allowNull: false,
      defaultValue: 'direct',
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    lastMessageAt: {
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
    tableName: 'conversations',
    timestamps: true,
    indexes: [
      {
        fields: ['lastMessageAt'],
      },
      {
        fields: ['type'],
      },
    ],
  },
)

export default Conversation
