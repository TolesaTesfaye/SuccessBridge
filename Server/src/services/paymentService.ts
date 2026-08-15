import { Op } from 'sequelize'
import Payment from '../models/Payment.js'
import SubjectAccess from '../models/SubjectAccess.js'
import Subject from '../models/Subject.js'
import User from '../models/User.js'
import { AppError } from '../middleware/errorHandler.js'
import { NotificationService } from './notificationService.js'

interface CreatePaymentData {
  userId: string
  subjectId: string
  amount: number
  currency?: string
  paymentMethod: 'bank_transfer' | 'telebirr' | 'cbe_birr' | 'mpesa' | 'other'
  screenshotUrl: string
  transactionReference?: string
  notes?: string
  accountNumber?: string  // User's account/phone number used for payment
  payerPhone?: string     // User's phone number
  payerNote?: string      // Additional note from user
  educationLevel: 'high_school' | 'university'
  grade?: string
  stream?: string
  universityId?: string
  departmentId?: string
}

interface PaymentFilters {
  page?: number
  limit?: number
  status?: 'pending' | 'approved' | 'rejected'
  userId?: string
  subjectId?: string
  educationLevel?: string
  universityId?: string
  departmentId?: string
}

export class PaymentService {
  /**
   * Create a new payment request
   * Note: One payment unlocks ALL subjects, so subjectId is optional (just for reference)
   */
  static async createPayment(data: CreatePaymentData) {
    // Validate required fields
    if (!data.userId) {
      throw new AppError(400, 'User ID is required')
    }

    // Check if user already has made a payment (any payment means access to all)
    const existingPayment = await Payment.findOne({
      where: {
        userId: data.userId,
        status: { [Op.in]: ['pending', 'approved'] }, // Either pending or approved
      },
    })

    if (existingPayment) {
      if (existingPayment.status === 'approved') {
        throw new AppError(400, 'You already have access to all subjects')
      } else {
        throw new AppError(400, 'You already have a pending payment request. Please wait for approval.')
      }
    }

    // Create payment record (subjectId is optional, set to null if invalid)
    const payment = await Payment.create({
      ...data,
      subjectId: null, // Don't store invalid subject IDs
      currency: data.currency || 'ETB',
      status: 'pending',
    })

    console.log(`✅ Payment created: ${payment.id} for user ${data.userId}`)

    // Get user details for notification
    const user = await User.findByPk(data.userId, {
      attributes: ['name', 'email'],
    })

    // Notify all super admins about new payment request
    if (user) {
      await NotificationService.notifyAdminsNewPayment(
        payment.id,
        user.name || user.email,
        data.amount
      )
    }

    return payment
  }

  /**
   * Get payments with filtering
   */
  static async getPayments(filters: PaymentFilters) {
    const {
      page = 1,
      limit = 10,
      status,
      userId,
      subjectId,
      educationLevel,
      universityId,
      departmentId,
    } = filters

    const where: any = {}

    if (status) where.status = status
    if (userId) where.userId = userId
    if (subjectId) where.subjectId = subjectId
    if (educationLevel) where.educationLevel = educationLevel
    if (universityId) where.universityId = universityId
    if (departmentId) where.departmentId = departmentId

    const offset = (Number(page) - 1) * Number(limit)

    const { count, rows } = await Payment.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'studentType'],
        },
        {
          model: Subject,
          as: 'subject',
          attributes: ['id', 'name'], // Removed 'description' - field doesn't exist in Subject model
        },
      ],
    })

    // Convert screenshot URLs to signed URLs for better accessibility
    const { getB2SignedUrl } = await import('../middleware/b2Upload.js')
    const paymentsWithSignedUrls = await Promise.all(
      rows.map(async (payment) => {
        const paymentJson = payment.toJSON()
        
        // Extract the B2 key from the URL
        // URL formats:
        // 1. https://f004.backblazeb2.com/file/bucket-name/payments/12345.jpg
        // 2. https://s3.us-west-004.backblazeb2.com/bucket-name/payments/12345.jpg
        let key = ''
        try {
          const url = paymentJson.screenshotUrl
          if (url.includes('/file/')) {
            // Format 1: Extract after /file/{bucket-name}/
            const parts = url.split('/file/')
            if (parts[1]) {
              const pathParts = parts[1].split('/')
              // Remove bucket name and join the rest
              key = pathParts.slice(1).join('/')
            }
          } else if (url.includes('.backblazeb2.com/')) {
            // Format 2: Extract after /{bucket-name}/
            const parts = url.split('.backblazeb2.com/')
            if (parts[1]) {
              const pathParts = parts[1].split('/')
              // Remove bucket name and join the rest
              key = pathParts.slice(1).join('/')
            }
          }
          
          // If we successfully extracted a key, generate a signed URL
          if (key) {
            const signedUrl = await getB2SignedUrl(key, 86400, false) // 24-hour expiry
            paymentJson.screenshotUrl = signedUrl
            console.log(`🔐 Generated signed URL for payment ${payment.id}`)
          } else {
            console.warn(`⚠️ Could not extract key from URL for payment ${payment.id}:`, url)
          }
        } catch (error) {
          console.error(`❌ Error generating signed URL for payment ${payment.id}:`, error)
          // Keep the original URL if signed URL generation fails
        }
        
        return paymentJson
      })
    )

    return {
      data: paymentsWithSignedUrls,
      total: count,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(count / Number(limit)),
    }
  }

  /**
   * Get a single payment by ID
   */
  static async getPaymentById(paymentId: string) {
    const payment = await Payment.findByPk(paymentId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'studentType'],
        },
        {
          model: Subject,
          as: 'subject',
          attributes: ['id', 'name'], // Removed 'description' - field doesn't exist in Subject model
        },
      ],
    })

    if (!payment) {
      throw new AppError(404, 'Payment not found')
    }

    // Convert screenshot URL to signed URL
    const paymentJson = payment.toJSON()
    const { getB2SignedUrl } = await import('../middleware/b2Upload.js')
    
    let key = ''
    try {
      const url = paymentJson.screenshotUrl
      if (url.includes('/file/')) {
        // Format 1: Extract after /file/{bucket-name}/
        const parts = url.split('/file/')
        if (parts[1]) {
          const pathParts = parts[1].split('/')
          key = pathParts.slice(1).join('/')
        }
      } else if (url.includes('.backblazeb2.com/')) {
        // Format 2: Extract after /{bucket-name}/
        const parts = url.split('.backblazeb2.com/')
        if (parts[1]) {
          const pathParts = parts[1].split('/')
          key = pathParts.slice(1).join('/')
        }
      }
      
      if (key) {
        const signedUrl = await getB2SignedUrl(key, 86400, false) // 24-hour expiry
        paymentJson.screenshotUrl = signedUrl
        console.log(`🔐 Generated signed URL for payment ${paymentId}`)
      }
    } catch (error) {
      console.error(`❌ Error generating signed URL for payment ${paymentId}:`, error)
    }

    return paymentJson
  }

  /**
   * Approve a payment and grant access to ALL subjects
   * One payment unlocks everything!
   */
  static async approvePayment(paymentId: string, approvedBy: string) {
    const payment = await Payment.findByPk(paymentId)

    if (!payment) {
      throw new AppError(404, 'Payment not found')
    }

    if (payment.status !== 'pending') {
      throw new AppError(400, 'Payment has already been processed')
    }

    // Update payment status
    payment.status = 'approved'
    payment.approvedBy = approvedBy
    payment.approvedAt = new Date()
    await payment.save()

    // Grant access to ALL subjects (one payment unlocks everything)
    // Get all subjects
    const allSubjects = await Subject.findAll()

    // Create subject access records for all subjects
    const accessRecords = allSubjects.map(subject => ({
      userId: payment.userId,
      subjectId: subject.id,
      paymentId: payment.id,
      accessGrantedAt: new Date(),
      educationLevel: payment.educationLevel,
      grade: payment.grade,
      stream: payment.stream,
      universityId: payment.universityId,
      departmentId: payment.departmentId,
    }))

    // Bulk create all access records
    await SubjectAccess.bulkCreate(accessRecords, {
      ignoreDuplicates: true, // Skip if access already exists
    })

    console.log(`✅ Granted access to ${allSubjects.length} subjects for user ${payment.userId}`)

    // Notify student about payment approval
    await NotificationService.notifyStudentPaymentApproved(payment.userId, payment.id)

    return { 
      payment, 
      subjectsUnlocked: allSubjects.length,
      message: `Access granted to all ${allSubjects.length} subjects`
    }
  }

  /**
   * Reject a payment
   */
  static async rejectPayment(paymentId: string, approvedBy: string, rejectionReason: string) {
    const payment = await Payment.findByPk(paymentId)

    if (!payment) {
      throw new AppError(404, 'Payment not found')
    }

    if (payment.status !== 'pending') {
      throw new AppError(400, 'Payment has already been processed')
    }

    // Update payment status
    payment.status = 'rejected'
    payment.approvedBy = approvedBy
    payment.approvedAt = new Date()
    payment.rejectionReason = rejectionReason
    await payment.save()

    // Notify student about payment rejection
    await NotificationService.notifyStudentPaymentRejected(
      payment.userId,
      payment.id,
      rejectionReason
    )

    return payment
  }

  /**
   * Check if user has access to a subject
   */
  static async checkSubjectAccess(userId: string, subjectId: string): Promise<boolean> {
    const access = await SubjectAccess.findOne({
      where: {
        userId,
        subjectId,
        [Op.or]: [
          { expiresAt: null },
          { expiresAt: { [Op.gt]: new Date() } },
        ],
      },
    })

    return !!access
  }

  /**
   * Get user's subject access list
   */
  static async getUserSubjectAccess(userId: string) {
    const accessList = await SubjectAccess.findAll({
      where: {
        userId,
        [Op.or]: [
          { expiresAt: null },
          { expiresAt: { [Op.gt]: new Date() } },
        ],
      },
      include: [
        {
          model: Subject,
          as: 'subject',
          attributes: ['id', 'name'], // Removed 'description' - field doesn't exist in Subject model
        },
      ],
      order: [['accessGrantedAt', 'DESC']],
    })

    return accessList
  }

  /**
   * Get payment statistics
   */
  static async getPaymentStats() {
    const totalPayments = await Payment.count()
    const pendingPayments = await Payment.count({ where: { status: 'pending' } })
    const approvedPayments = await Payment.count({ where: { status: 'approved' } })
    const rejectedPayments = await Payment.count({ where: { status: 'rejected' } })

    const totalRevenue = await Payment.sum('amount', { where: { status: 'approved' } })

    return {
      totalPayments,
      pendingPayments,
      approvedPayments,
      rejectedPayments,
      totalRevenue: totalRevenue || 0,
    }
  }
}
