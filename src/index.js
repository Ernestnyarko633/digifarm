import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
import ReactGA from 'react-ga'
import { QueryClient, QueryClientProvider } from 'react-query'
import Scrollbar from 'react-perfect-scrollbar'

import App from 'container/App'
import { theme } from 'theme/theme'

import 'assets/styles/index.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

const engine = new Styletron()
const queryClient = new QueryClient()

const TRACKING_ID = process.env.REACT_APP_GA

const ThemeApp = () => {
  React.useEffect(() => {
    ReactGA.initialize(TRACKING_ID)
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <Scrollbar>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
              <App class='test' />
            </BaseProvider>
          </StyletronProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </Scrollbar>
  )
}

ReactDOM.render(<ThemeApp />, document.getElementById('root'))
