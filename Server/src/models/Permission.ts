import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

interface IPermission {
  id?: string;
  name: string;
  description?: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Permission extends Model<IPermission> implements IPermission {
  public id!: string;
  public name!: string;
  public description?: string;
  public category!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Permission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "permissions",
    timestamps: true,
    underscored: true,
  },
);

export default Permission;
