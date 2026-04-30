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
      // Unregister any existing service workers first to avoid conflicts
      const registrations = await navigator.serviceWorker.getRegistrations()
      for (const registration of registrations) {
        await registration.unregister()
        console.log('Unregistered old service worker')
      }
      
      // Register new service worker
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none', // Always fetch fresh service worker
      })
      
      console.log('Service Worker registered successfully:', registration)
      
      // Check for updates every 60 seconds
      setInterval(() => {
        registration.update().catch(err => {
          console.log('Service Worker update check failed (non-critical):', err)
        })
      }, 60000)
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available, reload the page
              console.log('New version available! Reloading...')
              window.location.reload()
            }
          })
        }
      })
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
