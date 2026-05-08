import api from './api'

export interface Notification {
  id: string
  userId: string
  type: 'payment_request' | 'payment_approved' | 'payment_rejected'
  title: string
  message: string
  data?: any
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface NotificationResponse {
  success: boolean
  data: Notification[]
}

export interface UnreadCountResponse {
  success: boolean
  data: {
    count: number
  }
}

/**
 * Get user's notifications
 */
export const getNotifications = async (limit: number = 20): Promise<Notification[]> => {
  const response = await api.get<NotificationResponse>(`/notifications?limit=${limit}`)
  return response.data.data
}

/**
 * Get unread notification count
 */
export const getUnreadCount = async (): Promise<number> => {
  const response = await api.get<UnreadCountResponse>('/notifications/unread-count')
  return response.data.data.count
}

/**
 * Mark notification as read
 */
export const markAsRead = async (notificationId: string): Promise<Notification> => {
  const response = await api.put<{ success: boolean; data: Notification }>(
    `/notifications/${notificationId}/read`
  )
  return response.data.data
}

/**
 * Mark all notifications as read
 */
export const markAllAsRead = async (): Promise<void> => {
  await api.put('/notifications/mark-all-read')
}
