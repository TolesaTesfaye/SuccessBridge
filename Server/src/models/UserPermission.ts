import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

interface IUserPermission {
  id?: string;
  userId: string;
  permissionId: string;
  granted: boolean;
  grantedBy?: string;
  grantedAt?: Date;
  expiresAt?: Date;
}

class UserPermission extends Model<IUserPermission> implements IUserPermission {
  public id!: string;
  public userId!: string;
  public permissionId!: string;
  public granted!: boolean;
  public grantedBy?: string;
  public grantedAt?: Date;
  public expiresAt?: Date;
}

UserPermission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    permissionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "permissions", key: "id" },
    },
    granted: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    grantedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    grantedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user_permissions",
    timestamps: false,
    underscored: true,
    indexes: [{ unique: true, fields: ["user_id", "permission_id"] }],
  },
);

export default UserPermission;
