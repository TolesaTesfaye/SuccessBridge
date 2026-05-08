/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
        'primary-dark': '#764ba2',
        secondary: '#6b7280',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Mobile-optimized font sizes
        'xs-mobile': ['0.625rem', { lineHeight: '0.875rem' }], // 10px
        'sm-mobile': ['0.75rem', { lineHeight: '1rem' }], // 12px
        'base-mobile': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'lg-mobile': ['1rem', { lineHeight: '1.5rem' }], // 16px
        'xl-mobile': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        '2xl-mobile': ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        '3xl-mobile': ['1.5rem', { lineHeight: '2rem' }], // 24px
      },
      spacing: {
        // Mobile-optimized spacing
        'mobile-xs': '0.25rem', // 4px
        'mobile-sm': '0.5rem', // 8px
        'mobile-md': '0.75rem', // 12px
        'mobile-lg': '1rem', // 16px
        'mobile-xl': '1.25rem', // 20px
      },
      animation: {
        slideUp: 'slideUp 0.3s ease',
        slideDown: 'slideDown 0.3s ease',
        fadeIn: 'fadeIn 0.3s ease',
        shimmer: 'shimmer 2s infinite',
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        slideUp: {
          from: {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        slideDown: {
          from: {
            transform: 'translateY(-20px)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '200% 0',
          },
          '100%': {
            backgroundPosition: '-200% 0',
          },
        },
      },
    },
  },
  plugins: [],
}

