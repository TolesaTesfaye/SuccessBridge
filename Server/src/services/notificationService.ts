import Notification from '../models/Notification.js'
import User from '../models/User.js'
import { Op } from 'sequelize'

interface CreateNotificationData {
  userId: string
  type: 'payment_request' | 'payment_approved' | 'payment_rejected'
  title: string
  message: string
  data?: any
}

export class NotificationService {
  /**
   * Create a notification
   */
  static async createNotification(data: CreateNotificationData) {
    const notification = await Notification.create(data)
    return notification
  }

  /**
   * Notify all super admins about a new payment request
   */
  static async notifyAdminsNewPayment(paymentId: string, studentName: string, amount: number) {
    // Get all super admins
    const superAdmins = await User.findAll({
      where: { role: 'super_admin' },
      attributes: ['id'],
    })

    // Create notification for each super admin
    const notifications = await Promise.all(
      superAdmins.map((admin) =>
        this.createNotification({
          userId: admin.id,
          type: 'payment_request',
          title: 'New Payment Request',
          message: `${studentName} submitted a payment request for ${amount} ETB`,
          data: { paymentId },
        })
      )
    )

    console.log(`✅ Notified ${superAdmins.length} super admins about payment #${paymentId}`)
    return notifications
  }

  /**
   * Notify student about payment approval
   */
  static async notifyStudentPaymentApproved(userId: string, paymentId: string) {
    return this.createNotification({
      userId,
      type: 'payment_approved',
      title: 'Payment Approved! 🎉',
      message: 'Your payment has been approved. You now have access to all subjects!',
      data: { paymentId },
    })
  }

  /**
   * Notify student about payment rejection
   */
  static async notifyStudentPaymentRejected(
    userId: string,
    paymentId: string,
    rejectionReason: string
  ) {
    return this.createNotification({
      userId,
      type: 'payment_rejected',
      title: 'Payment Rejected',
      message: `Your payment was rejected. Reason: ${rejectionReason}`,
      data: { paymentId, rejectionReason },
    })
  }

  /**
   * Get user's notifications
   */
  static async getUserNotifications(userId: string, limit: number = 20) {
    const notifications = await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit,
    })

    return notifications
  }

  /**
   * Get unread notification count
   */
  static async getUnreadCount(userId: string) {
    const count = await Notification.count({
      where: {
        userId,
        isRead: false,
      },
    })

    return count
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string, userId: string) {
    const notification = await Notification.findOne({
      where: { id: notificationId, userId },
    })

    if (notification) {
      notification.isRead = true
      await notification.save()
    }

    return notification
  }

  /**
   * Mark all notifications as read
   */
  static async markAllAsRead(userId: string) {
    await Notification.update(
      { isRead: true },
      {
        where: {
          userId,
          isRead: false,
        },
      }
    )
  }

  /**
   * Delete old notifications (older than 30 days)
   */
  static async cleanupOldNotifications() {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const result = await Notification.destroy({
      where: {
        createdAt: {
          [Op.lt]: thirtyDaysAgo,
        },
        isRead: true, // Only delete read notifications
      },
    })

    console.log(`🧹 Cleaned up ${result} old notifications`)
    return result
  }
}
