import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

interface IUserRestriction {
  id?: string;
  userId: string;
  restrictionType: "ban" | "suspend" | "read_only";
  reason: string;
  durationHours?: number;
  appliedBy?: string;
  appliedAt?: Date;
  expiresAt?: Date;
  isActive: boolean;
  liftedBy?: string;
  liftedAt?: Date;
}

class UserRestriction
  extends Model<IUserRestriction>
  implements IUserRestriction
{
  public id!: string;
  public userId!: string;
  public restrictionType!: "ban" | "suspend" | "read_only";
  public reason!: string;
  public durationHours?: number;
  public appliedBy?: string;
  public appliedAt?: Date;
  public expiresAt?: Date;
  public isActive!: boolean;
  public liftedBy?: string;
  public liftedAt?: Date;
}

UserRestriction.init(
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
    restrictionType: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    durationHours: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    appliedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    appliedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    liftedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    liftedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user_restrictions",
    timestamps: false,
    underscored: true,
    indexes: [{ fields: ["user_id"] }, { fields: ["is_active"] }],
  },
);

// Associations
UserRestriction.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
UserRestriction.belongsTo(User, {
  foreignKey: "appliedBy",
  as: "appliedByUser",
});

export default UserRestriction;
