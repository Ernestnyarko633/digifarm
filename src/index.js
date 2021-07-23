import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
import ReactGA from 'react-ga4'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from 'container/App'
import { theme } from 'theme/theme'

import 'assets/styles/index.css'

const engine = new Styletron()
const queryClient = new QueryClient()

const TRACKING_ID = process.env.REACT_APP_GA

const ThemeApp = () => {
  React.useEffect(() => {
    ReactGA.initialize(TRACKING_ID)
    ReactGA.send('pageView')
  }, [])

  function FacebookPixel() {
    React.useEffect(() => {
      import('react-facebook-pixel')
        .then(x => x.default)
        .then(ReactPixel => {
          ReactPixel.init('2143795925947401')
          ReactPixel.pageView()
        })
    })
    return null
  }

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
            <FacebookPixel />
            <App />
          </BaseProvider>
        </StyletronProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

ReactDOM.render(<ThemeApp />, document.getElementById('root'))
