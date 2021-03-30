import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryClient, QueryClientProvider } from 'react-query'

import { StartFarmContextProvider } from 'context/start-farm'
import { ComponentContextProvider } from 'context/component'
import { ExternalContextProvider } from 'context/external'
import { ModalContextProvider } from 'context/modal'
import { AuthContextProvider } from 'context/auth'
import { ApiContextProvider } from 'context/api'

import Router from 'routes/register'

const queryClient = new QueryClient()

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </BrowserRouter>
)

export default App
