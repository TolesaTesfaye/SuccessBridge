import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import type { IResource, ResourceType } from '../types/index'

class Resource extends Model<IResource> implements IResource {
  public id!: string
  public title!: string
  public description!: string
  public type!: ResourceType
  public fileUrl!: string
  public educationLevel!: 'high_school' | 'university'
  public grade?: string
  public stream?: string
  public subjectId!: string
  public universityId?: string
  public departmentId?: string
  public tags!: string[]
  public uploadedBy!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Resource.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    educationLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: DataTypes.STRING,
    stream: DataTypes.STRING,
    subjectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    universityId: DataTypes.UUID,
    departmentId: DataTypes.UUID,
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    uploadedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  } as any,
  {
    sequelize,
    tableName: 'resources',
    timestamps: true,
  },
)

export default Resource
