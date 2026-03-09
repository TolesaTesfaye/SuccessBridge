import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

interface IGrade {
  id: string
  name: string
  level: number
  educationLevel: 'high_school' | 'university'
}

class Grade extends Model<IGrade> implements IGrade {
  public id!: string
  public name!: string
  public level!: number
  public educationLevel!: 'high_school' | 'university'
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Grade.init(
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
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    educationLevel: {
      type: DataTypes.ENUM('high_school', 'university'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'grades',
    timestamps: true,
  },
)

export default Grade
