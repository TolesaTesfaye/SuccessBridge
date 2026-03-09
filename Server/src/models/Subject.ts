import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

interface ISubject {
  id: string
  name: string
  code: string
  departmentId?: string
  gradeId?: string
  streamId?: string
}

class Subject extends Model<ISubject> implements ISubject {
  public id!: string
  public name!: string
  public code!: string
  public departmentId?: string
  public gradeId?: string
  public streamId?: string
}

Subject.init(
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
    departmentId: DataTypes.UUID,
    gradeId: DataTypes.UUID,
    streamId: DataTypes.UUID,
  },
  {
    sequelize,
    tableName: 'subjects',
    timestamps: true,
  },
)

export default Subject
