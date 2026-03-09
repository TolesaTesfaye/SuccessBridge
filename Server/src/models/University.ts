import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

interface IUniversity {
  id: string
  name: string
  location: string
  email?: string
  phone?: string
}

class University extends Model<IUniversity> implements IUniversity {
  public id!: string
  public name!: string
  public location!: string
  public email?: string
  public phone?: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

University.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: 'universities',
    timestamps: true,
  },
)

export default University
