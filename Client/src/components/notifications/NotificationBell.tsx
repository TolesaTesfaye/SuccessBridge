import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNotifications } from '../../hooks/useNotifications'
import NotificationDropdown from './NotificationDropdown'

const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0, width: 384 })
  const { unreadCount, notifications, loading, markAsRead, markAllAsRead, refresh } =
    useNotifications(60000) // Poll every 60 seconds (1 minute)

  // Calculate dropdown position and width based on button position and screen size
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const isMobile = window.innerWidth < 640 // sm breakpoint
      
      let topPos = rect.bottom + 8 // 8px gap below button
      let rightPos = window.innerWidth - rect.right
      let dropdownWidth = 384 // md: w-96 default
      
      // Adjust for mobile to prevent off-screen
      if (isMobile) {
        dropdownWidth = Math.min(window.innerWidth - 16, 384) // Full width minus 8px margins on each side
        rightPos = 8 // 8px margin from right edge on mobile
      } else if (window.innerWidth < 768) {
        dropdownWidth = 320 // sm: w-80
      }
      
      setDropdownPosition({
        top: topPos,
        right: rightPos,
        width: dropdownWidth,
      })
    }
  }, [isOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      refresh() // Refresh when opening
    }
  }

  return (
    <>
      {/* Bell Icon Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Notifications"
      >
        {/* Bell Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full min-w-[20px]">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown - Rendered via Portal */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: `${dropdownPosition.top}px`,
              right: `${dropdownPosition.right}px`,
              width: `${dropdownPosition.width}px`,
              zIndex: 9999,
            }}
          >
            <NotificationDropdown
              notifications={notifications}
              loading={loading}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
              onClose={() => setIsOpen(false)}
            />
          </div>,
          document.body
        )}
    </>
  )
}

export default NotificationBell
