import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

interface IRolePermission {
  id?: string;
  role: string;
  permissionId: string;
  granted: boolean;
}

class RolePermission extends Model<IRolePermission> implements IRolePermission {
  public id!: string;
  public role!: string;
  public permissionId!: string;
  public granted!: boolean;
}

RolePermission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
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
  },
  {
    sequelize,
    tableName: "role_permissions",
    timestamps: false,
    underscored: true,
    indexes: [{ unique: true, fields: ["role", "permission_id"] }],
  },
);

export default RolePermission;
