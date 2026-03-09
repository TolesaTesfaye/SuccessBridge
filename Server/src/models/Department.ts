import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

interface IDepartment {
  id: string
  name: string
  code: string
  universityId: string
}

class Department extends Model<IDepartment> implements IDepartment {
  public id!: string
  public name!: string
  public code!: string
  public universityId!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Department.init(
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
    universityId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'departments',
    timestamps: true,
  },
)

export default Department
