import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

interface ISystemSetting {
  id?: string;
  settingKey: string;
  settingValue: any;
  description?: string;
  category: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class SystemSetting extends Model<ISystemSetting> implements ISystemSetting {
  public id!: string;
  public settingKey!: string;
  public settingValue!: any;
  public description?: string;
  public category!: string;
  public updatedBy?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SystemSetting.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    settingKey: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    settingValue: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(50),
      defaultValue: "general",
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "system_settings",
    timestamps: true,
    underscored: true,
  },
);

export default SystemSetting;
