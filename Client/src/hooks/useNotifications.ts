import { useEffect, useSyncExternalStore } from 'react'
import {
  getNotifications,
  getUnreadCount,
  markAsRead as apiMarkAsRead,
  markAllAsRead as apiMarkAllAsRead,
  type Notification,
} from '../services/notificationService'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: true,
}

let state: NotificationState = initialState
const listeners = new Set<() => void>()

let subscribers = 0
let pollTimer: ReturnType<typeof setInterval> | null = null
let refreshPromise: Promise<void> | null = null

const setState = (patch: Partial<NotificationState>) => {
  state = { ...state, ...patch }
  listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const getSnapshot = () => state

export const refreshNotifications = async () => {
  if (refreshPromise) return refreshPromise

  refreshPromise = (async () => {
    try {
      const [notifications, unreadCount] = await Promise.all([
        getNotifications(20),
        getUnreadCount(),
      ])
      setState({ notifications, unreadCount, loading: false })
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
      setState({ loading: false })
    }
  })()

  try {
    await refreshPromise
  } finally {
    refreshPromise = null
  }
}

export const markNotificationRead = async (notificationId: string) => {
  const wasUnread = state.notifications.some(
    (notification) => notification.id === notificationId && !notification.isRead,
  )

  setState({
    notifications: state.notifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification,
    ),
    unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
  })

  try {
    await apiMarkAsRead(notificationId)
  } catch (error) {
    console.error('Failed to mark notification as read:', error)
    void refreshNotifications()
  }
}

export const markAllNotificationsRead = async () => {
  if (state.unreadCount === 0) return

  setState({
    notifications: state.notifications.map((notification) => ({
      ...notification,
      isRead: true,
    })),
    unreadCount: 0,
  })

  try {
    await apiMarkAllAsRead()
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error)
    void refreshNotifications()
  }
}

const handleFocus = () => {
  void refreshNotifications()
}

const handleVisibility = () => {
  if (!document.hidden) void refreshNotifications()
}

const startPolling = (interval: number) => {
  if (interval <= 0 || pollTimer) return
  pollTimer = setInterval(() => void refreshNotifications(), interval)
  window.addEventListener('focus', handleFocus)
  document.addEventListener('visibilitychange', handleVisibility)
}

const stopPolling = () => {
  if (!pollTimer) return
  clearInterval(pollTimer)
  pollTimer = null
  window.removeEventListener('focus', handleFocus)
  document.removeEventListener('visibilitychange', handleVisibility)
}

/**
 * Shared notification state so every bell instance shows the same unread
 * count and updates immediately when one of them marks items as read.
 */
export const useNotifications = (pollingInterval: number = 60000) => {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  useEffect(() => {
    subscribers += 1
    if (subscribers === 1) {
      void refreshNotifications()
      startPolling(pollingInterval)
    }

    return () => {
      subscribers -= 1
      if (subscribers === 0) {
        stopPolling()
        state = initialState
      }
    }
  }, [pollingInterval])

  return {
    notifications: snapshot.notifications,
    unreadCount: snapshot.unreadCount,
    loading: snapshot.loading,
    error: null as string | null,
    markAsRead: markNotificationRead,
    markAllAsRead: markAllNotificationsRead,
    refresh: refreshNotifications,
  }
}
