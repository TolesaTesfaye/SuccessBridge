import { useEffect } from 'react'

export const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Only run in development
    if (import.meta.env.DEV) {
      // Monitor page load performance
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (perfData) {
          console.group('⚡ Performance Metrics')
          console.log('DNS Lookup:', `${(perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2)}ms`)
          console.log('TCP Connection:', `${(perfData.connectEnd - perfData.connectStart).toFixed(2)}ms`)
          console.log('Request Time:', `${(perfData.responseStart - perfData.requestStart).toFixed(2)}ms`)
          console.log('Response Time:', `${(perfData.responseEnd - perfData.responseStart).toFixed(2)}ms`)
          console.log('DOM Processing:', `${(perfData.domComplete - perfData.domInteractive).toFixed(2)}ms`)
          console.log('Total Load Time:', `${(perfData.loadEventEnd - perfData.fetchStart).toFixed(2)}ms`)
          console.groupEnd()
        }
      })

      // Monitor component render times
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 16) { // Longer than 1 frame (60fps)
            console.warn(`⚠️ Slow render detected: ${entry.name} took ${entry.duration.toFixed(2)}ms`)
          }
        }
      })

      observer.observe({ entryTypes: ['measure'] })

      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return null
}

// Helper function to measure component render time
export const measureRender = (componentName: string, callback: () => void) => {
  if (import.meta.env.DEV) {
    performance.mark(`${componentName}-start`)
    callback()
    performance.mark(`${componentName}-end`)
    performance.measure(
      componentName,
      `${componentName}-start`,
      `${componentName}-end`
    )
  } else {
    callback()
  }
}
