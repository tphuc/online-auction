import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'

import { extendTheme } from "@chakra-ui/react"



// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fonts: {
    body: "'Source Sans Pro', sans-serif",
  },
  colors: {
    brand: {
      '000': '#f4f5f8',
      '50': '#eaebf2',
      '100': '#e0e1ec',
      '150': '#d3d4e5',
      '200': '#c3c5de',
      '250': '#b1b3d8',
      '300': '#9fa0d3',
      '350': '#8d8ed0',
      '400': '#7e7bd0',
      '450': '#7068d4',
      '500': '#6552db',
      '550': '#5e34e9',
      '600': '#5035c0',
      '650': '#433499',
      '700': '#382f78',
      '750': '#2d285a',
      '800': '#222041',
      '850': '#151426',
      '900': '#000000'
    },
    gradient: {
      300: `linear-gradient(90deg, #2d285a, #7e7bd0)`,
      500: `linear-gradient(90deg, #111, #4735a7)`
    }
  },
})



function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
