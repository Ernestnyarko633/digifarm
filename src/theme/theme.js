import { extendTheme } from '@chakra-ui/react'

const breakpoints = ['30em', '48em', '62em', '80em']
// aliases
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

export const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        fontSize: 'md',
        fontFamily: '"CeraGR", sans-serif',
        lineHeight: 'tall',
        fontWeight: 400
      }
    })
  },
  ...breakpoints,
  fonts: {
    heading: '"CeraGR" ,sans-serif',
    display: '"CeraGR" ,sans-serif',
    medium: '"CeraGR" ,sans-serif',
    light: '"CeraGR" ,sans-serif',
    thin: '"CeraGR" ,sans-serif',
    body: '"CeraGR", sans-serif'
  },
  fontSizes: {
    xx: '.55rem',
    tiny: '.68rem',
    '7xl': '5rem',
    '8xl': '6rem'
  },
  colors: {
    cf: {
      100: 'rgba(68, 95, 36, 0.04)',
      200: 'rgba(60, 145, 48, 0.1)',
      300: 'rgba(60, 145, 48, 0.05)',
      350: 'rgba(59, 145, 48, 0.7)',
      400: '#3c9130',
      450: '#9DC897',
      500: 'rgba(60, 145, 48, 0.18)',
      600: '#d6e1c9',
      700: '#307926',
      800: '#5AA250',
      900: 'linear-gradient(#93CF88, #5AA250)'
    },
    'cf-dark': {
      200: 'rgba(227, 231, 221, 0.2)',
      250: 'rgba(97, 111, 57, 0.1)'
    },
    cfButton: {
      500: '#3c9130',
      600: '#307926'
    },
    linear: {
      500: 'linear-gradient(#93CF88, #5AA250)',
      600: 'linear-gradient(#93CF88, #5AA250)'
    },
    progressGreen: {
      500: '#d6e1c9',
      600: '#3c9130'
    }
  },
  space: {
    14: '3.5rem',
    60: '15rem',
    66: '17.5rem',
    70: '18rem',
    80: '20rem',
    85: '23rem',
    90: '25rem',
    95: '26rem',
    108: '27rem',
    110: '30rem',
    115: '32rem',
    117: '33rem',
    120: '35rem',
    121: '36rem',
    122: '37rem',
    122.5: '39rem',
    123: '40rem',
    125: '45rem',
    127: '48rem',
    130: '55rem',
    135: '60rem',
    137: '65rem',
    140: '70rem',
    143: '72rem',
    145: '76rem'
  },
  sizes: {
    14: '3.5rem',
    60: '15rem',
    66: '17.5rem',
    70: '18rem',
    80: '20rem',
    85: '23rem',
    90: '25rem',
    95: '26rem',
    108: '27rem',
    110: '30rem',
    115: '32rem',
    117: '33rem',
    120: '35rem',
    121: '36rem',
    122: '37rem',
    122.5: '39rem',
    123: '40rem',
    125: '45rem',
    127: '48rem',
    130: '55rem',
    135: '60rem',
    137: '65rem',
    140: '70rem',
    143: '72rem',
    145: '76rem'
  },
  shadows: {
    1000: '0 10px 20px 0 rgba(97, 111, 57, 0.5)',
    2000: '10px 10px 20px 0 rgba(0, 0, 0, 0.1);'
  }
})
