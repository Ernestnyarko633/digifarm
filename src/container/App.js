import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { StartFarmContextProvider } from 'context/start-farm'
import { ComponentContextProvider } from 'context/component'
import { ExternalContextProvider } from 'context/external'
import { ModalContextProvider } from 'context/modal'
import { AuthContextProvider } from 'context/auth'
import { ApiContextProvider } from 'context/api'

import Router from 'routes/register'

const App = () => (
  <BrowserRouter>
    <ComponentContextProvider>
      <ApiContextProvider>
        <ExternalContextProvider>
          <AuthContextProvider>
            <StartFarmContextProvider>
              <ModalContextProvider>
                <Router />
              </ModalContextProvider>
            </StartFarmContextProvider>
          </AuthContextProvider>
        </ExternalContextProvider>
      </ApiContextProvider>
    </ComponentContextProvider>
  </BrowserRouter>
)

export default App
