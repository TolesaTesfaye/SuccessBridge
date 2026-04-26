import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Babel configuration for better HMR
      babel: {
        plugins: [
          // Add any babel plugins here if needed
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@dashboards': path.resolve(__dirname, './src/dashboards'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types/index.ts'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
  server: {
    port: 3000,
    host: true, // Listen on all addresses
    hmr: {
      overlay: true, // Show errors as overlay
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    // Optimize build for production
    sourcemap: false, // Disable sourcemaps for production
    minify: 'esbuild', // Use esbuild for faster builds (no terser dependency needed)
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Bundle React and React-DOM together
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Bundle router separately
          if (id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          // Bundle state management
          if (id.includes('node_modules/zustand')) {
            return 'state-vendor';
          }
          // Bundle UI libraries
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor';
          }
          // Bundle other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // Bundle dashboard components
          if (id.includes('/src/dashboards/student/')) {
            return 'student-dashboard';
          }
          if (id.includes('/src/dashboards/admin/')) {
            return 'admin-dashboard';
          }
          if (id.includes('/src/dashboards/superadmin/')) {
            return 'superadmin-dashboard';
          }
          // Bundle quiz components
          if (id.includes('/src/components/quizzes/')) {
            return 'quiz-components';
          }
          // Bundle resource components
          if (id.includes('/src/components/resources/')) {
            return 'resource-components';
          }
          // Bundle analytics components
          if (id.includes('/src/components/analytics/')) {
            return 'analytics-components';
          }
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    force: true,
  },
})
