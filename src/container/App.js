import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

import { ApiContextProvider } from 'context/api'
import { ComponentContextProvider } from 'context/component'
import { StartFarmProvider } from 'context/start-farm'
import { ModalContextProvider } from 'context/modal'
import { AuthContextProvider } from 'context/auth'

import Router from 'routes/register'

const queryCache = new QueryCache()

function App() {
  return (
    <BrowserRouter>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <ComponentContextProvider>
          <AuthContextProvider>
            <StartFarmProvider>
              <ApiContextProvider>
                <ModalContextProvider>
                  <Router />
                </ModalContextProvider>
              </ApiContextProvider>
            </StartFarmProvider>
          </AuthContextProvider>
        </ComponentContextProvider>
        <ReactQueryDevtools initialIsOpen />
      </ReactQueryCacheProvider>
    </BrowserRouter>
  )
}

export default App
