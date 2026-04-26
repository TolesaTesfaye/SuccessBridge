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
    minify: 'esbuild', // Use esbuild for faster builds
    target: 'esnext', // Use modern JS for smaller bundles
    cssCodeSplit: true, // Split CSS for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('zustand') || id.includes('axios')) {
              return 'state-vendor';
            }
            return 'vendor';
          }
          
          // Dashboard chunks
          if (id.includes('/dashboards/student/')) {
            return 'student-dashboard';
          }
          if (id.includes('/dashboards/admin/')) {
            return 'admin-dashboard';
          }
          if (id.includes('/dashboards/superadmin/')) {
            return 'superadmin-dashboard';
          }
          
          // Component chunks
          if (id.includes('/components/quizzes/')) {
            return 'quiz-components';
          }
          if (id.includes('/components/resources/')) {
            return 'resource-components';
          }
          if (id.includes('/components/analytics/')) {
            return 'analytics-components';
          }
          
          // Learning content chunks
          if (id.includes('/learning center/')) {
            return 'learning-content';
          }
        },
        // Optimize chunk naming
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable compression
    reportCompressedSize: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'zustand', 'axios'],
    exclude: [],
  },
  // Enable esbuild optimizations
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    drop: ['console', 'debugger'], // Remove console and debugger in production
  },
})
