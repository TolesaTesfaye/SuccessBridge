import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
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
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@dashboards": path.resolve(__dirname, "./src/dashboards"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types/index.ts"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@learningCenter": path.resolve(
        __dirname,
        "./src/dashboards/student/learning center",
      ),
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    host: "0.0.0.0", // Listen on all network interfaces for local network access
    hmr: {
      protocol: "ws",
      host: "localhost", // Use localhost for the HMR client (browsers cannot connect to 0.0.0.0)
      port: 3000,
    },

    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    // Optimize build for production
    sourcemap: false, // Disable sourcemaps for production
    minify: "esbuild", // Use esbuild for faster builds (no terser dependency needed)
    target: "esnext", // Modern browsers only for faster builds
    cssCodeSplit: true, // Split CSS for better caching
    rollupOptions: {
      output: {
        // Add hash to filenames for cache busting
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "state-vendor": ["zustand"],
          vendor: ["axios", "lucide-react"],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Optimize for Cloudflare Pages
    reportCompressedSize: false, // Skip gzip size reporting to speed up build
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "zustand", "axios"],
  },
});
