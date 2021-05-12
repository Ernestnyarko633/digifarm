import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
import ReactGA from 'react-ga'

import App from 'container/App'
import { theme } from 'theme/theme'

import 'assets/styles/index.css'

const engine = new Styletron()

const TRACKING_ID = process.env.REACT_APP_GA

const ThemeApp = () => {
  React.useEffect(() => {
    ReactGA.initialize(TRACKING_ID)
  }, [])

  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <App />
        </BaseProvider>
      </StyletronProvider>
    </ChakraProvider>
  )
}

ReactDOM.render(<ThemeApp />, document.getElementById('root'))
