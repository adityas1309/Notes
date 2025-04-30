/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e5e7eb',
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            h1: {
              color: '#f3f4f6',
              fontWeight: '700',
            },
            h2: {
              color: '#f3f4f6',
              fontWeight: '600',
            },
            h3: {
              color: '#f3f4f6',
              fontWeight: '600',
            },
            code: {
              color: '#60a5fa',
              backgroundColor: '#1f2937',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: '#111827',
              color: '#f3f4f6',
              border: '1px solid #374151',
            },
            blockquote: {
              color: '#9ca3af',
              borderLeftColor: '#374151',
            },
            strong: {
              color: '#f3f4f6',
            },
            'ul > li::marker': {
              color: '#9ca3af',
            },
            'ol > li::marker': {
              color: '#9ca3af',
            },
            hr: {
              borderColor: '#374151',
            },
            table: {
              color: '#e5e7eb',
            },
            'thead th': {
              color: '#f3f4f6',
              borderBottomColor: '#374151',
            },
            'tbody tr': {
              borderBottomColor: '#374151',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 