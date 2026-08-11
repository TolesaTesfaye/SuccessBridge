import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ToastProvider } from '@components/common/Toast'

// Initialize theme before rendering
const initializeTheme = () => {
  try {
    const saved = localStorage.getItem('theme')
    const isDark = saved === 'dark'
    
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } catch (error) {
    // Silent fail in production
    if (import.meta.env.DEV) {
      console.error('Error initializing theme:', error)
    }
  }
}

// Register service worker for cache management
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      // Check if a service worker is already registered
      const existingRegistration = await navigator.serviceWorker.getRegistration('/')
      
      if (existingRegistration) {
        // Update existing service worker
        console.log('Updating existing service worker...')
        await existingRegistration.update()
      } else {
        // Register new service worker
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none', // Always fetch fresh service worker
        })
        
        console.log('Service Worker registered successfully:', registration)
      }
      
      // Get the current registration
      const registration = await navigator.serviceWorker.getRegistration('/')
      
      if (registration) {
        // Check for updates every 5 minutes
        setInterval(() => {
          registration.update().catch(err => {
            console.log('Service Worker update check failed (non-critical):', err)
          })
        }, 300000)
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available, notify user
                console.log('New version available! Please refresh the page.')
                // Optionally show a toast notification to user
              }
            })
          }
        })
      }
    } catch (error) {
      console.log('Service Worker registration failed (non-critical):', error)
      // Service worker is optional, app will work without it
    }
  }
}

initializeTheme()
registerServiceWorker()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
)
