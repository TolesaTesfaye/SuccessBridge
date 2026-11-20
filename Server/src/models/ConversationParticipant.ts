import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

export type ParticipantRole = 'member' | 'admin'

export interface IConversationParticipant {
  id: string
  conversationId: string
  userId: string
  role: ParticipantRole
  lastReadAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

class ConversationParticipant
  extends Model<IConversationParticipant>
  implements IConversationParticipant
{
  public id!: string
  public conversationId!: string
  public userId!: string
  public role!: ParticipantRole
  public lastReadAt?: Date | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ConversationParticipant.init(
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    role: {
      type: DataTypes.ENUM('member', 'admin'),
      allowNull: false,
      defaultValue: 'member',
    },
    lastReadAt: {
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
    tableName: 'conversation_participants',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['conversationId', 'userId'],
      },
      {
        fields: ['userId'],
      },
    ],
  },
)

export default ConversationParticipant
