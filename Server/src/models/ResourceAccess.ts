import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

interface IResourceAccess {
  id: string
  studentId: string
  resourceId: string
  accessedAt: Date
  completed: boolean
}

class ResourceAccess extends Model<IResourceAccess> implements IResourceAccess {
  public id!: string
  public studentId!: string
  public resourceId!: string
  public accessedAt!: Date
  public completed!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ResourceAccess.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    resourceId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    accessedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'resource_access',
    timestamps: true,
  },
)

export default ResourceAccess
