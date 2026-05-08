import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

export interface IPayment {
  id: string
  userId: string
  subjectId?: string | null // Made optional for "one payment unlocks all" model
  amount: number
  currency: string
  paymentMethod: 'bank_transfer' | 'telebirr' | 'cbe_birr' | 'mpesa' | 'other'
  screenshotUrl: string
  transactionReference?: string
  status: 'pending' | 'approved' | 'rejected'
  approvedBy?: string
  approvedAt?: Date
  rejectionReason?: string
  notes?: string
  educationLevel: 'high_school' | 'university'
  grade?: string
  stream?: string
  universityId?: string
  departmentId?: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

class Payment extends Model<IPayment> implements IPayment {
  public id!: string
  public userId!: string
  public subjectId?: string | null // Made optional for "one payment unlocks all" model
  public amount!: number
  public currency!: string
  public paymentMethod!: 'bank_transfer' | 'telebirr' | 'cbe_birr' | 'mpesa' | 'other'
  public screenshotUrl!: string
  public transactionReference?: string
  public status!: 'pending' | 'approved' | 'rejected'
  public approvedBy?: string
  public approvedAt?: Date
  public rejectionReason?: string
  public notes?: string
  public educationLevel!: 'high_school' | 'university'
  public grade?: string
  public stream?: string
  public universityId?: string
  public departmentId?: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    subjectId: {
      type: DataTypes.UUID,
      allowNull: true, // Made optional - not needed for "one payment unlocks all" model
      references: {
        model: 'subjects',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'ETB',
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM('bank_transfer', 'telebirr', 'cbe_birr', 'mpesa', 'other'),
      allowNull: false,
    },
    screenshotUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionReference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
      allowNull: false,
    },
    approvedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    approvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rejectionReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    educationLevel: {
      type: DataTypes.ENUM('high_school', 'university'),
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stream: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    universityId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'universities',
        key: 'id',
      },
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'departments',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'payments',
    timestamps: true,
  }
)

export default Payment
