import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'

import App from 'container/App'
import { theme } from 'theme/theme'

import './assets/styles/index.css'

const engine = new Styletron()

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <App />
      </BaseProvider>
    </StyletronProvider>
  </ChakraProvider>,
  document.getElementById('root')
)
