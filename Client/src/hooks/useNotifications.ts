import { useState, useEffect, useCallback } from 'react'
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  Notification,
} from '../services/notificationService'

export const useNotifications = (pollingInterval: number = 60000) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const data = await getNotifications(20)
      setNotifications(data)
      setError(null)
    } catch (err: any) {
      console.error('Failed to fetch notifications:', err)
      // Don't show error for aborted requests or network errors on initial load
      if (err.code !== 'ERR_CANCELED' && err.code !== 'ECONNABORTED') {
        setError(err.response?.data?.message || 'Failed to load notifications')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    try {
      const count = await getUnreadCount()
      setUnreadCount(count)
    } catch (err: any) {
      // Silently fail for unread count - not critical
      if (err.code !== 'ERR_CANCELED' && err.code !== 'ECONNABORTED') {
        console.error('Failed to fetch unread count:', err)
      }
    }
  }, [])

  // Mark notification as read
  const handleMarkAsRead = useCallback(async (notificationId: string) => {
    try {
      await markAsRead(notificationId)
      
      // Update local state
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      )
      
      // Update unread count
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (err: any) {
      console.error('Failed to mark notification as read:', err)
    }
  }, [])

  // Mark all as read
  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await markAllAsRead()
      
      // Update local state
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      )
      
      // Reset unread count
      setUnreadCount(0)
    } catch (err: any) {
      console.error('Failed to mark all as read:', err)
    }
  }, [])

  // Refresh notifications and count
  const refresh = useCallback(async () => {
    await Promise.all([fetchNotifications(), fetchUnreadCount()])
  }, [fetchNotifications, fetchUnreadCount])

  // Initial fetch
  useEffect(() => {
    refresh()
  }, [refresh])

  // Polling for new notifications
  useEffect(() => {
    if (pollingInterval <= 0) return

    const interval = setInterval(() => {
      fetchUnreadCount()
    }, pollingInterval)

    return () => clearInterval(interval)
  }, [pollingInterval, fetchUnreadCount])

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    refresh,
  }
}
