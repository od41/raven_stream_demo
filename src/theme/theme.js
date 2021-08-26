// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: "Archivo",
    body: "Inter",
  },
  components: {
      // put components here
      Button: {
        // 1. We can update the base styles
        baseStyle: {
          fontWeight: 'bold', // Normally, it is "semibold"
        },
        // 3. We can add a new visual variant
        variants: {
          'dark_1': {
            bg: 'color_codgray',
            borderRadius: '4px',
            fontWeight: 'medium',
            color: 'white.80',
          },
          'raven_gradient': {
            bg: 'linear-gradient(265.86deg, #D68B2F 8.45%, #FBB961 101.33%)',
            borderRadius: '4px',
            fontWeight: 'bold',
            color: 'color_codgray',
          },
          'dark_2': {
            bg: 'white.13',
            borderRadius: '4px',
            fontWeight: 'bold',
            color: 'color_codgray',
          },
        },
      },

      Select: {
        baseStyle: {
          fontWeight: 'bold', // Normally, it is "semibold"
        },
        variants: {
          dark_1: {
            field: {
              bg: 'color_codgray',
              borderRadius: '4px',
              fontWeight: 'medium',
              color: 'white.80',
            },
            addon: {
              bg: 'color_shark'
            },
            option: {
              bg: 'color_shark'
            }
          }
        }
      }
  },
  colors: {
        color_shark: '#222227',
        color_codgray: '#131313',
        raven_red: '#EB5757',
        white: {
          100: 'rgba(255, 255, 255, 1)',
          90: 'rgba(255, 255, 255, 0.9)',
          80: 'rgba(255, 255, 255, 0.8)',
          70: 'rgba(255, 255, 255, 0.7)',
          60: 'rgba(255, 255, 255, 0.6)',
          50: 'rgba(255, 255, 255, 0.5)',
          35: 'rgba(255, 255, 255, 0.35)',
          30: 'rgba(255, 255, 255, 0.30)',
          20: 'rgba(255, 255, 255, 0.2)',
          13: 'rgba(255, 255, 255, 0.13)',
        },
  }

});
