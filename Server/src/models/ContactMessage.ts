import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

export type ContactStatus = 'new' | 'read' | 'archived'

export interface IContactMessage {
  id: string
  name: string
  email: string
  subject: string
  category: string
  message: string
  status: ContactStatus
  createdAt: Date
  updatedAt: Date
}

class ContactMessage extends Model<IContactMessage> implements IContactMessage {
  public id!: string
  public name!: string
  public email!: string
  public subject!: string
  public category!: string
  public message!: string
  public status!: ContactStatus
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ContactMessage.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: 'general',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('new', 'read', 'archived'),
      allowNull: false,
      defaultValue: 'new',
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
    tableName: 'contact_messages',
    timestamps: true,
    indexes: [
      { fields: ['status'] },
      { fields: ['createdAt'] },
    ],
  },
)

export default ContactMessage
