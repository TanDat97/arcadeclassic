const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    // @see: https://tailwindcss.com/docs/theme/#theme-structure
    screens: {
      'xs': '360px',
      'sm': '600px',
      'md': '720px',
      'lg': '840px',
      'xl': '1280px',
    },
    extend: {
      // @see: https://tailwindcss.com/docs/customizing-spacing/
      spacing: {
        /**
         * Pixel
         */
        '10px': '10px',
        '20px': '20px',
        '30px': '30px',
        '40px': '40px',

        /**
         * REM
         * */
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem',
        '15': '3.75rem',
        '16': '4rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '20': '5rem',
        '26': '6.5rem',
        '27': '6.75rem', // 108px
        '28': '7rem',
        '29': '7.25rem',
        '30': '7.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      }
    },
  },
  variants: {},
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.fs-10-16': {
          fontSize: '10px !important',
          lineHeight: '16px !important',
        },
        '.fs-12-16': {
          fontSize: '12px !important',
          lineHeight: '16px !important',
        },
        '.fs-12-18': {
          fontSize: '12px !important',
          lineHeight: '18px !important',
        },
        '.fs-14-18': {
          fontSize: '14px !important',
          lineHeight: '18px !important',
        },
        '.fs-14-22': {
          fontSize: '14px !important',
          lineHeight: '22px !important',
        },
        '.fs-16-20': {
          fontSize: '16px !important',
          lineHeight: '20px !important',
        },
        '.fs-16-24': {
          fontSize: '16px !important',
          lineHeight: '24px !important',
        },
        '.fs-20-30': {
          fontSize: '20px !important',
          lineHeight: '30px !important',
        },
        '.fs-24-24': {
          fontSize: '24px !important',
          lineHeight: '24px !important',
        },
        '.fs-24-36': {
          fontSize: '24px !important',
          lineHeight: '36px !important',
        },
        '.fs-32-48': {
          fontSize: '32px !important',
          lineHeight: '48px !important',
        }
      }
      addUtilities(newUtilities, ['responsive'])
    })
  ],
}
