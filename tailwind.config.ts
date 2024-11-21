import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'media',
  theme: {
    screens: {
      xs: '340px',
      mobile: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1600px'
    },
    extend: {
      colors: {
        // 기본 테마 색상
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        // 프로젝트 주요 색상
        primary: {
          DEFAULT: '#0080FF',
          50: '#F0F8FF',
          100: '#C7E1FF',
          200: '#A3CDFF',
          300: '#7FB9FF',
          400: '#4BA1FF',
          500: '#0080FF',
          600: '#0070E6',
          700: '#0060CC',
          800: '#0050B3',
          900: '#004099'
        },
        secondary: {
          DEFAULT: '#03258C',
          50: '#E6E8FF',
          100: '#C4CAFF',
          200: '#A1ADFF',
          300: '#7E90FF',
          400: '#5B73FF',
          500: '#03258C',
          600: '#021E75',
          700: '#01165E',
          800: '#010F47',
          900: '#000830'
        },

        // 시맨틱 색상
        success: {
          DEFAULT: '#10B981',
          50: '#E6F5EC',
          100: '#C2EBD4',
          200: '#86EFAC',
          300: '#4ADE80',
          500: '#22C55E',
          900: '#14532D'
        },
        error: {
          DEFAULT: '#DC2626',
          50: '#FFE5E5',
          100: '#FFB8B8',
          200: '#FCA5A5',
          300: '#F87171',
          500: '#EF4444',
          900: '#7F1D1D'
        },
        warning: {
          DEFAULT: '#F59E0B',
          50: '#FFF3CC',
          100: '#FFE680',
          200: '#FDE047',
          300: '#FCD34D',
          500: '#F59E0B',
          900: '#8C5E10'
        }
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)'
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }]
      },
      borderRadius: {
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1.5rem'
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT:
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
      }
    }
  },
  plugins: []
} satisfies Config;
