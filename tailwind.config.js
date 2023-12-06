/** @type {import('tailwindcss').Config} */
import { figmaTokensToStyleDictionary } from './scripts/designTokensGenerator/tokenConverter';
const {
  fontFamilies, colors,
} = figmaTokensToStyleDictionary();

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './common/designSystem/**/*.{js,ts,jsx,tsx,mdx}',
    './common/components/**/*.{js,ts,jsx,tsx,mdx}',
    './common/theme/themeElements.ts',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        'text-primary': colors['grey-900'],
        'text-secondary': colors['grey-600'],
        'text-tertiary': colors['grey-700'],
        'loader-background': 'rgb(255 255 255 / .6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        primary: fontFamilies.primary.var,
      },
      maxHeight: {
        tableScrollableContainerDefaultHeight: 'calc(100vh - 230px)',
      },
    },
    keyframes: {
      showLoader: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      ldsLoader: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
    animation: {
      showLoader: 'showLoader 0.2s ease-in forwards',
      ldsLoader: 'ldsLoader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
    },
    animationDelay: {
      m36: '-36ms',
      m72: '-72ms',
      m108: '-108ms',
      m144: '-144ms',
      m180: '-180ms',
      m216: '-216ms',
      m252: '-252ms',
      m288: '-288ms',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('./common/utils/tailwindPlugins/animations'),
  ],
}
