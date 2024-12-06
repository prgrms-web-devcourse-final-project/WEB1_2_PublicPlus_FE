import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import { PluginAPI } from 'tailwindcss/types/config';
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'media',
  theme: {
    screens: {
      xs: '',
      sm: '',
      md: '768px', // 중간 해상도
      lg: '1024px' // 큰 화면
    },
    extend: {
      container: {
        center: true, // 컨테이너를 화면 가운데로 정렬
        padding: '2rem' // 컨테이너 내부 여백 설정
      },
      colors: {
        // 기본 테마 색상
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        borderColor: 'var(--borderColor)',

        // 프로젝트 주요 색상
        primary: {
          DEFAULT: '#0080FF',
          50: '#EEF3FF',
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
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'sans-serif']
      },
      fontSize: {
        '2xs': ['1rem', { lineHeight: '0.875rem' }], // 10px
        xs: ['1.2rem', { lineHeight: '1rem' }], // 12px
        sm: ['1.4rem', { lineHeight: '1.25rem' }], // 14px
        m: ['1.6rem', { lineHeight: '1.5rem' }], // 16px
        lg: ['1.8rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['2rem', { lineHeight: '1.75rem' }], // 20px
        '2xl': ['2.4rem', { lineHeight: '2rem' }] // 24px
      },
      borderRadius: {
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem'
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT:
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
      },
      overflowWrap: {
        'break-word': 'break-word'
      }
    }
  },
  plugins: [
    forms,
    function ({ addBase }: { addBase: PluginAPI['addBase'] }) {
      addBase({
        '@media (max-width: 340px)': {
          '.container': {
            minWidth: '340px' // 최소 너비 340px로 설정
          }
        }
      });
    },
    require('tailwindcss-animate') // 애니메이션 플러그인 추가
  ]
} satisfies Config;
