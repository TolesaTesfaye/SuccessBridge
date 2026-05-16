import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

interface IAuditLog {
  id?: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp?: Date;
  status: "success" | "failure";
  errorMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class AuditLog extends Model<IAuditLog> implements IAuditLog {
  public id!: string;
  public userId?: string;
  public action!: string;
  public resource!: string;
  public resourceId?: string;
  public details?: Record<string, any>;
  public ipAddress?: string;
  public userAgent?: string;
  public timestamp!: Date;
  public status!: "success" | "failure";
  public errorMessage?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    resource: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    resourceId: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    details: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("success", "failure"),
      allowNull: false,
      defaultValue: "success",
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "audit_logs",
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["action"] },
      { fields: ["timestamp"] },
      { fields: ["user_id", "timestamp"] },
      { fields: ["action", "timestamp"] },
    ],
  },
);

export default AuditLog;
