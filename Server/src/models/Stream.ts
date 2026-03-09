import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

interface IStream {
  id: string
  name: string
  code: string
  gradeId: string
}

class Stream extends Model<IStream> implements IStream {
  public id!: string
  public name!: string
  public code!: string
  public gradeId!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Stream.init(
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
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gradeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'streams',
    timestamps: true,
  },
)

export default Stream
