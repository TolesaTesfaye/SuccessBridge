import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Notification } from '../../services/notificationService'
import { formatDistanceToNow } from '../../utils/dateUtils'

interface NotificationDropdownProps {
  notifications: Notification[]
  loading: boolean
  onMarkAsRead: (notificationId: string) => void
  onMarkAllAsRead: () => void
  onClose: () => void
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  loading,
  onMarkAsRead,
  onMarkAllAsRead,
  onClose,
}) => {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'payment_request':
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )
      case 'payment_approved':
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-green-600 dark:text-green-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )
      case 'payment_rejected':
        return (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-red-600 dark:text-red-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read if unread
    if (!notification.isRead) {
      onMarkAsRead(notification.id)
    }

    // Navigate based on user role and notification type
    if (
      notification.type === 'payment_approved' ||
      notification.type === 'payment_rejected'
    ) {
      // Student notifications - navigate to payment tracking
      const paymentId = notification.data?.paymentId
      if (paymentId) {
        navigate(`/student/payments?highlight=${paymentId}`)
      } else {
        navigate('/student/payments')
      }
      onClose()
    } else if (notification.type === 'payment_request') {
      // Super admin/admin notifications - navigate to payment management
      if (user?.role === 'super_admin') {
        // Navigate to super admin dashboard payments tab
        navigate('/dashboard', { state: { activeTab: 'payments' } })
      } else if (user?.role === 'admin') {
        // Navigate to admin dashboard (if they have payment access)
        navigate('/dashboard')
      }
      onClose()
    }
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[600px] flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <svg
              className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 text-center">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                  !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p
                        className={`text-sm font-medium ${
                          !notification.isRead
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <span className="ml-2 flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default NotificationDropdown
