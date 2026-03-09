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
    
    console.log('📱 Initial setup - isDark:', isDark, 'saved:', saved)
    
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } catch (error) {
    console.error('❌ Error initializing theme:', error)
  }
}

initializeTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
)
