// Simple logging utility for cleaner console output
export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`ℹ️  ${message}`, ...args)
  },
  
  success: (message: string, ...args: any[]) => {
    console.log(`✅ ${message}`, ...args)
  },
  
  error: (message: string, ...args: any[]) => {
    console.error(`❌ ${message}`, ...args)
  },
  
  warn: (message: string, ...args: any[]) => {
    console.warn(`⚠️  ${message}`, ...args)
  },
  
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development' && process.env.DEBUG === 'true') {
      console.log(`🐛 ${message}`, ...args)
    }
  },
  
  server: (message: string, ...args: any[]) => {
    console.log(`🚀 ${message}`, ...args)
  },
  
  database: (message: string, ...args: any[]) => {
    console.log(`🗄️  ${message}`, ...args)
  }
}