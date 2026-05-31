import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

interface IResourceType {
  id: string
  name: string
  gradeId: string
}

class ResourceType extends Model<IResourceType> implements IResourceType {
  public id!: string
  public name!: string
  public gradeId!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ResourceType.init(
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
    gradeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'resource_types',
    timestamps: true,
    indexes: [{ fields: ['gradeId'] }],
  },
)

export default ResourceType
