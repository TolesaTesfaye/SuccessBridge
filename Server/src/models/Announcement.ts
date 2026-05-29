import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

interface IAnnouncement {
  id?: string;
  title: string;
  content: string;
  type: string;
  targetRoles?: string[];
  targetEducationLevels?: string[];
  isActive: boolean;
  createdBy?: string;
  scheduledAt?: Date;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

class Announcement extends Model<IAnnouncement> implements IAnnouncement {
  public id!: string;
  public title!: string;
  public content!: string;
  public type!: string;
  public targetRoles?: string[];
  public targetEducationLevels?: string[];
  public isActive!: boolean;
  public createdBy?: string;
  public scheduledAt?: Date;
  public expiresAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Announcement.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(30),
      defaultValue: "info",
    },
    targetRoles: {
      type: DataTypes.ARRAY(DataTypes.STRING(50)),
      allowNull: true,
    },
    targetEducationLevels: {
      type: DataTypes.ARRAY(DataTypes.STRING(50)),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    scheduledAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "announcements",
    timestamps: true,
    underscored: true,
  },
);

export default Announcement;
